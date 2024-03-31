import React, { useState } from "react";
import './Login.css'; 
import Panda from '../assets/panda.png'; 
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for the visibility toggle
import Checkbox from './Checkbox';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleLogin = () => {
        navigate('/Home');
    };

    const handleSignUp = () => {
        navigate('/');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle visibility state
    };

    return (
        <div className="Login">
            <div className="login-left">
                
                <div className="info">
                    <h2 className="SigninHeading">Welcome to ShopNow</h2>
                    <div className="SigninPara">
                        It is the one-stop destination for all your shopping needs.<br />
                        Explore all the exciting offers and discounts on our products.
                    </div>
                </div>

                <div className="LoginSpace">
                    <div className="inputBox">
                        <input type="text" placeholder="Enter your email" className="inputField" />
                        <div className="passwordInput">
                            <input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="inputField" />
                            <span onClick={togglePasswordVisibility} className="passwordToggleIcon">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <div className="loginButtons">
                        <button className="LoginBtn" onClick={handleLogin}>Login</button>
                        <button className="SignUpBtn" onClick={handleSignUp}>Sign Up</button>
                    </div>
                </div>

                <Checkbox />
            </div>
            <div className="login-right">
                <img src={Panda} alt="Panda" />
            </div>
        </div>
    );
}

export default Login;
