import React, { useState, useEffect } from "react";
import './Login.css'; 
import Panda from '../assets/panda.png'; 
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [consecutiveFailures, setConsecutiveFailures] = useState(0);
    const [loginLocked, setLoginLocked] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setInvalidCredentials(false); // Reset invalid credentials error
    };

    const handleLogin = async () => {
        if (loginLocked) {
            alert("Login temporarily locked. Please try again after \n30 seconds.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/check_user/", formData);
            if (response.data.exists) {
                console.log('Login successful');
                const csrfToken = response.headers['x-csrf-token'];
                localStorage.setItem('csrfToken', csrfToken);
                
                // Store user email in localStorage
                localStorage.setItem('user_email', formData.email);
                
                console.log('CSRF Token:', csrfToken);
                navigate('/Home');
            } else {
                // Clear email and password inputs
                setFormData({ email: "", password: "" });
                setInvalidCredentials(true);
                setConsecutiveFailures(prevFailures => prevFailures + 1);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            // Handle error (optional)
        }
    };

    const handleSignUp = () => {
        navigate('/');
    };
    const handleAdminLogin=()=>{
        navigate('/AdminLogin');
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    useEffect(() => {
        const lockTimer = setTimeout(() => {
            setLoginLocked(false);
            setConsecutiveFailures(0);
        }, 30000); // Lockout for 30 seconds

        if (consecutiveFailures >= 3) {
            setLoginLocked(true);
        }

        return () => clearTimeout(lockTimer);
    }, [consecutiveFailures]);

    return (
        <div className="Login">
            <div className="admin-login">
                <button className="admin-login-btn" onClick={handleAdminLogin}>Admin Login</button>
            </div>
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
                        <input type="text" name="email" placeholder="Enter your email" className="inputField" onChange={handleInputChange} value={formData.email} />
                        <div className="passwordInput">
                            <input type={showPassword ? "text" : "password"} name="password" placeholder={invalidCredentials ? "Invalid Email or Password" : "Enter your password"} className={`inputField ${invalidCredentials ? 'invalid-placeholder' : ''}`} onChange={handleInputChange} value={formData.password} />
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
            </div>
            <div className="login-right">
                <img src={Panda} alt="Panda" />
            </div>
        </div>
    );
}

export default Login;
