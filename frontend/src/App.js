import Clothing from './Components/Clothing';
import './App.css';
import Profile from './Components/Profile';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import Home from './Components/Home';
import Electronics from './Components/Electronics';
import Cart from './Components/Cart';
import {BrowserRouter,Routes, Route, useNavigate} from 'react-router-dom'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<SignUp/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/Home" element={<Home/>}/>
    <Route path="/Electronics" element={<Electronics/>}/>
    <Route path="/Clothing" element={<Clothing/>}/>
    <Route path="/Cart" element={<Cart/>}/>
    <Route path="/Profile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
