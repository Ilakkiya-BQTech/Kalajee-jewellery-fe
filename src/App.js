// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Layout from './Components/Sidebar/Sidebar';
// import Boxes from './Components/Boxes/Boxes';
// import CurrentStock from './Components/CurrentStock/currentstock';
// import Login from './Components/LoginPage/login';
// import Notifications from './Components/Notification/Notification';
// import BoxStock from './Components/BoxStock/Stock';
// import StockManager from './Components/CreateBox/Outgoingstock';
// import TableComponent from './Components/StockHistory/History';
// import UnreadItemsPage from './Components/StockHistory/UnreadItem';
// import VendorPage from './Components/VendorLogin/VendorPage';
// import ItemDetailPage from './Components/VendorLogin/ItemDetail';
// import FolderPage from './Components/VendorLogin/Folder';
// import Itemlist from './Components/Pricing/Itemlist';
// import VendorList from './Components/Vendors/Vendorslist';
// import VendorDetails from './Components/Vendors/VendorDetails';
// import Cartpage from './Components/VendorLogin/Quotationpage';

// function App() {
//   return (
//     <div className="App">
     
//       <Routes>
        
//           <Route element={<Layout/>}>

//             <Route path='/' element={<Boxes/>} />
//             <Route path='/currentstock' element={<CurrentStock/>} />
//             <Route path="/stock/:boxId" element={<BoxStock/>} />
//             <Route path='/outgoingstock' element={<StockManager/>} />
//             <Route path='/stockhistory' element={<TableComponent/>} />
//             <Route path='/unread' element={<UnreadItemsPage/>} />
//             <Route path='/notification' element={<Notifications/>} />
//             <Route path='/itemlist' element={<Itemlist/>} />
//             <Route path='/vendorlist' element={<VendorList/>} />
//             <Route path="/vendor/:vendorId" element={<VendorDetails/>} />
           
//           </Route>
     
       
//       </Routes>
//       <Routes>
//       <Route path="/login" element={ <Login/>} />
//         <Route path="/" element={  <VendorPage/>} />
//         <Route path="/item-detail" element={<ItemDetailPage/>} />
//         <Route path="/cart" element={<Cartpage/>} />
//         <Route path="/folder" element={<FolderPage/>} />
//       </Routes>

   
   
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Components/Sidebar/Sidebar';
import Boxes from './Components/Boxes/Boxes';
import CurrentStock from './Components/CurrentStock/currentstock';
import Login from './Components/LoginPage/login';
import Notifications from './Components/Notification/Notification';
import BoxStock from './Components/BoxStock/Stock';
import StockManager from './Components/CreateBox/Outgoingstock';
import TableComponent from './Components/StockHistory/History';
import UnreadItemsPage from './Components/StockHistory/UnreadItem';
import VendorPage from './Components/VendorLogin/VendorPage';
import ItemDetailPage from './Components/VendorLogin/ItemDetail';
import FolderPage from './Components/VendorLogin/Folder';
import Itemlist from './Components/Pricing/Itemlist';
import VendorList from './Components/Vendors/Vendorslist';
import VendorDetails from './Components/Vendors/VendorDetails';
import Cartpage from './Components/VendorLogin/Quotationpage';

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole')); // Initialize from localStorage

  // Fetch user role from localStorage when the app is loaded
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setUserRole(role); // Ensure state is synced with localStorage
    }
  }, []);

  // If the user is not logged in, navigate to the login page
  const PrivateRoute = ({ children }) => {
    if (!userRole) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App">
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />

        {/* Private Routes for Admin */}
        {userRole === 'admin' && (
          <Route element={<Layout />}>
            <Route path="/admin-dashboard" element={<Boxes />} />
            <Route path="/currentstock" element={<CurrentStock />} />
            <Route path="/stock/:boxId" element={<BoxStock />} />
            <Route path="/outgoingstock" element={<StockManager />} />
            <Route path="/stockhistory" element={<TableComponent />} />
            <Route path="/unread" element={<UnreadItemsPage />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/itemlist" element={<Itemlist />} />
            <Route path="/vendorlist" element={<VendorList />} />
            <Route path="/vendor/:vendorId" element={<VendorDetails />} />
          </Route>
        )}

        {/* Private Routes for Vendor */}
        {userRole === 'vendor' && (
          <Route >
            <Route path="/vendor-dashboard" element={<VendorPage />} />
            <Route path="/item-detail" element={<ItemDetailPage />} />
            <Route path="/cart" element={<Cartpage />} />
            <Route path="/folder" element={<FolderPage />} />
          </Route>
        )}

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to={userRole ? `/${userRole}-dashboard` : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;
