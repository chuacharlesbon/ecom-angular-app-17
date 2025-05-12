// To parse this data:
//
//   import { Convert, ProductsModel } from "./file";
//
//   const productsModel = Convert.toProductsModel(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface ProductsModel {
    products?: Product[];
    total?:    number;
    skip?:     number;
    limit?:    number;
}

export interface Product {
    id?:                   number;
    title?:                string;
    description?:          string;
    category?:             Category;
    price?:                number;
    discountPercentage?:   number;
    rating?:               number;
    stock?:                number;
    tags?:                 string[];
    brand?:                string;
    sku?:                  string;
    weight?:               number;
    dimensions?:           Dimensions;
    warrantyInformation?:  string;
    shippingInformation?:  string;
    availabilityStatus?:   AvailabilityStatus;
    reviews?:              Review[];
    returnPolicy?:         ReturnPolicy;
    minimumOrderQuantity?: number;
    meta?:                 Meta;
    images?:               string[];
    thumbnail?:            string;
}

export enum AvailabilityStatus {
    InStock = "In Stock",
    LowStock = "Low Stock",
}

export enum Category {
    Beauty = "beauty",
    Fragrances = "fragrances",
    Furniture = "furniture",
    Groceries = "groceries",
}

export interface Dimensions {
    width?:  number;
    height?: number;
    depth?:  number;
}

export interface Meta {
    createdAt?: Date;
    updatedAt?: Date;
    barcode?:   string;
    qrCode?:    string;
}

export enum ReturnPolicy {
    NoReturnPolicy = "No return policy",
    The30DaysReturnPolicy = "30 days return policy",
    The60DaysReturnPolicy = "60 days return policy",
    The7DaysReturnPolicy = "7 days return policy",
    The90DaysReturnPolicy = "90 days return policy",
}

export interface Review {
    rating?:        number;
    comment?:       string;
    date?:          Date;
    reviewerName?:  string;
    reviewerEmail?: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toProductsModel(json: string): ProductsModel {
        return cast(JSON.parse(json), r("ProductsModel"));
    }

    public static productsModelToJson(value: ProductsModel): string {
        return JSON.stringify(uncast(value, r("ProductsModel")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "ProductsModel": o([
        { json: "products", js: "products", typ: u(undefined, a(r("Product"))) },
        { json: "total", js: "total", typ: u(undefined, 0) },
        { json: "skip", js: "skip", typ: u(undefined, 0) },
        { json: "limit", js: "limit", typ: u(undefined, 0) },
    ], false),
    "Product": o([
        { json: "id", js: "id", typ: u(undefined, 0) },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "category", js: "category", typ: u(undefined, r("Category")) },
        { json: "price", js: "price", typ: u(undefined, 3.14) },
        { json: "discountPercentage", js: "discountPercentage", typ: u(undefined, 3.14) },
        { json: "rating", js: "rating", typ: u(undefined, 3.14) },
        { json: "stock", js: "stock", typ: u(undefined, 0) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "brand", js: "brand", typ: u(undefined, "") },
        { json: "sku", js: "sku", typ: u(undefined, "") },
        { json: "weight", js: "weight", typ: u(undefined, 0) },
        { json: "dimensions", js: "dimensions", typ: u(undefined, r("Dimensions")) },
        { json: "warrantyInformation", js: "warrantyInformation", typ: u(undefined, "") },
        { json: "shippingInformation", js: "shippingInformation", typ: u(undefined, "") },
        { json: "availabilityStatus", js: "availabilityStatus", typ: u(undefined, r("AvailabilityStatus")) },
        { json: "reviews", js: "reviews", typ: u(undefined, a(r("Review"))) },
        { json: "returnPolicy", js: "returnPolicy", typ: u(undefined, r("ReturnPolicy")) },
        { json: "minimumOrderQuantity", js: "minimumOrderQuantity", typ: u(undefined, 0) },
        { json: "meta", js: "meta", typ: u(undefined, r("Meta")) },
        { json: "images", js: "images", typ: u(undefined, a("")) },
        { json: "thumbnail", js: "thumbnail", typ: u(undefined, "") },
    ], false),
    "Dimensions": o([
        { json: "width", js: "width", typ: u(undefined, 3.14) },
        { json: "height", js: "height", typ: u(undefined, 3.14) },
        { json: "depth", js: "depth", typ: u(undefined, 3.14) },
    ], false),
    "Meta": o([
        { json: "createdAt", js: "createdAt", typ: u(undefined, Date) },
        { json: "updatedAt", js: "updatedAt", typ: u(undefined, Date) },
        { json: "barcode", js: "barcode", typ: u(undefined, "") },
        { json: "qrCode", js: "qrCode", typ: u(undefined, "") },
    ], false),
    "Review": o([
        { json: "rating", js: "rating", typ: u(undefined, 0) },
        { json: "comment", js: "comment", typ: u(undefined, "") },
        { json: "date", js: "date", typ: u(undefined, Date) },
        { json: "reviewerName", js: "reviewerName", typ: u(undefined, "") },
        { json: "reviewerEmail", js: "reviewerEmail", typ: u(undefined, "") },
    ], false),
    "AvailabilityStatus": [
        "In Stock",
        "Low Stock",
    ],
    "Category": [
        "beauty",
        "fragrances",
        "furniture",
        "groceries",
    ],
    "ReturnPolicy": [
        "No return policy",
        "30 days return policy",
        "60 days return policy",
        "7 days return policy",
        "90 days return policy",
    ],
};
