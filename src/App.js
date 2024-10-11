import React from "react";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import PaymentSection from "./components/PaymentSection";

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/payments" element={<PaymentSection />} />
        </Routes>
      </Router>
  );
}

export default App;
