// import React from "react";
import "./App.css";
import AppRoutes from "./routs";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "@/context/authProtection";
import { Routes, Route } from "react-router-dom";
import Login from "@/templates/Login";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <Toaster
        position="top-center"
        richColors
        closeButton
        duration={3000}
        className="z-2"
        theme="light"
        style={{
          fontFamily: "Inter, sans-serif",
        }}
      />
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppRoutes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
