# ShopNow - Your One-Stop Shopping Destination

ShopNow is a React-based e-commerce application where users can browse and purchase various products conveniently.

## Features

- User authentication system: Users can sign up for an account and log in securely.
- Browse products: Users can explore a wide range of products across different categories.
- Add to cart: Users can add products to their shopping cart and manage quantities.
- Secure checkout: Users can securely checkout and make payments for their orders.

## Installation

1. Clone the repository:


2. Navigate to the project directory:


3. Install dependencies:


4. Start the development server:


## Usage

### Signup

1. Navigate to the signup page by clicking on the "Sign Up" button on the login page.
2. Fill in the required details and click on the "Sign Up" button.
3. You will be redirected to the login page.

### Login

1. Enter your email and password and click on the "Login" button.
2. If you enter incorrect credentials three times, your account will be locked for 30 seconds.
3. After successful login, you will be redirected to the home page.

### Home Page

1. Browse through different categories of products by clicking on the navigation bar.
2. Click on a product to view details.
3. Add products to your cart by clicking on the "Add to Cart" button.
4. View your cart by clicking on the cart icon in the header.

### Cart

1. View and manage the items in your shopping cart.
2. Increase or decrease the quantity of items in your cart.
3. Proceed to checkout and make payments securely.


## Assumptions

- Single Browser Assumption: Users are recommended to use a single browser instance for a single account. If multiple accounts need to be used simultaneously, it's advised to use different browsers as user details are stored in local storage.
-Cart Items Availability: If a user has items in their cart and before they proceed to pay, another user purchases some or all of the items, then the first user's cart, the cart will be emptied upon refresh If items in the cart is more than the left of the items. Users will need to add the items again based on availability.


## Built With

- React.js
- Axios
- Django
- MySql
- CSS

## Author

Piyush Narula (2022354)



