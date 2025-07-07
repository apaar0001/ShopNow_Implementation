# 🛍️ ShopNow - Your One-Stop Shopping Destination


<div align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
  <img src="https://img.shields.io/badge/maintained-yes-green?style=flat-square" alt="Maintained" />
</div>

<p align="center">
  <strong>A modern, full-stack e-commerce application built with React and Django</strong>
</p>

<p align="center">
  ShopNow is a comprehensive e-commerce platform that provides users with a seamless shopping experience, featuring user authentication, product browsing, cart management, and secure checkout functionality.
</p>

---

## 🌟 Features

### 🔐 **User Authentication**
- **Secure Signup & Login**: Users can create accounts and log in securely
- **Account Security**: Automatic account lockout after 3 failed login attempts (30-second cooldown)
- **Session Management**: Persistent user sessions with secure token handling

### 🛒 **Shopping Experience**
- **Product Catalog**: Browse through a wide variety of products across multiple categories
- **Product Details**: View detailed product information and specifications
- **Smart Search**: Find products quickly with search functionality
- **Category Navigation**: Easy product discovery through organized categories

### 🛍️ **Cart Management**
- **Add to Cart**: Seamlessly add products to your shopping cart
- **Quantity Control**: Adjust item quantities directly in the cart
- **Real-time Updates**: Cart updates reflect immediately across the application
- **Cart Persistence**: Cart items are saved using local storage

### 💳 **Checkout & Payment**
- **Secure Checkout**: Protected payment processing
- **Order Summary**: Review your order before completing the purchase
- **Payment Integration**: Multiple payment options supported

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0 or higher)
- **npm** or **yarn**
- **Python** (v3.8 or higher)
- **MySQL** database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shopnow.git
   cd shopnow
   ```

2. **Frontend Setup**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Start the React development server
   npm start
   ```

3. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Install Python dependencies
   pip install -r requirements.txt
   
   # Run Django migrations
   python manage.py migrate
   
   # Start the Django server
   python manage.py runserver
   ```

4. **Database Configuration**
   - Create a MySQL database for the project
   - Update the database settings in `settings.py`
   - Run migrations to set up the database schema

---

## 📖 Usage Guide

### 👤 **Getting Started**

#### **Sign Up**
1. Navigate to the signup page by clicking **"Sign Up"** on the login page
2. Fill in your details:
   - Full Name
   - Email Address
   - Password (with confirmation)
3. Click **"Sign Up"** to create your account
4. You'll be redirected to the login page

#### **Login**
1. Enter your registered email and password
2. Click **"Login"** to access your account
3. **Security Note**: After 3 incorrect attempts, your account will be locked for 30 seconds
4. Upon successful login, you'll be redirected to the home page

### 🏠 **Home Page & Navigation**

#### **Browse Products**
1. Use the navigation bar to explore different product categories
2. Click on any product card to view detailed information
3. Use the search bar to find specific products
4. Filter products by category, price range, or popularity

#### **Product Details**
1. View high-quality product images
2. Read detailed product descriptions and specifications
3. Check customer reviews and ratings
4. Select product variants (size, color, etc.)

### 🛒 **Shopping Cart**

#### **Adding Items**
1. Click **"Add to Cart"** on any product page
2. Choose quantity and product options
3. View cart icon update with item count
4. Continue shopping or proceed to cart

#### **Cart Management**
1. Click the cart icon in the header to view your cart
2. **Increase/Decrease Quantities**: Use the +/- buttons
3. **Remove Items**: Click the remove button for unwanted items
4. **View Total**: See your cart total update in real-time

#### **Checkout Process**
1. Review your cart items and total
2. Click **"Proceed to Checkout"**
3. Enter shipping and billing information
4. Select payment method
5. Complete your purchase securely

---

## 🏗️ Project Structure

```
shopnow/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── package.json
│   └── README.md
├── backend/
│   ├── shopnow/
│   ├── apps/
│   ├── requirements.txt
│   └── manage.py
└── README.md
```

---

## 🔧 Technology Stack

### **Frontend**
- **React.js** - User interface library
- **Axios** - HTTP client for API requests
- **CSS3** - Styling and responsive design
- **Local Storage** - Client-side data persistence

### **Backend**
- **Django** - Web framework
- **Django REST Framework** - API development
- **MySQL** - Database management
- **JWT** - Authentication tokens

### **Development Tools**
- **npm/yarn** - Package management
- **Git** - Version control
- **VS Code** - Recommended IDE

---

## ⚠️ Important Notes & Assumptions

### **Browser Usage**
- **Single Browser Recommendation**: For optimal experience, use one browser instance per account
- **Multiple Accounts**: If you need to use multiple accounts simultaneously, use different browsers
- **Local Storage**: User details and cart items are stored in browser's local storage

### **Cart Availability**
- **Real-time Stock**: If items in your cart are purchased by other users, your cart will be updated on refresh
- **Stock Validation**: Cart items exceeding available stock will be removed automatically
- **Re-adding Items**: You may need to re-add items based on current availability

### **Security Considerations**
- **Account Lockout**: 3 failed login attempts result in a 30-second account lockout
- **Session Management**: Sessions expire after a period of inactivity
- **Data Protection**: All user data is handled securely and in compliance with privacy standards

---

## 🤝 Contributing

We welcome contributions to ShopNow! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow the existing code style and conventions
- Write clear, concise commit messages
- Include tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. **Check existing issues** on GitHub
2. **Create a new issue** with detailed description
3. **Include steps to reproduce** the problem
4. **Provide your environment details**



---

<div align="center">
  <p>Made with ❤️ by the ShopNow Team</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
