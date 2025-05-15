import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ProductsComponent } from './products/products.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { BlogsDetailsComponent } from './blogs-details/blogs-details.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutFailedComponent } from './checkout-failed/checkout-failed.component';

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
        component: ProductsDetailsComponent,
    },
    blog: {
        path: 'blogs',
        title: "Blogs",
        component: BlogsComponent,
    },
    blogDetails: {
        path: 'blogs/:id',
        title: "Blog Info",
        component: BlogsDetailsComponent,
    },
    about: {
        path: 'about-us',
        title: "About Us",
        component: AboutComponent,
    },
    contact: {
        path: 'contact-us',
        title: "Contact Us",
        component: ContactUsComponent,
    },
    cart: {
        path: 'cart',
        title: 'Cart',
        component: CartComponent,
    },
    checkoutSuccess: {
        path: 'checkout-success',
        title: 'Checkout Success',
        component: CheckoutSuccessComponent,
    },
    checkoutFailed: {
        path: 'checkout-failed',
        title: 'Checkout Failed',
        component: CheckoutFailedComponent,
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
    {
        path: routeNames.blog.path,
        component: routeNames.blog.component,
        title: `SHOPNetwork PH | ${routeNames.blog.title}`,
    },
    {
        path: routeNames.blogDetails.path,
        component: routeNames.blogDetails.component,
        title: `SHOPNetwork PH | ${routeNames.blogDetails.title}`,
    },
    {
        path: routeNames.about.path,
        component: routeNames.about.component,
        title: `SHOPNetwork PH | ${routeNames.about.title}`,
    },
    {
        path: routeNames.contact.path,
        component: routeNames.contact.component,
        title: `SHOPNetwork PH | ${routeNames.contact.title}`,
    },
    {
        path: routeNames.cart.path,
        component: routeNames.cart.component,
        title: `SHOPNetwork PH | ${routeNames.cart.title}`,
    },
    {
        path: routeNames.checkoutSuccess.path,
        component: routeNames.checkoutSuccess.component,
        title: `SHOPNetwork PH | ${routeNames.checkoutSuccess.title}`,
    },
    {
        path: routeNames.checkoutFailed.path,
        component: routeNames.checkoutFailed.component,
        title: `SHOPNetwork PH | ${routeNames.checkoutFailed.title}`,
    },
];
