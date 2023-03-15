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
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Error Path */}
          <Route path="/401" element={<Unauthorized />} />
          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:keyword" element={<ProductList />} />
          <Route exact path="/me" element={<ProtectedRoute />}>
            <Route path="/me" element={<Profile />} />
          </Route>
          <Route exact path="/me/update" element={<ProtectedRoute />}>
            <Route path="/me/update" element={<UpdateProfile />} />
          </Route>
          <Route exact path="/me/update/password" element={<ProtectedRoute />}>
            <Route path="/me/update/password" element={<UpdatePassword />} />
          </Route>
          <Route exact path="/cart" element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route exact path="/me/order/:id" element={<ProtectedRoute />}>
            <Route path="/me/order/:id" element={<Order />} />
          </Route>

          {/* Admin Route */}
          <Route exact path="/admin" element={<AdminRoute />}>
            <Route path="/admin" element={<AdminMenu />} />
          </Route>
          <Route exact path="/admin/dashboard" element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route exact path="/admin/products" element={<AdminRoute />}>
            <Route path="/admin/products" element={<AdminProducts />} />
          </Route>
          <Route exact path="/admin/orders" element={<AdminRoute />}>
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>
          <Route exact path="/admin/users" element={<AdminRoute />}>
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
          <Route exact path="/admin/reviews" element={<AdminRoute />}>
            <Route path="/admin/reviews" element={<AdminReviews />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
