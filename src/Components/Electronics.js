// Electronics.js

import React from 'react';
import './Electronics.css'; // Import the CSS file for styling
import { FaHeart, FaUser, FaShoppingCart } from 'react-icons/fa';
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
  return (
    <div className="Electronics">
      <header className="Electronics-header">
        <h1 className="logo">ShopNow</h1>
        <div className="header-right">
          <div className="search-container">
            <input type="text" placeholder="Search for products" className="search-input" />
          </div>
          <FaHeart className="icon" />
          <FaUser className="icon" onClick={handleProfile} />
          <FaShoppingCart className="icon" onClick={handleCart}/>
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
        
        <section className="Electronics-section">
          <h2>Phones</h2>
          <div className="product-grid">
          <div className="product-card">
              <img src="https://media.extra.com/s/aurora/100322230_800/Apple-iPhone-14-Pro-Max%2C-5G%2C-128GB%2C-Space-Black?locale=en-GB,en-*,*" alt="Iphone14" />
              <h3>Iphone 14 Pro</h3>
              <p>$1500</p>
            </div>
            <div className="product-card">
              <img src="https://tse3.mm.bing.net/th?id=OIP.eWITfWaKP4HWqXacMDJTtQAAAA&pid=Api&P=0&h=180" alt="S23" />
              <h3>Samsung S23 Ultra</h3>
              <p>$1399</p>
            </div>
          </div>
          
        </section>
        <section className="Electronics-section">
          <h2>Laptops</h2>
          <div className="product-grid">
          <div className="product-card">
              <img src="https://i5.walmartimages.com/asr/0cb7a843-6f55-4c9a-b71d-fa3408d68464_1.10fc412091e6617966cef69fc422f885.jpeg" alt="ThinkPad" />
              <h3>Lenovo ThinkPad</h3>
              <p>$999</p>
            </div>
            <div className="product-card">
              <img src="https://cdn.arstechnica.net/wp-content/uploads/2015/02/MG_4188.jpg" alt="vostro" />
              <h3>Dell Vostro</h3>
              <p>$789</p>
            </div>
          </div>
        </section>
        <section className="Electronics-section">
          <h2>Accessories</h2>
          <div className="product-grid">
          <div className="product-card">
              <img src="https://i.pinimg.com/originals/82/b3/3c/82b33c2c313795bee9f160ddcd4b3397.jpg" alt="travelbag" />
              <h3>Electronics Carry Bag</h3>
              <p>$50</p>
            </div>
            <div className="product-card">
              <img src="https://siri-cdn.appadvice.com/wp-content/appadvice-v2-media/2017/12/best-technology-products_338b6c9cbbf43e07ee7ad6e58c296a1e-xl.jpg" alt="JBL" />
              <h3>JBL Speaker</h3>
              <p>$899</p>
            </div>
            <div className="product-card">
              <img src="https://www.maribestonestop.com/image/prohard/image/data/categories/gbaCla4D1619505838.jpg" alt="HeadPhone" />
              <h3>Boats HeadPhone</h3>
              <p>$680</p>
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
