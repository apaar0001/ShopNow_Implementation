
import React, { useState } from 'react';
import './Electronics.css'; // Import your CSS styles
import { FaHeart, FaUser, FaShoppingCart, FaSearch, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Electronics() {
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

  // State to track cart items and quantity
  const [cartItems, setCartItems] = useState({});

  const addToCart = (productName) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [productName]: (prevItems[productName] || 0) + 1,
    }));
  };

  const increaseQuantity = (productName) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [productName]: prevItems[productName] + 1,
    }));
  };

  const decreaseQuantity = (productName) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [productName]: Math.max(0, prevItems[productName] - 1),
    }));
  };

  // Helper function to render the add to cart or quantity buttons
  const renderCartButton = (productName) => {
    const count = cartItems[productName] || 0;
    return count > 0 ? (
      <div className="quantity-controls" style={{marginLeft:"40px"}}>
        <button  onClick={() => decreaseQuantity(productName)}><FaMinus /></button>
        <span >{count}</span>
        <button  onClick={() => increaseQuantity(productName)}><FaPlus /></button>
      </div>
    ) : (
      <button style={{marginLeft:"40px"}}  className="add-to-cart-button" onClick={() => addToCart(productName)}>
        Add to Cart <FaShoppingCart />
      </button>
    );
  };

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
          <li><div>Accessaries</div></li>


        </ul>
      </nav>
      <main className="Electronics-main">
        {/* Phones Section */}
        <section className="Electronics-section">
          <h2>Phones</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src="https://media.extra.com/s/aurora/100322230_800/Apple-iPhone-14-Pro-Max%2C-5G%2C-128GB%2C-Space-Black?locale=en-GB,en-*,*" alt="Iphone 14 Pro" />
              <h3>Iphone 14 Pro</h3>
              <div style={{display:'flex',marginTop:"10px"}}>
              <p>$1500</p>
              {renderCartButton('Iphone 14 Pro')}
              </div>
            </div>
            <div className="product-card">
              <img src="https://tse3.mm.bing.net/th?id=OIP.eWITfWaKP4HWqXacMDJTtQAAAA&pid=Api" alt="Samsung S23 Ultra" />

              <h3>Samsung S23 Ultra</h3>
              <div style={{display:'flex',marginTop:"10px"}}>
              <p>$1399</p>
              {renderCartButton('Samsung S23 Ultra')}
              </div>
            </div>
          </div>
        </section>
        {/* Laptops Section */}
        <section className="Electronics-section">
          <h2>Laptops</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src="https://i5.walmartimages.com/asr/0cb7a843-6f55-4c9a-b71d-fa3408d68464_1.10fc412091e6617966cef69fc422f885.jpeg" alt="Lenovo ThinkPad" />
              <h3>Lenovo ThinkPad</h3>
              <div style={{display:'flex',marginTop:"10px"}}>
              <p>$999</p>
              {renderCartButton('Lenovo ThinkPad')}
              </div>
            </div>
            <div className="product-card">
              <img src="https://cdn.arstechnica.net/wp-content/uploads/2015/02/MG_4188.jpg" alt="Dell Vostro" />
              <h3>Dell Vostro</h3>
              <div style={{display:'flex',marginTop:"10px"}}>
              <p>$789</p>
              {renderCartButton('Dell Vostro')}
              </div>
            </div>
          </div>
        </section>
        {/* Accessories Section */}
        <section className="Electronics-section">
          <h2>Accessories</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src="https://i.pinimg.com/originals/82/b3/3c/82b33c2c313795bee9f160ddcd4b3397.jpg" alt="Electronics Carry Bag" />

              <h3>Electronics Carry Bag</h3>
              <div style={{display:'flex',marginTop:"10px"}}>
              <p>$50</p>
              {renderCartButton('Electronics Carry Bag')}
              </div>
            </div>
            <div className="product-card">
              <img src="https://siri-cdn.appadvice.com/wp-content/appadvice-v2-media/2017/12/best-technology-products_338b6c9cbbf43e07ee7ad6e58c296a1e-xl.jpg" alt="JBL Speaker" />
              <h3>JBL Speaker</h3>
              <div style={{display:'flex',marginTop:"10px"}}>
              <p>$899</p>
              {renderCartButton('JBL Speaker')}
              </div>
            </div>
            <div className="product-card">
              <img src="https://www.maribestonestop.com/image/prohard/image/data/categories/gbaCla4D1619505838.jpg" alt="Boats HeadPhone" />
              <h3>Boats HeadPhone</h3>
              <div style={{display:'flex',marginTop:"10px"}}>
              <p>$680</p>
              {renderCartButton('Boats HeadPhone')}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="Electronics-footer">
        <p>&copy; ShopNow - Built With Love</p>
      </footer>
    </div>
  );
}

export default Electronics;
