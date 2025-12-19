import "./styles.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import ListProducts_SP from "./ListProducts_SP";
import Trang1 from "./Trang1";
import Trang2 from "./Trang2";
import Chitietsanpham from "./Chitietsanpham";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import ProtectedRoute from "./ProtectedRoute";
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
import EditProduct from "./EditProduct";
import ChatPage from "./ChatPage";
import CartPage from "./CartPage";

import Compare from "./pages/Compare";

import { CompareProvider } from "./CompareContext";
import { CartProvider } from "./CartContext";

export default function App() {
  return (
    <CompareProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ListProducts_SP />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="compare" element={<Compare />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="Showroom" element={<Trang1 />} />
              <Route path="trang2" element={<Trang2 />} />
              <Route path="sanpham/:id" element={<Chitietsanpham />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="logout" element={<LogoutPage />} />
              // Trong App.js
              <Route path="/chitietsanpham/:id" element={<Chitietsanpham />} />
              <Route
                path="admin/products"
                element={
                  <ProtectedRoute>
                    <ListProducts_SP_Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="admin/edit/:id" element={<EditProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </CompareProvider>
  );
}
