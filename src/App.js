import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Sidebar/Sidebar';
import Boxes from './Components/Boxes/Boxes';
import CurrentStock from './Components/CurrentStock/currentstock';
import Login from './Components/LoginPage/login';
import Notifications from './Components/Notification/Notification';
import BoxStock from './Components/BoxStock/Stock';
import StockManager from './Components/CreateBox/Outgoingstock';
import TableComponent from './Components/StockHistory/History';
import UnreadItemsPage from './Components/StockHistory/UnreadItem';
import VendorPage from './Components/Vendor/VendorPage';
import ItemDetailPage from './Components/Vendor/ItemDetail';
import FolderPage from './Components/Vendor/Folder';
import Itemlist from './Components/Pricing/Itemlist';
import VendorList from './Components/Vendors/Vendorslist';
import VendorDetails from './Components/Vendors/VendorDetails';

function App() {
  return (
    <div className="App">
     
      <Routes>
        
          <Route element={<Layout/>}>

            <Route path='/' element={<Boxes/>} />
            <Route path='/currentstock' element={<CurrentStock/>} />
            <Route path="/stock/:boxId" element={<BoxStock/>} />
            <Route path='/outgoingstock' element={<StockManager/>} />
            <Route path='/stockhistory' element={<TableComponent/>} />
            <Route path='/unread' element={<UnreadItemsPage/>} />
            <Route path='/notification' element={<Notifications/>} />
            <Route path='/itemlist' element={<Itemlist/>} />
            <Route path='/vendorlist' element={<VendorList/>} />
            <Route path="/vendor/:vendorId" element={<VendorDetails/>} />
           
          </Route>
     
       
      </Routes>
      {/* <Routes>
        <Route path="/" element={  <VendorPage/>} />
        <Route path="/item-detail" element={<ItemDetailPage/>} />
        <Route path="/folder" element={<FolderPage/>} />
      </Routes> */}

   
   
    </div>
  );
}

export default App;
