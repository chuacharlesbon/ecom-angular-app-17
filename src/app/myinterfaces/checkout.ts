// To parse this data:
//
//   import { Convert, CheckoutModel } from "./file";
//
//   const checkoutModel = Convert.toCheckoutModel(json);

export interface CheckoutModel {
    id?:                        string;
    externalId?:                string;
    userId?:                    string;
    description?:               string;
    status?:                    string;
    merchantName?:              string;
    merchantProfilePictureUrl?: string;
    amount?:                    number;
    expiryDate?:                Date;
    invoiceUrl?:                string;
    availableBanks?:            any[];
    availableRetailOutlets?:    AvailableRetailOutlet[];
    availableEwallets?:         AvailableEwallet[];
    availableQrCodes?:          AvailableQrCode[];
    availableDirectDebits?:     AvailableDirectDebit[];
    availablePaylaters?:        AvailablePaylater[];
    shouldExcludeCreditCard?:   boolean;
    shouldSendEmail?:           boolean;
    created?:                   Date;
    updated?:                   Date;
    successRedirectUrl?:        string;
    failureRedirectUrl?:        string;
    currency?:                  string;
    reminderDate?:              Date;
}

export interface AvailableDirectDebit {
    directDebitType?: string;
}

export interface AvailableEwallet {
    ewalletType?: string;
}

export interface AvailablePaylater {
    paylaterType?: string;
}

export interface AvailableQrCode {
    qrCodeType?: string;
}

export interface AvailableRetailOutlet {
    retailOutletName?: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCheckoutModel(json: string): CheckoutModel {
        return JSON.parse(json);
    }

    public static checkoutModelToJson(value: CheckoutModel): string {
        return JSON.stringify(value);
    }
}
