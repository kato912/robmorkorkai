import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // เพิ่มตรงนี้

import Login  from './components/pages/loginPage'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* เพิ่มหน้าอื่นๆ ที่นี่ */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;