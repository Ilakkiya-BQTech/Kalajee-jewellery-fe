import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Sidebar/Sidebar';
import Dashboard from './Components/Boxes/Boxes';
import PrivateRoute from './PrivateRoute';
import Boxes from './Components/Boxes/Boxes';
import Stock from './Components/BoxStock/Stock';
import CurrentStock from './Components/CurrentStock/currentstock';
function App() {
  return (
    <div className="App">
      
      <Routes>
        {/* <Route path="/" element={<PrivateRoute />}> */}
          <Route element={<Layout/>}>

            <Route path='/boxes' element={<Boxes/>} />
            <Route path='/currentstock' element={<CurrentStock/>} />
            <Route path="/stock/:boxId" element={<Stock />} />
           
          </Route>
        {/* </Route> */}
       
      </Routes>
     
   
    </div>
  );
}

export default App;
