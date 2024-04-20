import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState('');
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
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

        let totalQuantity = 0;
        let totalPrice = 0;

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

          totalQuantity += item.quantity;
          totalPrice += item.price * item.quantity;
        }

        setTotalQuantity(totalQuantity);
        setTotalPrice(totalPrice);
        setCartItems(cartItemsData);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems(); // Call fetchCartItems when the component mounts
  }, []);

  const handlePayment = async () => {
    if (!paymentMode) {
      alert('Please select a payment mode.');
      return;
    }

    try {
      const userEmail = localStorage.getItem('user_email');
      const response = await axios.post('http://localhost:8000/api/remove_product_quantity', {
        user_email: userEmail
      });
      if (response.data.message) {
        alert('Payment successful!');
        navigate('/Home');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleCancelPayment = () => {
    navigate('/Cart');
  };

  return (
    <>
    <div className="Payment">
      <div className="Payment">
        <h1>Payment Portal</h1>
      </div>
      <div className="Payment">
        <div className="payment-info">
          <div className="total-quantity">Total Quantity: {totalQuantity}</div>
          <div className="total-amount">Total Amount: ${totalPrice}</div>
        </div>
        <div className="payment-modes">
          <label>
            <input
              type="radio"
              value="Card"
              checked={paymentMode === 'Card'}
              onChange={() => setPaymentMode('Card')}
            />
            Card
          </label>
          <label>
            <input
              type="radio"
              value="Cash"
              checked={paymentMode === 'Cash'}
              onChange={() => setPaymentMode('Cash')}
            />
            Cash
          </label>
          <label>
            <input
              type="radio"
              value="UPI"
              checked={paymentMode === 'UPI'}
              onChange={() => setPaymentMode('UPI')}
            />
            UPI
          </label>
        </div>
        <div className="payment-buttons">
          <button onClick={handlePayment}>Pay</button>
          <button onClick={handleCancelPayment}>Cancel Payment</button>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default Payment;
