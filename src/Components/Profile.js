import React from 'react';
import './Profile.css';
import { FaHeart, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';

function Profile() {
  return (
    <div className="Profile">
      <header className="Profile-header">
        <div className="header-left">
          <h1 className="logo">ShopNow</h1>
        </div>
        <div className="header-right">
          <FaHeart className="icon" />
          <FaUser className="icon" />
          <FaShoppingCart className="icon" />
        </div>
      </header>
      <nav className="Profile-nav">
        <ul>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#orders">Orders</a></li>
          <li><a href="#wishlist">Wishlist</a></li>
          <li><a href="#settings">Settings</a></li>
          <li><a href="#subscription">Subscription</a></li>
          <li><a href="#track-orders">Track Orders</a></li>
        </ul>
      </nav>
      <main className="Profile-main">
        <section id="profile" className="profile-section">
          <h2>Profile Details</h2>
          <div className="profile-info">
            <div className="profile-image">
              <img src="https://cdn.shopify.com/s/files/1/0287/6738/7780/products/PORTRAITOLLOWORANGE.jpg?v=1597638270" alt="Profile" />
            </div>
            <div className="profile-details">
              <p><strong>Name:</strong> Piyush</p>
              <p><strong>Email:</strong> piyush@example.com</p>
              <p><strong>Contact:</strong> +1 234 567 890</p>
              <p><strong>Address:</strong> IIITD , Okhla, New Delhi </p>
            </div>
          </div>
        </section>
        <section id="orders" className="orders-section">
          <h2>Orders History</h2>
          <div className="order-list">
            {/* Render orders history dynamically */}
            <div className="order-item">
              <p>Order #001</p>
              <p>Date: 2024-03-20</p>
              <p>Total: $100</p>
              <p>Status: Shipped</p>
            </div>
            {/* Add more order items */}
          </div>
        </section>
        <section id="wishlist" className="wishlist-section">
          <h2>Wishlist</h2>
          <div className="wishlist-items">
            {/* Render wishlist items dynamically */}
            <div className="wishlist-item">
              <img src="https://www.differencebetween.info/sites/default/files/images/3/order.jpg" alt="Wishlist item" />
              <p>Product Name</p>
              <p>Price: $50</p>
            </div>
            {/* Add more wishlist items */}
          </div>
        </section>
        {/* Other sections like Settings, Subscription, Track Orders, etc. */}
      </main>
      <footer className="Profile-footer">
        <p>&copy; 2024 ShopNow</p>
      </footer>
    </div>
  );
}

export default Profile;
