import React, { useState } from "react";
import "../../TheSass.scss";
import { IoHomeOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import ProductDash from "./ProductDash";
import UserDash from "./users/UserDash";
import CartDash from "./carts/CartDash";
export default function DashHome() {
  const [dashItem, setDashItem] = useState("");
  return (
    <>
      <div className="d-flex w-120 " style={{ height: "170vh" }}>
        <section className="p-2" style={{ backgroundColor: "rgb(14, 2, 60)" }}>
          <div>
            <h1 className="text-light">
              Shope<span style={{ color: "rgb(10, 10, 205)" }}>Ease</span>
            </h1>
            <hr className="text-light" />
            <section className="py-2">
              <div className="Center text-light">
                <IoHomeOutline />
                <h2>Dashboard</h2>
              </div>
              <Button
                className="d-flex  align-items-center"
                style={{
                  textDecoration: "none",
                  color: "white",
                  border: "solid 0 ",
                  backgroundColor: "rgb(14, 2, 60)",
                }}
                onClick={(ev) => {
                  setDashItem("products");
                }}
              >
                <AiFillProduct />
                <h3>Products</h3>
              </Button>
              <Button
                className="d-flex align-items-center"
                style={{
                  textDecoration: "none",
                  color: "white",
                  border: "solid 0 ",
                  backgroundColor: "rgb(14, 2, 60)",
                }}
                onClick={(ev) => {
                  setDashItem("users");
                }}
              >
                <FiUsers />
                <h3>Users</h3>
              </Button>
              <Button
                className="d-flex align-items-center"
                style={{
                  textDecoration: "none",
                  color: "white",
                  border: "solid 0 ",
                  backgroundColor: "rgb(14, 2, 60)",
                }}
                onClick={(ev) => setDashItem("carts")}
              >
                <MdOutlineProductionQuantityLimits />
                <h3>Carts</h3>
              </Button>
            </section>
          </div>
        </section>
        <section className="p-5" style={{ width: "75%" }}>
          <h1>DashBoard Home</h1>
          {dashItem == "products" && <ProductDash />}
          {dashItem == "users" && <UserDash />}
          {dashItem == "carts" && <CartDash />}
        </section>
      </div>
    </>
  );
}
