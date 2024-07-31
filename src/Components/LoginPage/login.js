import React, { useState, useEffect } from 'react';
import '../../Styles/login.css';
import Logo from '../../Assets/KALAJEE_LOGO-5_3e0d5ad5-5092-430a-8bce-e4060e272afa_115x.avif';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import { LoginAPI } from '../../Services/APIManager';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsButtonDisabled(!(username && password));

    
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
    if (tokenExpirationTime && new Date(tokenExpirationTime) < new Date()) {
      handleLogout();
    }
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await loginUser();
    // if (!response) {
    //   setErrorMessage("Incorrect username or password");
    // }
  };

  // async function loginUser() {
  //   try {
  //     let res = await LoginAPI(username, password);
  //     console.log("------API login Result---------", res?.data);
  //     if (res?.data?.token) {
  //       const token = res?.data?.token;
  //       localStorage.setItem('webtoken', token);
  //       Cookies.set('webtoken', token, { expires: 1 });

  //       // Set token expiration time (24 hours from now)
  //       const expirationTime = new Date();
  //       expirationTime.setHours(expirationTime.getHours() + 24);
  //       localStorage.setItem('tokenExpirationTime', expirationTime.toISOString());

  //       navigate("/");
  //       return true;
  //     }
  //     if (res.status === 401) {
  //       toast.error("Invalid or expired token. Please Login again !");
  //       handleLogout();
  //     } else {
  //       return false;
  //     }
  //   } catch (e) {
  //     console.log("Error in login", e);
  //     return false;
  //   }
  // }

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('webtoken');
    navigate("/login");
  };

  return (
    <div className='login-form'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <img src={Logo} alt='gail-logo' />
          <div className='input-box'>
            <input 
              type='text' 
              id='username' 
              name='username' 
              placeholder='Username' 
              value={username} 
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMessage('');
              }} 
              required 
            />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input 
              type='password' 
              id='password' 
              name='password' 
              placeholder='Password' 
              value={password} 
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage('');
              }} 
              required 
            />
            <FaLock className='icon' />
          </div>
          {errorMessage && <div className='error-message'>{errorMessage}</div>}
          <button type='submit' disabled={isButtonDisabled}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;


