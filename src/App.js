import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Sidebar/Sidebar';
import Dashboard from './Components/Boxes/Boxes';
import PrivateRoute from './PrivateRoute';
import Boxes from './Components/Boxes/Boxes';
import Stock from './Components/CurrentStock/Stock';
function App() {
  return (
    <div className="App">
      
      <Routes>
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path="/" element={<PrivateRoute />}>
          <Route element={<Layout/>}>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/boxes' element={<Boxes/>} />
            <Route path='/currentstock' element={<Stock/>} />
          
           
          </Route>
        </Route>
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
     
   
    </div>
  );
}

export default App;
