# Discount Calculator PWA

A powerful, user-friendly Discount Calculator designed to handle complex shopping scenarios. This Progressive Web App (PWA) allows users to easily calculate final prices with stacked discounts and multi-region tax support, specifically tailored for Canadian provinces.

## Features

-   **Stacked Discounts**: Apply multiple discounts in sequence. Supports both percentage-based (e.g., 20% off) and fixed amount (e.g., $50 off) discounts.
-   **Multi-Region Tax Support**: Built-in tax rates for all Canadian provinces and territories (GST, PST, HST).
-   **Custom Tax Rates**: Flexible "Custom Region" option to manually input any tax rate for other locations.
-   **Bilingual Interface**: Seamlessly switch between English and Traditional Chinese (繁體中文).
-   **Progressive Web App (PWA)**: Installable on mobile and desktop devices for an app-like experience. Works offline.
-   **Real-time Calculation**: See the breakdown of original price, total discount, pre-tax price, estimated tax, and final price instantly.

## Technology Stack

This project is built with modern web technologies for performance and developer experience:

-   **[React](https://react.dev/)**: For building a dynamic and responsive user interface.
-   **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for fast development and building.
-   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development and styling.
-   **[Lucide React](https://lucide.dev/)**: Beautiful, consistent icons.
-   **[Vite PWA Plugin](https://vite-pwa-org.netlify.app/)**: For generating the Web App Manifest and Service Worker to enable PWA capabilities.

## Getting Started

To run this project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/chiwulin/discount-calculator.git
    cd discount-calculator
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```
