import React, { useState } from 'react';
import axios from 'axios';
import './AdminHome.css';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
    const navigate = useNavigate();
    const [productId, setProductId] = useState('');
    const [category, setCategory] = useState('');
    const [productDetails, setProductDetails] = useState(null);
    const [newPrice, setNewPrice] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemWhat, setItemWhat] = useState('');
    const [searchMessage, setSearchMessage] = useState('');
    const [addItemMessage, setAddItemMessage] = useState('');

    const handleAddItem = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/add_item', {
                url: imageUrl,
                name: itemName,
                price: itemPrice,
                quantity: itemQuantity,
                item_type: itemType,
                what: itemWhat,
            });
            setAddItemMessage('Item added Successfully');
            setTimeout(() => {
                setAddItemMessage('');
            }, 3000);
            setImageUrl('');
            setItemName('');
            setItemPrice('');
            setItemQuantity('');
            setItemType('');
            setItemWhat('');
        } catch (error) {
            console.error('Error adding item:', error);
            setAddItemMessage('Error adding item');
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/get_product_info', {
                product_id: productId,
                category: category,
            });
            if (response.data) {
                setProductDetails(response.data);
                setSearchMessage('');
            } else {
                setProductDetails(null);
                setSearchMessage('No such product found');
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
            setSearchMessage('Error fetching product details');
        }
    };

    const handleApplyChanges = async () => {
        try {
            const priceResponse = await axios.post('http://localhost:8000/api/change_product_price', {
                product_id: productId,
                category: category,
                new_price: newPrice,
            });
            const quantityResponse = await axios.post('http://localhost:8000/api/change_product_quantity', {
                product_id: productId,
                category: category,
                new_quantity: newQuantity,
            });

            setProductDetails((prevDetails) => ({
                ...prevDetails,
                price: parseFloat(newPrice),
                quantity: parseInt(newQuantity),
            }));

            setNewPrice('');
            setNewQuantity('');
        } catch (error) {
            console.error('Error applying changes:', error);
            setSearchMessage('Error Appying product Change');
        }
    };

    return (
        <>
            <div className="AdminSearch">
                <div className='nav'>
                <h1>Admin Settings</h1>
                <button className='navbutton' onClick={() => navigate('/Login')}>User Login</button>
                </div>
                
            </div>
            <div className="AdminSearch">
            <h1>Admin Home</h1>
            <div className="search-form">
              <input
                type="text"
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="decorations">Decorations</option>
              </select>
              <button onClick={handleSearch}>Search</button>
            </div>
            {productDetails && (
              <div className="product-details">
                <img src={productDetails.url} alt={productDetails.name} />
                <div className="details">
                  <h3>{productDetails.name}</h3>
                  <p>Price: ${productDetails.price}</p>
                  <p>Quantity: {productDetails.quantity}</p>
                  <div className="change-form">
                    <input
                      type="text"
                      placeholder="Enter New Price"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Enter New Quantity"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                    />
                    <button onClick={handleApplyChanges}>Apply Changes</button>
                    
                  </div>
                </div>
              </div>
            )}
          </div>
            <div className="AdminAdd">
                <h1>Add New Item</h1>
                <div className="add-item-form">
                    <input
                        type="text"
                        placeholder="Image Url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Quantity"
                        value={itemQuantity}
                        onChange={(e) => setItemQuantity(e.target.value)}
                    />
                    <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="decorations">Decorations</option>
                    </select>
                    <input
                        type="text"
                        placeholder="What's this?"
                        value={itemWhat}
                        onChange={(e) => setItemWhat(e.target.value)}
                    />
                    <button onClick={handleAddItem}>Add Item</button>
                    {addItemMessage && <div className="add-item-message">{addItemMessage}</div>}
                </div>
            </div>
        </>
    );
}

export default AdminHome;
