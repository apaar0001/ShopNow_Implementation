
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState({ electronics: [], decorations: [], clothing: [] });
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCartQuantities = async () => {
      const userEmail = localStorage.getItem('user_email');
      if (!userEmail) return;

      const updatedCartItems = {};
      for (const category in products) {
        updatedCartItems[category] = {};
        for (const product of products[category]) {
          const quantity = await fetchCartItemQuantities(product.id, category);
          updatedCartItems[category][product.id] = quantity;
        }
      }
      setCartItems(updatedCartItems);
    };

    fetchCartQuantities();
  }, [products]); // Run this effect when products change

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
      return 0; // Return default quantity if fetching fails
    }
  };

  const handleAddToCart = async (product) => {
    const productName = product.name;
    const productId = product.id; // Assuming products have an 'id' property
    const userEmail = localStorage.getItem('user_email');
    if (!userEmail) return;

    try {
      await axios.post('http://localhost:8000/api/add_to_cart/', {
        user_email: userEmail,
        category: getCategoryForProduct(productName),
        product_id: productId,
        quantity: '1', // Default quantity when adding to cart
      });
      console.log('Item added to cart successfully');
      const quantity = await fetchCartItemQuantities(productId, getCategoryForProduct(productName));
      setCartItems((prevItems) => ({
        ...prevItems,
        [getCategoryForProduct(productName)]: {
          ...prevItems[getCategoryForProduct(productName)],
          [productId]: quantity,
        },
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
      alert('Max quantity of items Available reached.\nCannot add more to cart.');
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

  const getCategoryForProduct = (productName) => {
    // Implement logic to get category based on product name
    // This is just a placeholder, replace it with your actual logic
    if (products.electronics.some((product) => product.name === productName)) {
      return 'electronics';
    } else if (products.decorations.some((product) => product.name === productName)) {
      return 'decorations';
    } else if (products.clothing.some((product) => product.name === productName)) {
      return 'clothing';
    }
    return 'unknown'; // Default category if not found
  };

  const renderProducts = (category) => (
    <div className="product-grid">
      {products[category].slice(0, 3).map((product) => {
        const quantity = cartItems[category] && cartItems[category][product.id];
        return (
          <div className="product-card" key={product.name}>
            <img src={product.url} alt={product.name} />
            <h3>{product.name}</h3>
            <div className="priceCart" style={{ display: 'flex', alignItems: 'flex-start' }}>
              <p>${product.price}</p>
              <div className="add-to-cart">
                
                {quantity && quantity > 0 ? (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(product.id, category)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => increaseQuantity(product.id, category)}>+</button>
                  </div>
                ) : (
                  <button onClick={() => handleAddToCart(product)}>
                    Add to Cart <FaShoppingCart />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="Home">
      <header className="Home-header">
        <h1 className="logo">ShopNow</h1>
        <div className="header-right">
          <div className="search-container">
            <input type="text" placeholder="Search for products" className="search-input" />
            <FaSearch className="search-icon" />
          </div>
          <FaHeart className="icon" />
          <FaUser className="icon" onClick={() => navigate('/Profile')} />
          <FaShoppingCart className="icon" onClick={() => navigate('/Cart')} />
        </div>
      </header>
      <nav className="Home-nav" style={{ cursor: 'pointer' }}>
        <ul>
          <li onClick={() => navigate('/Electronics')}>Electronics</li>
          <li onClick={() => navigate('/Clothing')}>Clothing</li>
          <li onClick={() => navigate('/Decorations')}>Decorations</li>
          {/* Add more categories as needed */}
        </ul>
      </nav>
      <main className="Home-main">
        <section className="Home-section">
          <h2>Featured Electronics</h2>
          {renderProducts('electronics')}
        </section>
        <section className="Home-section">
          <h2>Trending Clothing</h2>
          {renderProducts('clothing')}
        </section>
        <section className="Home-section">
          <h2>Decorations & Home</h2>
          {renderProducts('decorations')}
        </section>
        {/* Additional categories can be added as needed */}
      </main>
      <footer className="Home-footer">
        <p>&copy; ShopNow - Built With Love</p>
      </footer>
    </div>
  );
}

export default Home;
