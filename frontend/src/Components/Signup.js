import React, { useState } from "react";
import './Signup.css'; 
import Elephant from '../assets/elephant.png'; 
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios"; 

const baseURL = "http://127.0.0.1:8000/auth/users/";

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        re_password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSignUp = async () => {
        try {
            const response = await axios.post(baseURL, formData);
            navigate('/Login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("User with this email already exists. Please use a different email or login.");
                setFormData({
                    email: "",
                    name: "",
                    password: "",
                    re_password: ""
                });
            } else {
                alert("User with this email already exists. Please use a different email or Log in.");
            }
        }
    }

    const handleLogin = () => {
        navigate('/Login');
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="Signup">
            <div className="signup-left" style={{ marginLeft: '90px' }}>
                <div className="info">
                    <h2 className="SignupHeading">Create an Account</h2>
                    <div className="SignupPara">
                        Sign up to be part of the ShopNow family!
                    </div>
                </div>

                <div className="SignupSpace">
                    <div className="inputBox">
                        <input type="text" name="name" placeholder="First Name" className="inputField" onChange={handleInputChange} value={formData.name} />
                        <input type="text" name="last_name" placeholder="Last Name" className="inputField" onChange={handleInputChange} value={formData.last_name} />
                        <input type="email" name="email" placeholder="Email" className="inputField" onChange={handleInputChange} value={formData.email} />
                        <input type="tel" name="phone_number" placeholder="Phone Number" className="inputField" onChange={handleInputChange} value={formData.phone_number} />
                        <input type="text" name="street_number" placeholder="Street Number" className="inputField" onChange={handleInputChange} value={formData.street_number} />
                        <input type="text" name="state" placeholder="State" className="inputField" onChange={handleInputChange} value={formData.state} />
                        <input type="text" name="pin_code" placeholder="Pin Code" className="inputField" onChange={handleInputChange} value={formData.pin_code} />
                        <div className="passwordField">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                placeholder="Password" 
                                className="inputField" 
                                onChange={handleInputChange}
                                value={formData.password}
                            />
                            <span className="togglePassword" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className="passwordField">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="re_password" 
                                placeholder="Re Enter the Password" 
                                className="inputField" 
                                onChange={handleInputChange}
                                value={formData.re_password}
                            />
                            <span className="togglePassword" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <div>
                        <button className="SignupBtn" onClick={handleSignUp}>Sign Up</button>
                        <button className="AlreadyCustomerBtn" onClick={handleLogin}>Already a customer?</button>
                    </div>
                </div>
                
            </div>
            <div className="login-right" style={{ height: "100%" }}>
                <img src={Elephant} alt="Elephant" style={{ margin: "200px" }} />
            </div>
        </div>
    );
}

export default Signup;
