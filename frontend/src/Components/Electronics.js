import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaUser, FaShoppingCart, FaSearch, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Electronics.css';

function Electronics() {
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

  const [products, setProducts] = useState({ electronics: [] });
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        setProducts({ electronics: response.data.electronics });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const getTotalQuantity = async(productId,category) => {
    try{
      const response = await axios.post('http://localhost:8000/api/get_product_info', {
        product_id: productId,
        category: category,
      });
      return response.data.quantity;
    }catch(error){
      console.error('Error fetching total quantity:', error);
      return 0;
    }

  }

  useEffect(() => {
    const fetchCartQuantities = async () => {
      const userEmail = localStorage.getItem('user_email');
      if (!userEmail) return;

      const updatedCartItems = {};
      updatedCartItems['electronics'] = {};
      for (const product of products.electronics) {
        const quantity = await fetchCartItemQuantities(product.id, 'electronics');
        updatedCartItems['electronics'][product.id] = quantity;
      }
      setCartItems(updatedCartItems);
    };

    fetchCartQuantities();
  }, [products]);

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

  const handleAddToCart = async (productId) => {
    const userEmail = localStorage.getItem('user_email');
    if (!userEmail) return;
  
    try {
      await axios.post('http://localhost:8000/api/add_to_cart/', {
        user_email: userEmail,
        category: 'electronics',
        product_id: productId,
        quantity: 1, // Assuming default quantity is 1 for now
      });
      const quantity = await fetchCartItemQuantities(productId, 'electronics');
      setCartItems((prevItems) => ({
        ...prevItems,
        electronics: { ...prevItems.electronics, [productId]: quantity },
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

  const decreaseQuantity = async (productId, category) => {
    const userEmail = localStorage.getItem('user_email');
    if (!userEmail) return;

    try {
      await axios.post('http://localhost:8000/api/delete_one_from_cart/', {
        user_email: userEmail,
        product_id: productId,
        category: category,
      });
      const quantity = await fetchCartItemQuantities(productId, category);
      setCartItems((prevItems) => ({
        ...prevItems,
        [category]: { ...prevItems[category], [productId]: quantity },
      }));
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const renderCartButton = (productId) => {
    const count = cartItems['electronics'] && cartItems['electronics'][productId] || 0;
    return count > 0 ? (
      <div className="quantity-controls">
        <button onClick={() => decreaseQuantity(productId, 'electronics')}><FaMinus /></button>
        <span>{count}</span>
        <button onClick={() => increaseQuantity(productId, 'electronics')}><FaPlus /></button>
      </div>
    ) : (
      <button className="add-to-cart-button" onClick={() => handleAddToCart(productId)}>
        Add to Cart <FaShoppingCart />
      </button>
    );
  };

  const renderProducts = () => (
    <div className="product-grid">
      {products.electronics.map(product => (
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
    <div className="Electronics">
      <header className="Electronics-header">
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
      <nav className="Electronics-nav">
        <ul>
          <li><div onClick={handleHome}>Home</div></li>
          <li><div>Phones</div></li>
          <li><div>Laptops</div></li>
          <li><div>Accessories</div></li>
        </ul>
      </nav>
      <main className="Electronics-main">
        <section className="Electronics-section">
          <h2>Featured Electronics</h2>
          {renderProducts()}
        </section>
      </main>
      <footer className="Electronics-footer">
        <p>&copy; ShopNow - Built With Love</p>
      </footer>
    </div>
  );
}

export default Electronics;
