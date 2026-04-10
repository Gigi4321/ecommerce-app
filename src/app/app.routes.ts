import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home'
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./features/shop/shop.component').then(m => m.ShopComponent),
    title: 'Shop'
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent),
    title: 'Shop'
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then(m => m.CategoriesComponent),
    title: 'Categories'
  },
  {
    path: 'subcategories/:id',
    loadComponent: () =>
      import('./features/categories/sub-categories/sub-categories.component').then(m => m.SubCategoriesComponent),
    title: 'Sub Categories'
  },
  {
    path: 'subcategoryProduct/:id',
    loadComponent: () =>
      import('./features/categories/sub-categories/categoryProducts/category-product/category-product.component').then(m => m.CategoryProductsComponent),
    title: 'Sub Categories'
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then(m => m.BrandsComponent),
    title: 'Brands'
  },
  {
    path: 'brand-product/:id',
    loadComponent: () =>
      import('./features/brands/brandProducts/brand-product/brand-product.component').then(m => m.BrandProductComponent),
    title: 'Brand Products'
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then(m => m.CartComponent),
    title: 'Cart'
  },
  {
    path: 'details/:id/:slug',
    loadComponent: () =>
      import('./features/details/details.component').then(m => m.DetailsComponent),
    title: 'Product Details'
  },
  {
    path: 'checkout/:id',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
    title: 'Checkout'
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./features/orders/orders.component').then(m => m.OrdersComponent),
    title: 'My Orders'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then(m => m.RegisterComponent),
    title: 'Register'
  },
 {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component')
        .then(m => m.ProfileComponent),
    title: 'Profile',

    children: [
      {
        path: 'addresses',
        loadComponent: () =>
          import('./features/profile/address/address.component')
            .then(m => m.AddressComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/profile/settings/settings.component')
            .then(m => m.SettingsComponent),
      },

      {
        path: '',
        redirectTo: 'addresses',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'forget',
    loadComponent: () =>
      import('./features/forget/forget.component').then(m => m.ForgetComponent),
    title: 'Forgot Password'
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page Not Found'
  }
];