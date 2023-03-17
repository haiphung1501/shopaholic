import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/Home/Home";
import Container from "@mui/material/Container";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import ProductDetail from "./components/Product/ProductDetail";
import ProductList from "./components/Product/ProductList";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import AdminRoute from "./components/Route/AdminRoute";
import LayoutRoute from "./components/Route/LayoutRoute";
import Profile from "./components/User/Profile";
import Cart from "./components/Cart/Cart";

import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import Order from "./components/Order/Order";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Unauthorized from "./components/Error/Unauthorized";
import ForbiddenPage from "./components/Error/ForbiddenPage";
import AdminMenu from "./components/Admin/AdminMenu";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminUsers from "./components/Admin/AdminUsers";

import AdminReviews from "./components/Admin/AdminReviews";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Error Path */}
        <Route path="/401" element={<Unauthorized />} />
        <Route path="/403" element={<ForbiddenPage />} />

        <Route exact path="/" element={<LayoutRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:keyword" element={<ProductList />} />
          <Route exact path="/me" element={<ProtectedRoute />}>
            <Route path="/me" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/me/update/password" element={<UpdatePassword />} />
            <Route path="/me/cart" element={<Cart />} />
            <Route path="/me/order/:id" element={<Order />} />
          </Route>
        </Route>

        {/* Admin Route */}
        <Route exact path="/admin" element={<AdminRoute />}>
          <Route path="/admin" element={<AdminMenu />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
