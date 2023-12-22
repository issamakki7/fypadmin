import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import Navbar from "../components/Navbar/Navbar";
import NotFound404 from "../components/NotFound404/NotFound404";
import Footer from "../components/Footer/Footer";
import StatisticsDashboardPage from "../pages/StatisticsDashboardPage/StatisticsDashboardPage";
import BookingsPage from "../pages/BookingsPage/BookingsPage";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import ReviewsPage from "../pages/ReviewsPage/ReviewsPage";
import { Menu } from "../pages/Menu/Menu";
import MenuDecisionPage from "../pages/MenuDecisionPage/MenuDecisionPage";
import AddMenuItemPage from "../pages/AddMenuItemPage/AddMenuItemPage";
import AdminBook from "../components/AdminBook/AdminBook";

function RouterProvider() {
  const currentUser = localStorage.getItem("currentUser");

 

  return (
    <div className="content">
        <Navbar />
        <Routes>
          {/* This component makes sure that only one route appears at a time */}
          <Route path="/" element={<LoginPage />} />
          {currentUser ? (
            <>
              <Route path="/statistics" element={<StatisticsDashboardPage />} />
              <Route path="/bookings" element={<BookingsPage/>} />
              <Route path="/orders" element={<OrdersPage/>} />
              <Route path="/reviews" element={<ReviewsPage/>} />
              <Route path="/edit" element={<MenuDecisionPage/>} />
              <Route path="/edit-menu" element={<Menu/>} />
              <Route path="/add-item" element={<AddMenuItemPage/>} />
              <Route path="/admin-book" element={<AdminBook/>} />

            </>
          ) : (
            <>
              <Route path="/statistics" element={<Navigate to="/" />} />
       
            </>
          )}
          <Route path="/*" element={<NotFound404 />} />
        </Routes>
        <Footer/>
    </div>
  );
}

export default RouterProvider;
