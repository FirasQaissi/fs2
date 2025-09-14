import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Features from "../pages/Features";
import Services from "../pages/Services";
import About from "../pages/About";
import MyCard from "../pages/MyCard";
import Favorites from "../pages/Favorites";
import UserProfile from "../pages/UserProfile";
import Cart from "../pages/Cart";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Admin from "../pages/Admin";
import Business from "../pages/Business";

import { Routes } from "react-router-dom";

export default function Default() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/mycard" element={
          <ProtectedRoute roles={["user", "business", "admin"]}>
            <MyCard />
          </ProtectedRoute>
        } />
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={
          <ProtectedRoute roles={["admin"]}>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/business" element={
          <ProtectedRoute roles={["business","admin"]}>
            <Business />
          </ProtectedRoute>
        } />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    )
}