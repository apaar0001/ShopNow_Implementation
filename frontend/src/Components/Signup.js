import React, { useState } from "react";
import './Signup.css'; 
import Elephant from '../assets/elephant.png'; 
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons for password visibility toggle

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleSignUp = () => {
        navigate('/Home');
    }

    const handleLogin = () => {
        navigate('/Login');
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the state
    }

    return (
        <div className="Signup">
            <div className="signup-left" style={{marginLeft:'90px'}}>
                <div className="info">
                    <h2 className="SignupHeading">Create an Account</h2>
                    <div className="SignupPara">
                        Sign up to be the part of ShopNow family!
                    </div>
                </div>

                <div className="SignupSpace">
                    <div className="inputBox">
                        <input type="text" placeholder="First Name" className="inputField" />
                        <input type="text" placeholder="Last Name" className="inputField" />
                        <input type="email" placeholder="Email" className="inputField" />
                        <input type="tel" placeholder="Phone Number" className="inputField" />
                        <input type="text" placeholder="Street Number" className="inputField" />
                        <input type="text" placeholder="State" className="inputField" />
                        <input type="text" placeholder="Pin Code" className="inputField" />
                        <div className="passwordField"> {/* Wrap the password input and icon in a div */}
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                className="inputField"
                            />
                            <span className="togglePassword" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle Icon */}
                            </span>
                        </div>
                    </div>
                    <div>
                        <button className="SignupBtn" onClick={handleSignUp}>Sign Up</button>
                        <button className="AlreadyCustomerBtn" onClick={handleLogin}>Already a customer?</button>
                    </div>
                </div>
                
            </div>
            <div className="login-right" style={{height:"100%"}}>
                <img src={Elephant} alt="Elephant" style={{margin:"200px"}} />
            </div>
        </div>
    );
}

export default Signup;
