

import React, { useState } from 'react';
import './Home.css'; // Import the CSS file for styling
import { FaHeart, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const handleElectronics = () => {
    navigate('/Electronics');
  };
  const handleClothing = () => {
    navigate('/Clothing');
  };
  const handleCart = () => {
    navigate('/Cart');
  };
  const handleProfile = () => {
    navigate('/Profile');
  };

  const [cartItems, setCartItems] = useState({}); // State to track cart items and quantity

  const addToCart = (productName) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [productName]: prevItems[productName] ? prevItems[productName] + 1 : 1,
    }));
  };

  const increaseQuantity = (productName) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [productName]: prevItems[productName] + 1,
    }));
  };

  const decreaseQuantity = (productName) => {
    if (cartItems[productName] === 1) {
      const { [productName]: removedItem, ...updatedCart } = cartItems;
      setCartItems(updatedCart);
    } else {
      setCartItems((prevItems) => ({
        ...prevItems,
        [productName]: prevItems[productName] - 1,
      }));
    }
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <h1 className="logo">ShopNow</h1>
        <div className="header-right">
          <div className="search-container">
            <input type="text" placeholder="Search for products" className="search-input" />
          </div>
          <FaHeart className="icon" />
          <FaUser className="icon" onClick={handleProfile} />
          <FaShoppingCart className="icon" onClick={handleCart} />
        </div>
      </header>
      <nav className="Home-nav">
        <ul>
          <li><div onClick={handleElectronics}>Electronics</div></li>
          <li><div onClick={handleClothing}>Clothing</div></li>
          <li><div>Decorations</div></li>
          <li><div>Men's</div></li>
          <li><div>Women's</div></li>
        </ul>
      </nav>
      <main className="Home-main">
        {/* Featured Electronics */}
        <section className="Home-section">
          <h2>Featured Electronics</h2>
          <div className="product-grid">
            <div className="product-card">
              {/* IPhone 13 */}
              <img src="https://i1.wp.com/images.priceoye.pk/apple-iphone-11-pro-max-pakistan-priceoye-uijqj.jpg?ssl=1" alt="Iphone" />
              
              <h3>IPhone 13</h3>
              <div className="priceCart"  style={{display:'flex',alignItems:'flex-start'}}>
              <p>$999</p>
              <div className="add-to-cart">
                {cartItems['IPhone 13'] ? (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity('IPhone 13')}>-</button>
                    <span>{cartItems['IPhone 13']}</span>
                    <button onClick={() => increaseQuantity('IPhone 13')}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart('IPhone 13')}>
                    Add to Cart <FaShoppingCart className="cart-icon" />
                  </button>
                )}
              </div>
              </div>
              
              
            </div>
            <div className="product-card">
              {/* IPhone 13 */}
              <img src="https://images.samsung.com/is/image/samsung/assets/es/galaxy-a52/pcd/a-category/img_bnn_galaxy_device.png?$ORIGIN_PNG$" alt="Samsung" />
              <h3>Samsung Galaxy S23</h3>
              <div className="priceCart"  style={{display:'flex',alignItems:'flex-start'}}>
              <p>$450</p>
              <div className="add-to-cart">
                {cartItems['Samsung Galaxy S23'] ? (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity('Samsung Galaxy S23')}>-</button>
                    <span>{cartItems['Samsung Galaxy S23']}</span>
                    <button onClick={() => increaseQuantity('Samsung Galaxy S23')}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart('Samsung Galaxy S23')}>
                    Add to Cart <FaShoppingCart className="cart-icon" />
                  </button>
                )}
              </div>
              
              </div>
              
            </div>
            <div className="product-card">
              {/* IPhone 13 */}
              <img src="https://i.pinimg.com/originals/dc/21/b9/dc21b9f7f59aa1e57b746e7c1e10648e.jpg" alt="Mac" />
           <h3>MacBook Air</h3>
              <div className="priceCart"  style={{display:'flex',alignItems:'flex-start'}}>
              <p>$1500</p>
              <div className="add-to-cart">
                {cartItems['MacBook Air'] ? (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity('MacBook Air')}>-</button>
                    <span>{cartItems['MacBook Air']}</span>
                    <button onClick={() => increaseQuantity('MacBook Air')}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart('MacBook Air')}>
                    Add to Cart <FaShoppingCart className="cart-icon" />
                  </button>
                )}
              </div>
              </div>
            
              
            </div>
            {/* Add more product cards here */}
          </div>
        </section>
        {/* Trending Clothing */}
        <section className="Home-section">
          <h2>Trending Clothing</h2>
          <div className="product-grid">
            <div className="product-card">
              {/* Silk Slip Dress */}
              <img src="https://imagescdn.thecollective.in/img/app/product/7/752089-8517132.jpg?w=900&auto=format" alt="Silk Slip Dress" />
              <h3>Silk Slip Dress</h3>
              <div className="priceCart"  style={{display:'flex',alignItems:'flex-start'}}>
              <p>$150</p>
              <div className="add-to-cart">
                {cartItems['Silk Slip Dress'] ? (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity('Silk Slip Dress')}>-</button>
                    <span>{cartItems['Silk Slip Dress']}</span>
                    <button onClick={() => increaseQuantity('Silk Slip Dress')}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart('Silk Slip Dress')}>
                    Add to Cart <FaShoppingCart className="cart-icon" />
                  </button>
                )}
              </div>
              </div>
              
            </div>
            <div className="product-card">
            <img src="https://ae01.alicdn.com/kf/HTB1ZoCCRVXXXXaMXFXXq6xXFXXXB/LeJin-Children-Boys-Clothing-Set-Sportswear-Sports-Suit-Boys-Casual-Wear-Shorts-in-Summer-in-100.jpg" alt="Kid" />
              <h3>Kid Summer Collection</h3>
              <div className="priceCart"  style={{display:'flex',alignItems:'flex-start'}}>
              <p>$399</p>
              <div className="add-to-cart">
                {cartItems['Kid Summer Collection'] ? (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity('Kid Summer Collection')}>-</button>
                    <span>{cartItems['Kid Summer Collection']}</span>
                    <button onClick={() => increaseQuantity('Kid Summer Collection')}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart('Kid Summer Collection')}>
                    Add to Cart <FaShoppingCart className="cart-icon" />
                  </button>
                )}
              </div>
              </div>
              
            </div>
            {/* Add more product cards here */}
          </div>
        </section>
        {/* Decorations & Home */}
        <section className="Home-section">
          <h2>Decorations & Home</h2>
          <div className="product-grid">
            <div className="product-card">
              {/* Lamps */}
              <img src="https://2.bp.blogspot.com/-kKprFiTSe6g/UQfUeJtlWJI/AAAAAAAAAO8/ferEVCo7aao/s1600/DSC00032.JPG" alt="lamp" />
              <h3>Lamps</h3>
              <div className="priceCart"  style={{display:'flex',alignItems:'flex-start'}}>
              <p>$99</p>
              <div className="add-to-cart">
                {cartItems['Lamps'] ? (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity('Lamps')}>-</button>
                    <span>{cartItems['Lamps']}</span>
                    <button onClick={() => increaseQuantity('Lamps')}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart('Lamps')}>
                    Add to Cart <FaShoppingCart className="cart-icon" />
                  </button>
                )}
              </div>
              </div>
              
            </div>
            <div className="product-card">
              {/* Lamps */}
              <img src="https://i5.walmartimages.com/asr/27261df2-b921-4d0e-9873-039a420ecc0e_1.5c2567a6ea883b6be0c42624cd9cfe69.jpeg" alt="lights" />
              <h3>Lights</h3>
              <div  className="priceCart" style={{display:'flex',alignItems:'flex-start'}}>
              <p>$29</p>
              <div className="add-to-cart">
                {cartItems['Lights'] ? (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity('Lights')}>-</button>
                    <span>{cartItems['Lights']}</span>
                    <button onClick={() => increaseQuantity('Lights')}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart('Lights')}>
                    Add to Cart <FaShoppingCart className="cart-icon" />
                  </button>
                )}
              </div>
              </div>
              
            </div>
            {/* Add more product cards here */}
          </div>
        </section>
        {/* Men's Collection */}
        <section className="Home-section">
          <h2>Men's Collection</h2>
          <div className="product-grid">
            <div className="product-card">
              {/* Varsity */}
              <img src="http://media.gq.com/photos/5964e0bddaa87a18cb2cac96/master/pass/NY-SS18-Street-Style-Dan-Roberts-21.jpg" alt="Varsity" />
              <h3>Varsity</h3>
              <div className="priceCart"  style={{display:'flex',alignItems:'flex-start'}}>
              <p>$250</p>
              <div className="add-to-cart">
                {cartItems['Varsity'] ? (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity('Varsity')}>-</button>
                    <span>{cartItems['Varsity']}</span>
                    <button onClick={() =>
                  increaseQuantity('Varsity')}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart('Varsity')}>
                    Add to Cart <FaShoppingCart className="cart-icon" />
                  </button>
                )}
              </div>
              </div>
              
            </div>
            <div className="product-card">
              {/* Varsity */}
              <img src="https://i.pinimg.com/originals/ad/10/2b/ad102b3c9e198ac48994ce954745a46a.jpg" alt="Old School" />
              <h3>Old School</h3>
              <div className="priceCart"  style={{display:'flex',alignItems:'flex-start'}}>
              <p>$1299</p>
              <div className="add-to-cart">
                {cartItems['Old School'] ? (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity('Old School')}>-</button>
                    <span>{cartItems['Old School']}</span>
                    <button onClick={() =>
                  increaseQuantity('Old School')}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart('Varsity')}>
                    Add to Cart <FaShoppingCart className="cart-icon" />
                  </button>
                )}
              </div>
              </div>
              
            </div>
            <div className="product-card">
              {/* Varsity */}
              <img src="http://www.outfittrends.com/wp-content/uploads/2015/02/0c6901ab89e5360ca89ee38988cac8db.jpg" alt="Jacket" />
              <h3>Jackets</h3>
              <div className="priceCart"  style={{display:'flex',alignItems:'flex-start'}}>
                <p>$780</p>
              <div className="add-to-cart">
                {cartItems['Jackets'] ? (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity('Jackets')}>-</button>
                    <span>{cartItems['Jackets']}</span>
                    <button onClick={() =>
                  increaseQuantity('Jackets')}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart('Jackets')}>
                    Add to Cart <FaShoppingCart className="cart-icon" />
                  </button>
                )}
              </div>
              </div>
              
            </div>
            {/* Add more product cards here */}
          </div>
        </section>
        {/* Women's Collection */}
        <section className="Home-section">
          <h2>Women's Collection</h2>
          <div className="product-grid">
            <div className="product-card">
              {/* Women Summer Club */}
              <img src="https://www.ohhmymy.com/wp-content/uploads/2015/10/Casual-Cute-Weekend-Outfit.jpg" alt="Summer" />
              <h3>Women Summer Club</h3>
              <div className="priceCart"  style={{display:'flex',alignItems:'flex-start'}}>
              <p>$890</p>
              <div className="add-to-cart">
                {cartItems['Women Summer Club'] ? (
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity('Women Summer Club')}>-</button>
                    <span>{cartItems['Women Summer Club']}</span>
                    <button onClick={() => increaseQuantity('Women Summer Club')}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addToCart('Women Summer Club')}>
                    Add to Cart <FaShoppingCart className="cart-icon" />
                  </button>
                )}
              </div>
              </div>
              
            </div>
            {/* Add more product cards here */}
          </div>
        </section>
      </main>
      <footer className="Home-footer">
        <p>&copy; ShopNow - Built With Love</p>
      </footer>
    </div>
  );
}

export default Home;
