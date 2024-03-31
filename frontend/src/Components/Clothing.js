import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaUser, FaShoppingCart, FaSearch, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Clothing.css';
import { AxiosError } from 'axios';

function Clothing() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/Home');
  };

  

  const handleCart = () => {
    navigate('/Cart');
  };

  const handleProfile = () => {
    navigate('/Profile');
  };

  const [clothingItems, setClothingItems] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchClothing = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        setClothingItems(response.data.clothing);
      } catch (error) {
        console.error('Error fetching clothing items:', error);
      }
    };

    fetchClothing();
  }, []);

  useEffect(() => {
    const fetchCartQuantities = async () => {
      const userEmail = localStorage.getItem('user_email');
      if (!userEmail) return;

      const updatedCartItems = {};
      updatedCartItems['clothing'] = {};
      for (const product of clothingItems) {
        const quantity = await fetchCartItemQuantities(product.id, 'clothing');
        updatedCartItems['clothing'][product.id] = quantity;
      }
      setCartItems(updatedCartItems);
    };

    fetchCartQuantities();
  }, [clothingItems]);

  const getTotalQuantity = async (productId, category) => {
    try {
      const response = await axios.post('http://localhost:8000/api/get_product_info', {
        product_id: productId,
        category: category,
      });
      return response.data.quantity;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error HII ', error.response.data);
      } else {
        console.error('Error fetching total quantity:', error);
      }
      return 0;
    }
  };

  const fetchCartItemQuantities = async (productId, category) => {
    try {
      const userEmail = localStorage.getItem('user_email');
      const response = await axios.post('http://localhost:8000/api/get_cart_quantity/', {
        user_email: userEmail,
        product_id: productId,
        category: category,
      });
      return response.data.quantity;
    } catch (error) {
      console.error('Error fetching cart item quantity:', error);
      return 0;
    }
  };

  const addToCart = async (productId) => {
    const userEmail = localStorage.getItem('user_email');
    if (!userEmail) return;

    try {
      await axios.post('http://localhost:8000/api/add_to_cart/', {
        user_email: userEmail,
        category: 'clothing',
        product_id: productId,
        quantity: 1,
      });
      const quantity = await fetchCartItemQuantities(productId, 'clothing');
      setCartItems((prevItems) => ({
        ...prevItems,
        clothing: { ...prevItems.clothing, [productId]: quantity },
      }));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const increaseQuantity = async (productId, category) => {
    const userEmail = localStorage.getItem('user_email');
    if (!userEmail) return;
  
    try {
      const currentQuantity = await fetchCartItemQuantities(productId, category);
      const maxQuantity = await getTotalQuantity(productId, category);
      console.log(maxQuantity);
  
      if (currentQuantity === maxQuantity) {
        alert('Max quantity of items available reached.\nCannot add more to cart.');
        return;
      }
  
      await axios.post('http://localhost:8000/api/add_to_cart/', {
        user_email: userEmail,
        category: category,
        product_id: productId,
        quantity: 1, // Increase quantity by 1
      });
      const quantity = await fetchCartItemQuantities(productId, category);
      setCartItems((prevItems) => ({
        ...prevItems,
        [category]: { ...prevItems[category], [productId]: quantity },
      }));
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const decreaseQuantity = async (productId) => {
    const userEmail = localStorage.getItem('user_email');
    if (!userEmail) return;

    try {
      await axios.post('http://localhost:8000/api/delete_one_from_cart/', {
        user_email: userEmail,
        product_id: productId,
        category: 'clothing',
      });
      const quantity = await fetchCartItemQuantities(productId, 'clothing');
      setCartItems((prevItems) => ({
        ...prevItems,
        clothing: { ...prevItems.clothing, [productId]: quantity },
      }));
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const renderCartButton = (productId) => {
    const count = cartItems['clothing'] && cartItems['clothing'][productId] || 0;
    return count > 0 ? (
      <div className="quantity-controls">
        <button onClick={() => decreaseQuantity(productId)}><FaMinus /></button>
        <span>{count}</span>
        <button onClick={() => increaseQuantity(productId, 'clothing')}><FaPlus /></button>
      </div>
    ) : (
      <button className="add-to-cart-button" onClick={() => addToCart(productId)}>
        Add to Cart <FaShoppingCart />
      </button>
    );
  };

  const renderProducts = () => (
    <div className="product-grid">
      {clothingItems.map((product) => (
        <div className="product-card" key={product.name}>
          <img src={product.url} alt={product.name} />
          <h3>{product.name}</h3>
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <p>${product.price}</p>
            <div style={{ marginLeft: 'auto' }}>
              {renderCartButton(product.id)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="Clothing">
      <header className="Clothing-header">
        <h1 className="logo">ShopNow</h1>
        <div className="header-right">
          <div className="search-container">
            <input type="text" placeholder="Search for products" className="search-input" />
            <FaSearch className="search-icon" />
          </div>

          <FaHeart className="icon" />
          <FaUser className="icon" onClick={handleProfile} />
          <FaShoppingCart className="icon" onClick={handleCart} />
        </div>
      </header>
      <nav className="Clothing-nav">
        <ul>
          <li><div onClick={handleHome}>Home</div></li>
          <li><div>Men's</div></li>
          <li><div>Women's</div></li>
          <li><div>Kids'</div></li>
        </ul>
      </nav>
      <main className="Clothing-main">
        <section className="Clothing-section">
          <h2>All Clothing</h2>
          {renderProducts()}
        </section>
      </main>
      <footer className="Clothing-footer">
        <p>&copy; ShopNow - Built With Love</p>
      </footer>
    </div>
  );
}

export default Clothing;
