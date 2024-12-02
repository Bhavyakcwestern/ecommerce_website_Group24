import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  AccessoriesPage,
  Cart,
  productsPage,
  ProductDetailsPage,
  AdminPage,
  ManageProductsPage,
} from "./components/Main";
import { SignIn } from "./components/SignIn";

// Utility function to check authentication and user type
const isAuthenticated = () => localStorage.getItem("token");
const getUserType = () => localStorage.getItem("usertype");

const ProtectedRoute = ({ children, userType }) => {
  console.log("is authenticvated ", isAuthenticated(), getUserType())
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  if (userType && getUserType() !== userType) {
    console.log("user type is not equal ", isAuthenticated(), getUserType())
    return <Navigate to="/" />;
  }

  return children;
};

export default function App() {
  return (
    <Router>
      <div className="overflow-x-hidden antialiased">
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>

        <Routes>
          {/* Public Route */}
          <Route path="/" element={<SignIn />} />

          {/* User Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute userType="user">
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute userType="user">
                <productsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accessories"
            element={
              <ProtectedRoute userType="user">
                <AccessoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute userType="user">
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-page/:productId"
            element={
              <ProtectedRoute userType="user">
                <ProductDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute userType="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-products"
            element={
              <ProtectedRoute userType="admin">
                <ManageProductsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
