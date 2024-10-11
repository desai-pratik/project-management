import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Project Dashboard</h1>
      <Link to="/payments" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Payment Tracking
      </Link>
    </header>
  );
};

export default Header;