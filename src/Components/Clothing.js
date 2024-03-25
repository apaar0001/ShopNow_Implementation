import React from 'react';
import './Clothing.css';
import { FaHeart, FaUser, FaShoppingCart } from 'react-icons/fa';
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
  return (
    <div className="Clothing">
      <header className="Clothing-header">
        <h1 className="logo">ShopNow</h1>
        <div className="header-right">
        <div className="search-container">
            <input type="text" placeholder="Search for products" className="search-input" />
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
        <section className="Clothing-section">
          <h2>New Arrivals</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src="https://imagescdn.thecollective.in/img/app/product/7/752089-8517132.jpg?w=900&auto=format" alt="Silk Slip Dress" />
              <h3>Silk Slip Dress</h3>
              <p>$150</p>
            </div>
            <div className="product-card">
              <img src="https://cobbitaly.com/cdn/shop/files/SSBW2427AMEHANDI_7_614ce595-75d4-47fa-96ea-ac7c57d076f5.jpg?v=1699609995&width=1000" alt="Cropped Hoodie" />
              <h3>Cropped Hoodie</h3>
              <p>$80</p>
            </div>
            <div className="product-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzlJRaeHRve_SDSacDS2Cova_5uKJdNLT6crh-Y9tsHA&s" alt="High-Waist Leggings" />
            <h3>High-Waist Leggings</h3>
            <p>$90</p>
          </div>
          <div className="product-card">
            <img src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F0d%2F2a%2F0d2a3d131cfea6f3ac3382c5916413275ae531bf.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]" alt="Oversized Blazer" />
            <h3>Oversized Blazer</h3>
            <p>$120</p>
          </div>
          <div className="product-card">
            <img src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F3d%2F4e%2F3d4e70ed9280b0574abe2552bc7232bc2917d9b6.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" alt="Graphic Tee" />
            <h3>Graphic Tee</h3>
            <p>$30</p>
          </div>
          <div className="product-card">
            <img src="https://ae01.alicdn.com/kf/HTB1F7X2KFXXXXXZXXXXq6xXFXXXy/Men-s-clothing-ez-modern-elegant-business-casual-cashmere-silk-blending-high-quality-suit.jpg" alt="Suits" />
            <h3>Suits</h3>
            <p>$180</p>
          </div>
          <div className="product-card">
            <img src="https://nextluxury.com/wp-content/uploads/mens-fashion-urban-style.jpg" alt="Spring" />
            <h3>Spring Fashions</h3>
            <p>$50</p>
          </div>
          </div>
        </section>
        <section className="Clothing-section">
          <h2>Women's Clothing</h2>
          <div className="product-grid">
            {/* Add product cards for Women's Clothing */}
            <div className="product-card">
              <img src="https://img.faballey.com/images/product/JMP00070Z/1.JPG" alt="Product 1" />
              <h3>Black Cowl</h3>
              <p>$99</p>
            </div>
            <div className="product-card">
              <img src="https://img.faballey.com/images/product/DRS06600Z/1.JPG" alt="Product 2" />
              <h3>Pink Sleeveless Maxi</h3>
              <p>$50</p>
            </div>
            {/* Add more product cards for Women's Clothing */}
          </div>
        </section>
      </main>
      <footer className="Clothing-footer">
        <p>&copy; ShopNow - Build With Love</p>
      </footer>
    </div>
  );
}

export default Clothing;
