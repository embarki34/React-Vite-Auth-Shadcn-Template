import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './templates/dashboard';
// import Users from './templates/users';
// import AdUsers from 'templates/adUsers';
// import Orders from './templates/orders';
// import Motivations from './templates/motivations';

const InvalidRoute = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <div className="max-w-lg w-full mx-4 p-8 bg-white rounded-2xl shadow-xl space-y-8">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <svg className="h-20 w-20 text-red-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-red-100 rounded-full filter blur-xl"></div>
        </div>
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 text-center">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

      <a 
        href="/dashboard"
        className="group flex items-center justify-center gap-3 px-8 py-4 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
      >
        <svg className="h-5 w-5 transition-transform group-hover:-translate-y-px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Return to Dashboard
      </a>
    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/users" element={<Users />} />
      <Route path="/add-user" element={<AdUsers />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/motivations" element={<Motivations />} /> */}
      {/* <Route path="/*" element={<InvalidRoute />} /> */}
    </Routes>
  );
};

export default AppRoutes;