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
           
          </Route>
     
       
      </Routes>
     
   
    </div>
  );
}

export default App;
