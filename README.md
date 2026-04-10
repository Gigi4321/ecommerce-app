# eCommerce Application

[![Angular](https://img.shields.io/badge/Angular-21.2.0-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.12-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive eCommerce web application built with Angular 21, featuring user authentication, product browsing, shopping cart, wishlist, checkout, and order management. This application provides a seamless online shopping experience with a clean, intuitive UI powered by TailwindCSS and Flowbite.

## 🚀 Features

- **User Authentication**: Secure login, registration, and password recovery
- **Product Browsing**: Browse products by categories, brands, and search functionality
- **Shopping Cart**: Add, remove, and manage items in the cart
- **Wishlist**: Save favorite products for later
- **Checkout Process**: Secure and streamlined checkout with multiple payment options
- **Order Management**: View order history and track orders
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Server-Side Rendering (SSR)**: Improved performance and SEO
- **Real-time Notifications**: Toast notifications for user actions
- **Loading Indicators**: Spinner animations for better UX
- **Pagination**: Efficient product listing with pagination
- **Image Carousels**: Product image galleries using Swiper

## 🛠️ Technologies Used

- **Frontend Framework**: Angular 21
- **Language**: TypeScript
- **Styling**: TailwindCSS, Flowbite
- **Icons**: FontAwesome
- **State Management**: RxJS
- **HTTP Client**: Angular HttpClient with interceptors
- **Forms**: Angular Reactive Forms
- **Routing**: Angular Router
- **SSR**: Angular Universal
- **Testing**: Vitest
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Angular CLI (version 21 or higher)

## 🔧 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/e-commerce.git
   cd e-commerce
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `environments/environment.ts` to `environments/environment.development.ts` if needed
   - Update API endpoints and other configuration as required

## 🚀 Usage

### Development Server

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200`.

### Build for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/eCommerce` directory.

### Server-Side Rendering

To run the application with SSR:

```bash
npm run serve:ssr:eCommerce
```

### Testing

To run the unit tests:

```bash
npm test
```

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── auth/
│   │   │   ├── guards/
│   │   │   └── services/
│   │   ├── interceptors/
│   │   ├── models/
│   │   └── services/
│   ├── features/
│   │   ├── brands/
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── checkout/
│   │   ├── details/
│   │   ├── forget/
│   │   ├── home/
│   │   ├── login/
│   │   ├── not-found/
│   │   ├── orders/
│   │   ├── profile/
│   │   ├── register/
│   │   ├── shop/
│   │   └── wishlist/
│   ├── layouts/
│   │   ├── footer/
│   │   └── navbar/
│   ├── our-services/
│   └── shared/
│       ├── interfaces/
│       ├── pipes/
│       └── ui/
├── environments/
└── styles.css
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

If you have any questions or suggestions, feel free to open an issue or contact the maintainers.

---

**Note**: This application requires a backend API for full functionality. Make sure to configure the API endpoints in the environment files.
