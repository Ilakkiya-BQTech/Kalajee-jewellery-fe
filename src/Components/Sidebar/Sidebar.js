// import React, { useState, useEffect, useRef } from 'react';
// import { Outlet, NavLink } from 'react-router-dom';
// import Logo from '../../Assets/KALAJEE_LOGO-5_3e0d5ad5-5092-430a-8bce-e4060e272afa_115x.avif';
// import '../../Styles/sidebar.css';
// import '../../Styles/signout.css';
// import ConfirmationPopup from '../SignOut/SignOut';
// import Footer from '../Footer/Footer';

// export default function Layout() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);
//   const confirmationRef = useRef(null);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//     if (!isOpen) {
//       document.body.style.overflow = 'hidden'; 
//     } else {
//       document.body.style.overflow = 'unset'; 
//     }
//   };

//   const closeSidebar = () => {
//     setIsOpen(false);
//     document.body.style.overflow = 'unset'; 
//   };

//   const handleSignOut = () => {
//     setShowConfirmation(true);
//   };

//   const handleConfirmSignOut = () => {
//     localStorage.removeItem('webToken');
//     window.location.href = '/login';
//   };

//   const handleCancelSignOut = () => {
//     setShowConfirmation(false);
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleOutsideClick = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setShowDropdown(false);
//     }

//     if (isOpen && !event.target.closest('.sidebar') && !event.target.closest('.toggle-button')) {
//       setIsOpen(false);
//       document.body.style.overflow = 'unset'; 
//     }

//     if (showConfirmation && confirmationRef.current && !confirmationRef.current.contains(event.target)) {
//       setShowConfirmation(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, [isOpen, showDropdown, showConfirmation]);

//   return (
//     <div className="layout-container">
//       <div className='navbar'>
//         <div className='logo-toggle'>
//           <div className='toggle-button' onClick={toggleSidebar}>
//             <div className='line line1'></div>
//             <div className='line line2'></div>
//             <div className='line line3'></div>
//           </div>
//           <NavLink to="/" style={{ cursor: 'pointer' }}>
//             <img src={Logo} alt='gail-logo' />
//           </NavLink>
//         </div>
//         <div className='profile' onClick={toggleDropdown} ref={dropdownRef}>
          
//           {/* <img src={Profile} alt='profile' /> */}
//           <div className={`dropdown ${showDropdown ? 'show' : ''}`}>
//             <div className='dropdown-item' onClick={handleSignOut}>Sign out</div>
//           </div>
//         </div>
//       </div>
//       <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//         <div className='menu'>
//           <ul>
//             <NavLink to="/" onClick={closeSidebar} className={({ isActive }) => isActive ? 'active' : ''}><li>View Boxes</li></NavLink>
//             <div className='line-separate'></div>
//             <NavLink to="/currentstock" onClick={closeSidebar} className={({ isActive }) => isActive ? 'active' : ''}><li>Current Stock</li></NavLink>
//             <div className='line-separate'></div>
//             <NavLink to="/outgoingstock" onClick={closeSidebar} className={({ isActive }) => isActive ? 'active' : ''}><li>Create Box</li></NavLink>
//             <div className='line-separate'></div>
//             <NavLink to="/stockhistory" onClick={closeSidebar} className={({ isActive }) => isActive ? 'active' : ''}><li>Stock History</li></NavLink>
//             <div className='line-separate'></div>
//             <NavLink to="/notification" onClick={closeSidebar} className={({ isActive }) => isActive ? 'active' : ''}><li>Notifications</li></NavLink>
//             <div className='line-separate'></div>
//             <div onClick={handleSignOut}><li onClick={closeSidebar}>Sign out</li></div>
//           </ul>
//         </div>
//       </div>

//       {showConfirmation && (
//         <div ref={confirmationRef}>
//           <ConfirmationPopup
//             message="Are you sure you want to end your session?"
//             onConfirm={handleConfirmSignOut}
//             onCancel={handleCancelSignOut}
//           />
//         </div>
//       )}
//       <div className="content">
//         <Outlet />
//       </div>
//       <Footer />
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Logo from '../../Assets/KALAJEE_LOGO-5_3e0d5ad5-5092-430a-8bce-e4060e272afa_115x.avif';
import '../../Styles/sidebar.css';
import '../../Styles/signout.css';
import ConfirmationPopup from '../SignOut/SignOut';
import Footer from '../Footer/Footer';
import { FaBell, FaUser } from 'react-icons/fa'; // Font Awesome icons


export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const confirmationRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset'; 
    }
  };

  const closeSidebar = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset'; 
  };

  const handleSignOut = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSignOut = () => {
    localStorage.removeItem('webToken');
    window.location.href = '/login';
  };

  const handleCancelSignOut = () => {
    setShowConfirmation(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }

    if (isOpen && !event.target.closest('.sidebar') && !event.target.closest('.toggle-button')) {
      setIsOpen(false);
      document.body.style.overflow = 'unset'; 
    }

    if (showConfirmation && confirmationRef.current && !confirmationRef.current.contains(event.target)) {
      setShowConfirmation(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, showDropdown, showConfirmation]);

  return (
    <div className="layout-container">
      <div className='navbar'>
        <div className='logo-toggle'>
          <div className='toggle-button' onClick={toggleSidebar}>
            <div className='line line1'></div>
            <div className='line line2'></div>
            <div className='line line3'></div>
          </div>
          <NavLink to="/" style={{ cursor: 'pointer' }}>
            <img src={Logo} alt='gail-logo' />
          </NavLink>
        </div>
        <div className="nav-actions">
  <NavLink to="/notification" className="notification-link">
    <FaBell className="notification-icon" />
   
  </NavLink>

  <div className='profile' onClick={toggleDropdown} ref={dropdownRef}>
    <FaUser className="profile-icon" />
    <div className={`dropdown ${showDropdown ? 'show' : ''}`}>
      <div className='dropdown-item' onClick={handleSignOut}>Sign out</div>
    </div>
  </div>
</div>

        </div>
      

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className='menu'>
          <ul>
            <NavLink to="/" onClick={closeSidebar} className={({ isActive }) => isActive ? 'active' : ''}><li>View Boxes</li></NavLink>
            <div className='line-separate'></div>
            <NavLink to="/currentstock" onClick={closeSidebar} className={({ isActive }) => isActive ? 'active' : ''}><li>Current Stock</li></NavLink>
            <div className='line-separate'></div>
            <NavLink to="/outgoingstock" onClick={closeSidebar} className={({ isActive }) => isActive ? 'active' : ''}><li>Create Box</li></NavLink>
            <div className='line-separate'></div>
            <NavLink to="/stockhistory" onClick={closeSidebar} className={({ isActive }) => isActive ? 'active' : ''}><li>Stock History</li></NavLink>
            <div className='line-separate'></div>
            <NavLink to="/itemlist" onClick={closeSidebar} className={({ isActive }) => isActive ? 'active' : ''}><li>Pricing</li></NavLink>
            <div className='line-separate'></div>
            <NavLink to="/vendorlist" onClick={closeSidebar} className={({ isActive }) => isActive ? 'active' : ''}><li>Vendors</li></NavLink>
          </ul>
        </div>
      </div>

      {showConfirmation && (
        <div ref={confirmationRef}>
          <ConfirmationPopup
            message="Are you sure you want to end your session?"
            onConfirm={handleConfirmSignOut}
            onCancel={handleCancelSignOut}
          />
        </div>
      )}
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
