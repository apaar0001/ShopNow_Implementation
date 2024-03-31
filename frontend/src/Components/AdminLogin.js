import React, { useState, useEffect } from "react";
import './AdminLogin.css'; 
import Panda from '../assets/panda.png'; 
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";

function AdminLogin() {
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
            alert("Login temporarily locked. Please try again after 30 seconds.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/auth/get_admin_id", formData);
            const adminId = response.data.admin_id;

            if (adminId !== 0) {
                console.log('Admin login successful');
                // Navigate to the admin dashboard or home page
                navigate('/AdminHome');
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
        <div className="AdminLogin">
            <div className="admin-login-left">
                <div className="info">
                    <h2 className="SigninHeading">Admin Login</h2>
                    <div className="SigninPara">
                        Hey Old Friend, Welcome Back! <br />
                        Sign in to continue
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
                    </div>
                </div>
            </div>
            <div className="admin-login-right">
                <img src={Panda} alt="Panda" />
            </div>
        </div>
    );
}

export default AdminLogin;
