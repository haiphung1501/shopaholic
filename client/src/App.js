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
import Profile from "./components/User/Profile";
import Cart from "./components/Cart/Cart";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import Order from "./components/Order/Order";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route exact path="/me/order/:keyword" element={<ProtectedRoute />}>
            <Route path="/me/order/:keyword" element={<Order />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
