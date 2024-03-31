

import React, { useState } from 'react';
import './Clothing.css';
import { FaHeart, FaUser, FaShoppingCart, FaSearch, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Clothing() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate('/Home');
  }

  const handleCart = () => {
    navigate('/Cart');
  }
  const handleProfile = () => {
    navigate('/Profile');
  }
  const [cartItems, setCartItems] = useState({});

  const addToCart = (productName) => {
    setCartItems(prevItems => ({
      ...prevItems,
      [productName]: (prevItems[productName] || 0) + 1,
    }));
  };

  const increaseQuantity = (productName) => {
    setCartItems(prevItems => ({
      ...prevItems,
      [productName]: prevItems[productName] + 1,
    }));
  };

  const decreaseQuantity = (productName) => {
    setCartItems(prevItems => ({
      ...prevItems,
      [productName]: Math.max(0, prevItems[productName] - 1),
    }));
  };

  const renderCartButton = (productName) => {
    const count = cartItems[productName] || 0;
    return count > 0 ? (
      <div style={{marginLeft:"50px"}}className="quantity-controls">
        <button onClick={() => decreaseQuantity(productName)}><FaMinus /></button>
        <span>{count}</span>
        <button onClick={() => increaseQuantity(productName)}><FaPlus /></button>
      </div>
    ) : (
      <button style={{marginLeft:"50px"}}className="add-to-cart-button" onClick={() => addToCart(productName)}>
        Add to Cart <FaShoppingCart />
      </button>
    );
  };

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
          <FaUser className="icon" onClick={handleProfile}/>
          <FaShoppingCart className="icon" onClick={handleCart}/>
        </div>
      </header>
      <nav className="Clothing-nav">
        <ul>
        <li><div onClick={handleHome}>Home</div></li>
          <li><div>All</div></li>
          <li><div>Women's</div></li>
          <li><div>Men's</div></li>
          <li><div>Kids'</div></li>

        </ul>
      </nav>
      <main className="Clothing-main">
        {/* New Arrivals Section */}
        <section className="Clothing-section">
          <h2>New Arrivals</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src="https://imagescdn.thecollective.in/img/app/product/7/752089-8517132.jpg?w=900&auto=format" alt="Silk Slip Dress" />
              <h3>Silk Slip Dress</h3>
              <div className='addtocartbtn'>
              <p>$150</p>
              {renderCartButton('Summer Blouse')}
              </div>
              
            </div>
            <div className="product-card">
              <img src="https://cobbitaly.com/cdn/shop/files/SSBW2427AMEHANDI_7_614ce595-75d4-47fa-96ea-ac7c57d076f5.jpg?v=1699609995&width=1000" alt="Cropped Hoodie" />
              <h3>Cropped Hoodie</h3>
              <div className='addtocartbtn'>
              <p>$80</p>
              {renderCartButton('Casual T-Shirt')}
              </div>
            </div>
            <div className="product-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzlJRaeHRve_SDSacDS2Cova_5uKJdNLT6crh-Y9tsHA&s" alt="High-Waist Leggings" />
            <h3>High-Waist Leggings</h3>
            <div className='addtocartbtn'>
            <p>$90</p>
              {renderCartButton('High-Waist Leggings')}
              </div>
            </div>
            <div className="product-card">
            <img src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F0d%2F2a%2F0d2a3d131cfea6f3ac3382c5916413275ae531bf.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]" alt="Oversized Blazer" />
            <h3>Oversized Blazer</h3>
            <div className='addtocartbtn'>
            <p>$120</p>
              {renderCartButton('Oversized Blazer')}
              </div>
            </div>
            <div className="product-card">
            <img src="https://ae01.alicdn.com/kf/HTB1F7X2KFXXXXXZXXXXq6xXFXXXy/Men-s-clothing-ez-modern-elegant-business-casual-cashmere-silk-blending-high-quality-suit.jpg" alt="Suits" />
            <h3>Suits</h3>
            <div className='addtocartbtn'>
            <p>$180</p>
              {renderCartButton('Suits')}
              </div>
            </div>
            <div className="product-card">
            <img src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F3d%2F4e%2F3d4e70ed9280b0574abe2552bc7232bc2917d9b6.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" alt="Graphic Tee" />
            <h3>Graphic Tee</h3>
            <div className='addtocartbtn'>
            <p>$30</p>
              {renderCartButton('Graphic Tee')}
              </div>
              
            </div>
            <div className="product-card">
            <img src="https://nextluxury.com/wp-content/uploads/mens-fashion-urban-style.jpg" alt="Spring" />
            <h3>Spring Fashions</h3>
            <div className='addtocartbtn'>
            <p>$50</p>
              {renderCartButton('Spring Fashions')}
              </div>
              
            </div>
          </div>
          
        </section>
        {/* Women's Clothing Section */}
        <section className="Clothing-section">
          <h2>Women's Clothing</h2>
          <div className="product-grid">
          <div className="product-card">
              <img src="https://img.faballey.com/images/product/JMP00070Z/1.JPG" alt="Product 1" />
              <h3>Black Cowl</h3>
              <div className='addtocartbtn'>
              <p>$99</p>
              {renderCartButton('Black Cowl')}
              </div>
            </div>
            <div className="product-card">
               <img src="https://img.faballey.com/images/product/DRS06600Z/1.JPG" alt="Product 2" />
               <h3>Pink Sleeveless Maxi</h3>
               <div className='addtocartbtn'>
             <p>$50</p>
              {renderCartButton('Pink Sleeveless Maxi')}
              </div>
            </div>
          </div>
        </section>
        {/* Men's Clothing Section */}
        <section className="Clothing-section">
          <h2>Men's Clothing</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf" alt="Leather Jacket Men" />
              <h3>Leather Jacket</h3>
              <div className='addtocartbtn'>
              <p>$250</p>
              {renderCartButton('Leather Jacket Men')}
              </div>
            </div>
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e" alt="Sports Jacket Men" />
              <h3>Sports Jacket</h3>
              <div className='addtocartbtn'>
              <p>$150</p>
              {renderCartButton('Sports Jacket Men')}
              </div>
            </div>
          </div>
        </section>
        
      </main>
      <footer className="Clothing-footer">
        <p>&copy; ShopNow - Built With Love</p>
      </footer>
    </div>
  );
}

export default Clothing;

