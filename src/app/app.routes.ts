import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { ProductsComponent } from './products/products.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { BlogsDetailsComponent } from './blogs-details/blogs-details.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

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
];
