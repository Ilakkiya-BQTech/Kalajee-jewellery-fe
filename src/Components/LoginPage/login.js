// import React, { useState, useEffect } from 'react';
// import '../../Styles/login.css';
// import Logo from '../../Assets/KALAJEE_LOGO-5_3e0d5ad5-5092-430a-8bce-e4060e272afa_115x.avif';
// import { FaUser } from "react-icons/fa";
// import { FaLock } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie';

// const Login = ({ setUserRole }) => {
//   let navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
  
//   const adminCredentials = {
//     username: 'admin',
//     password: 'adminad',
//   };

//   const vendorCredentials = {
//     username: 'vendor',
//     password: 'vendorven',
//   };

//   useEffect(() => {
//     setIsButtonDisabled(!(username && password));
//     const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
//     if (tokenExpirationTime && new Date(tokenExpirationTime) < new Date()) {
//       handleLogout();
//     }
//   }, [username, password]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (username === adminCredentials.username && password === adminCredentials.password) {
//       handleLogin('admin');
//     } else if (username === vendorCredentials.username && password === vendorCredentials.password) {
//       handleLogin('vendor');
//     } else {
//       setErrorMessage("Incorrect username or password");
//     }
//   };

//   const handleLogin = (role) => {
//     const token = `${role}-token`;
//     localStorage.setItem('webtoken', token);
//     localStorage.setItem('userRole', role); // Store role in localStorage
//     Cookies.set('webtoken', token, { expires: 1 });
  
//     // Set token expiration time (24 hours from now)
//     const expirationTime = new Date();
//     expirationTime.setHours(expirationTime.getHours() + 24);
//     localStorage.setItem('tokenExpirationTime', expirationTime.toISOString());
  
//     // Navigate based on the role
//     if (role === 'admin') {
//       navigate("/admin-dashboard");
//     } else if (role === 'vendor') {
//       navigate("/vendorpage");
//     }
//   };
  
//   const handleLogout = () => {
//     localStorage.clear();
//     Cookies.remove('webtoken');
//     navigate("/login");
//   };

//   return (
//     <div className='login-form'>
//       <div className='wrapper'>
//         <form onSubmit={handleSubmit}>
//           <img src={Logo} alt='kalajee-logo' />
//           <div className='input-box'>
//             <input 
//               type='text' 
//               id='username' 
//               name='username' 
//               placeholder='Username' 
//               value={username} 
//               onChange={(e) => {
//                 setUsername(e.target.value);
//                 setErrorMessage('');
//               }} 
//               required 
//             />
//             <FaUser className='icon' />
//           </div>
//           <div className='input-box'>
//             <input 
//               type='password' 
//               id='password' 
//               name='password' 
//               placeholder='Password' 
//               value={password} 
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setErrorMessage('');
//               }} 
//               required 
//             />
//             <FaLock className='icon' />
//           </div>
//           {errorMessage && <div className='error-message'>{errorMessage}</div>}
//           <button type='submit' disabled={isButtonDisabled}>Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState, useEffect } from 'react';
import '../../Styles/login.css';
import Logo from '../../Assets/KALAJEE_LOGO-5_3e0d5ad5-5092-430a-8bce-e4060e272afa_115x.avif';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const adminCredentials = {
    username: 'admin',
    password: 'adminad',
  };

  const vendorCredentials = {
    username: 'vendor',
    password: 'vendorven',
  };

  useEffect(() => {
    setIsButtonDisabled(!(credentials.username && credentials.password));
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
    if (tokenExpirationTime && new Date(tokenExpirationTime) < new Date()) {
      handleLogout();
    }
  }, [credentials]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (credentials.username === adminCredentials.username && credentials.password === adminCredentials.password) {
      handleLogin('admin');
    } else if (credentials.username === vendorCredentials.username && credentials.password === vendorCredentials.password) {
      handleLogin('vendor');
    } else {
      setErrorMessage("Incorrect username or password");
    }
  };

  const handleLogin = (role) => {
    const token = `${role}-token`;
    localStorage.setItem('webtoken', token);
    localStorage.setItem('userRole', role); // Store role in localStorage
    Cookies.set('webtoken', token, { expires: 1 });

    // Set token expiration time (24 hours from now)
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 24);
    localStorage.setItem('tokenExpirationTime', expirationTime.toISOString());

    // Set user role in state
    setUserRole(role); // Update user role in parent component

    // Navigate based on the role
    if (role === 'admin') {
      navigate("/admin-dashboard");
    } else if (role === 'vendor') {
      navigate("/vendorpage");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('webtoken');
    setCredentials({ username: '', password: '' }); // Clear input fields
    navigate("/login");
  };

  return (
    <div className='login-form'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <img src={Logo} alt='kalajee-logo' />
          <div className='input-box'>
            <input 
              type='text' 
              id='username' 
              name='username' 
              placeholder='Username' 
              value={credentials.username} 
              onChange={handleChange} 
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
              value={credentials.password} 
              onChange={handleChange} 
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
