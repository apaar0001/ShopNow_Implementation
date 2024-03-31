// Cart.js

import React, { useState, useEffect } from 'react';
import './Cart.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/Home');
  }
  const handleClothing = () => {
    navigate('/Clothing');
  }
  const handleCart = () => {
    navigate('/Cart');
  }
  const handleProfile = () => {
    navigate('/Profile');
  }
  // Sample cart items data with price and images
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Boats Headphone', src: "https://www.maribestonestop.com/image/prohard/image/data/categories/gbaCla4D1619505838.jpg", price: 680, quantity: 1 },
    { id: 2, name: 'High-Waist Leggings', src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzlJRaeHRve_SDSacDS2Cova_5uKJdNLT6crh-Y9tsHA&s", price: 90, quantity: 2 },
    { id: 3, name: 'Light', src: "https://i5.walmartimages.com/asr/27261df2-b921-4d0e-9873-039a420ecc0e_1.5c2567a6ea883b6be0c42624cd9cfe69.jpeg", price: 29, quantity: 3 },
  ]);

  const [totalPrice, setTotalPrice] = useState(0);

  // Sample user details
  const [userDetails, setUserDetails] = useState({
    name: 'Piyush Narula',
    phoneNumber: '123-456-7890',
    address: 'IIITD , Okhla Phase 3, New Delhi, India - 110020',
  });

  // Calculate total price and remove items with quantity 0
  useEffect(() => {
    let total = 0;
    const updatedCartItems = cartItems.filter((item) => item.quantity > 0);
    updatedCartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setCartItems(updatedCartItems);
    setTotalPrice(total);
  }, [cartItems]);

  // Function to handle increasing quantity
  const handleIncreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  // Function to handle decreasing quantity
  const handleDecreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
  };

  return (
    <div className="Cart">
      <div className="back-to-home">
        <button onClick={handleHome}>Back to Home</button>
      </div>
      <div className="user-details">
        <h2 className='heading'>User Details</h2>
        <div className="user-info">
          <div>
            <strong>Name:</strong> {userDetails.name}
          </div>
          <div>
            <strong>Phone Number:</strong> {userDetails.phoneNumber}
          </div>
          <div>
            <strong>Address:</strong> {userDetails.address}
          </div>
        </div>
      </div>
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.src} alt={item.name} />
            <div className="item-details">
              <div className="item-name">{item.name}</div>
              <div className="price-quantity">
                <div className="price">Price: ${item.price}</div>
                <div className="quantity-controls">
                  <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
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


