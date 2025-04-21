# Electric Scooter Dropshipping Store

## Overview
This project is a web application for an electric scooter dropshipping store. It features a modern user interface with animations, a product catalog, a checkout system, user authentication, and account settings management.

## Features
- **Product Catalog**: Displays a list of electric scooters with out-of-stock indicators.
- **Categories**: Allows users to filter products based on different categories.
- **Checkout System**: Users can review their cart, enter shipping information, and complete their purchase.
- **Login System**: Provides user authentication for account access.
- **Settings Management**: Users can update their personal information and preferences.
- **Coupon Code Functionality**: Users can apply discount codes during checkout.
- **Modern UI**: Enhanced with CSS animations for a better user experience.

## Project Structure
```
electric-scooter-store
├── assets
│   ├── css
│   │   ├── animations.css
│   │   ├── main.css
│   │   └── settings.css
│   ├── js
│   │   ├── app.js
│   │   ├── catalog.js
│   │   ├── checkout.js
│   │   ├── login.js
│   │   └── coupons.js
│   └── images
├── index.html
├── categories.html
├── checkout.html
├── login.html
├── settings.html
└── README.md
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Open the project in your preferred code editor.
3. Open `index.html` in a web browser to view the application.

## Usage Guidelines
- Navigate through the product catalog to view available electric scooters.
- Use the categories page to filter products.
- Add items to your cart and proceed to checkout to complete your purchase.
- Create an account or log in to manage your settings and view order history.
- Apply coupon codes during checkout for discounts.

## Coupon Codes
Below are some available coupon codes you can use at checkout:

| Code         | Discount/Effect         | Description                        |
|--------------|------------------------|------------------------------------|
| SAVE10       | 10% off                | 10% discount on your order         |
| SAVE20       | 20% off                | 20% discount on your order         |
| FREESHIP     | Free shipping          | No shipping fee                    |
| SCOOTER5     | 5% off                 | 5% off any scooter                 |
| PARTS15      | 15% off                | 15% off all parts                  |
| ACCESS10     | 10% off                | 10% off all accessories            |
| WELCOME25    | 25% off                | 25% off for new users              |
| ADMIN50      | 50% off                | Admin special discount             |
| SUMMER30     | 30% off                | Summer sale                        |
| BLACKFRIDAY  | 40% off                | Black Friday deal                  |

## Admin Panel
To access the admin panel and approve/disapprove orders, go to `admin.html`. Only users with the email `pyropyro1235@gmail.com` will have access.  
**Password:** `panel`

- The admin can view all orders and set their status to "Approved" or "Disapproved".
- Only orders marked as "Approved" will appear in users' recent purchases.

## Technologies Used
- HTML
- CSS
- JavaScript

## License
This project is licensed under the MIT License.