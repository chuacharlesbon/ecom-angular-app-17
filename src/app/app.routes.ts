import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ProductsComponent } from './products/products.component';

export const routeNames = {
    home: {
        path: '',
        title: "Home",
        component: HomeComponentComponent,
    },
    product: {
        path: 'products',
        title: "Products",
        component: ProductsComponent,
    },
    productDetails: {
        path: 'products/:id',
        title: "Product Info",
        component: ProductsComponent,
    },
};

export const routes: Routes = [
    {
        path: routeNames.home.path,
        component: routeNames.home.component,
        title: `SHOPNetwork PH | ${routeNames.home.title}`,
    },
    {
        path: routeNames.product.path,
        component: routeNames.product.component,
        title: `SHOPNetwork PH | ${routeNames.product.title}`,
    },
    {
        path: routeNames.productDetails.path,
        component: routeNames.productDetails.component,
        title: `SHOPNetwork PH | ${routeNames.productDetails.title}`,
    },
];
