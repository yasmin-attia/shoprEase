import React, { useEffect, useState } from "react";
import "./index.css";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNav from "./components/AppNav/AppNav";
import { Toaster } from "react-hot-toast";
import { Link, Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/oneProduct/ProductDetails";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Cart from "./pages/cart/Cart.jsx";
import ProductsCategory from "./pages/productsCategory/ProductsCategory";
import { Container } from "react-bootstrap";
import Login from "./pages/loginpage/Login";
import Register from "./pages/Register/Register";
import { useDispatch, useSelector } from "react-redux";
import { errorhandeler } from "./utills/errorHandle";
import { API } from "./apis/API";
import { logInUser } from "./store/slices/userSlice";
import Loading from "./pages/loading/Loading.jsx";
import DashHome from "./dashboard/Pages/DashHome.jsx";
import VerifyUser from "./pages/VerifyUser.jsx";
import { IoHomeOutline } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import User from "./dashboard/Pages/users/User.jsx";
import UserSection from "./components/user/UserSection.jsx";
import Users from "./dashboard/Pages/users/Users.jsx";
import UserCrud from "./dashboard/Pages/users/UserCrud.jsx";
import CartCard from "./components/Carts/CartCard.jsx";
import CartSection from "./components/Carts/CartSection.jsx";
import Carts from "./dashboard/Pages/carts/Carts.jsx";
export default function App() {
  const { isLoggedIn } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const rolee = JSON.parse(localStorage.getItem("role"));
  // varify token
  useEffect(function () {
    async function verifyToken() {
      try {
        const User = JSON.parse(localStorage.getItem("user"));

        const token = User?.accessToken;
        // console.log(token);
        if (token) {
          const url = "/auth/me";

          const response = await API.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log(response);
          const theuser = response.data;
          // console.log(theuser);
          // redux
          dispatch(logInUser(theuser));
        }
      } catch (error) {
        errorhandeler(error);
      } finally {
        setLoading(false);
      }
    }
    verifyToken();
  }, []);
  // should be return not {}
  if (loading) return <Loading />;

  return (
    <>
      <Toaster position="top-right" />

      {rolee != "admin" && (
        <Container>
          <AppNav style={{ position: "sticky", zIndex: 11000 }} />
        </Container>
      )}
      <Routes>
        {rolee == "admin" ? (
          <>
            <Route path="/thedashhome" element={<DashHome />} />
            <Route path={"/user/:id"} Component={User} />
            <Route path="/users" Component={Users} />
            <Route path="/usercrud" Component={UserCrud} />
            <Route path="/cartcrud" Component={CartCard} />
            <Route path="/carts" Component={Carts} />
          </>
        ) : (
          <>
            {!isLoggedIn && (
              <>
                <Route path="/verifyuser" Component={VerifyUser} />
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
              </>
            )}
            <Route path="/" Component={Home} />
            <Route path="/products" Component={Products} />
            <Route path={"/product/:id"} element={<ProductDetails />} />
            <Route path="/cart" Component={Cart} />
            <Route
              path="/productsCategory/:category"
              Component={ProductsCategory}
            />
          </>
        )}
      </Routes>
    </>
  );
}
