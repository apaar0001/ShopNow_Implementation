import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartItems = async () => {
    const userEmail = localStorage.getItem('user_email');
    if (!userEmail) {
      navigate('/Login'); // Redirect to Login if user is not logged in
      return;
    }

    try {
      // Fetch cart items info based on user_email
      const cartItemsResponse = await axios.post('http://localhost:8000/api/get_cart_items_info', {
        user_email: userEmail,
      });
      const cartItemsData = cartItemsResponse.data.cart_items_info;
      setCartItems(cartItemsData);

      // Fetch product info for each cart item
      for (const item of cartItemsData) {
        const productInfoResponse = await axios.post('http://localhost:8000/api/get_product_info', {
          product_id: item.product_id,
          category: item.category,
        });
        const productInfo = productInfoResponse.data;
        item.name = productInfo.name;
        item.url = productInfo.url;
        item.price = productInfo.price;
      }

      // Calculate total price
      let total = 0;
      cartItemsData.forEach((item) => {
        total += item.price * item.quantity;
      });
      setTotalPrice(total);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems(); // Call fetchCartItems when the component mounts
  }, []);

  const handleIncreaseQuantity = async (productId, category) => {
    const userEmail = localStorage.getItem('user_email');
    if (!userEmail) {
      navigate('/Login'); // Redirect to Login if user is not logged in
      return;
    }

    try {
      // Fetch total quantity for the product
      const totalQuantityResponse = await axios.post('http://localhost:8000/api/get_product_info', {
        product_id: productId,
        category: category,
      });
      const totalQuantity = totalQuantityResponse.data.quantity;

      // Fetch cart quantity for the product
      const cartQuantityResponse = await axios.post('http://localhost:8000/api/get_cart_quantity/', {
        user_email: userEmail,
        product_id: productId,
        category: category,
      });
      const cartQuantity = cartQuantityResponse.data.quantity;

      if (cartQuantity >= totalQuantity) {
        alert('Max quantity of items available reached.\nCannot add more to cart.');
        return;
      }

      // Call API to increase quantity
      const response = await axios.post('http://localhost:8000/api/add_to_cart/', {
        user_email: userEmail,
        category: category,
        product_id: productId,
        quantity: 1,
      });
      if (response.data.message) {
        // Item quantity updated successfully
        fetchCartItems(); // Refresh cart items after updating quantity
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecreaseQuantity = async (productId, category) => {
    const userEmail = localStorage.getItem('user_email');
    if (!userEmail) {
      navigate('/Login'); // Redirect to Login if user is not logged in
      return;
    }

    try {
      // Call API to decrease quantity
      const response = await axios.post('http://localhost:8000/api/delete_one_from_cart/', {
        user_email: userEmail,
        product_id: productId,
        category: category,
      });
      if (response.data.message) {
        // Item quantity updated successfully
        fetchCartItems(); // Refresh cart items after updating quantity
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  return (
    <div className="Cart">
      <div className="back-to-home">
        <button onClick={() => navigate('/Home')}>Back to Home</button>
      </div>
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="user-details">
        {/* Render user details here if needed */}
      </div>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.product_id}>
            <img src={item.url} alt={item.name} />
            <div className="item-details">
              <div className="item-name">{item.name}</div>
              <div className="price-quantity">
                <div className="price">Price: ${item.price}</div>
                <div className="quantity-controls">
                  <button onClick={() => handleDecreaseQuantity(item.product_id, item.category)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item.product_id, item.category)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bill-section">
        <h2>Bill Details</h2>
        <div className="bill-details">
          <div className="total-items">Total Items: {cartItems.length}</div>
          <div className="total-price">Total Price: ${totalPrice}</div>
          <div className="payment-button">
            <button>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

