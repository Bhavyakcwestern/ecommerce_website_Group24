// App.jsx
// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home, AccessoriesPage, Cart, LaptopsPage, ManageProductsPage, ManageProductDetails } from "./components/Main";
import { ProductPage } from "./components/UsersComponents/ProductPage";
import { SignIn } from "./components/SignIn";
import { AdminPageComponent } from "./components/AdminComponents/AdminPageComponent";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {/* Background */}
      <div className="overflow-x-hidden antialiased">
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/laptops"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <LaptopsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accessories"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AccessoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product-page/:productId"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AdminPageComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ManageProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage/:productId"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ManageProductDetails />
              </ProtectedRoute>
            }
          />
          {/* Redirect invalid routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
