import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Sidebar/Sidebar';
import Dashboard from './Components/Boxes/Boxes';
import PrivateRoute from './PrivateRoute';
import Boxes from './Components/Boxes/Boxes';
import CurrentStock from './Components/CurrentStock/currentstock';
import Login from './Components/LoginPage/login';
import Notifications from './Components/Notification/Notification';
import BoxStock from './Components/BoxStock/Stock';
function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route element={<Layout/>}>

            <Route path='/boxes' element={<Boxes/>} />
            <Route path='/currentstock' element={<CurrentStock/>} />
            <Route path="/stock/:boxId" element={<BoxStock/>} />
            <Route path='/notification' element={<Notifications/>} />
           
          </Route>
        </Route>
       
      </Routes>
     
   
    </div>
  );
}

export default App;
