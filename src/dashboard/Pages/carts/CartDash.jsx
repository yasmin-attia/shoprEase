import React from "react";
import { Link } from "react-router-dom";
import "../../../TheSass.scss";
export default function CartDash() {
  return (
    <div>
      <div
        className="Center gap-5 pt-3 "
        style={{
          backgroundColor: "rgba(1,1,1,0.3)",
          borderRadius: 10,
          height: 300,
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            color: "blue",
            fontSize: "x-large",
            fontWeight: 500,
          }}
          to="/cartcrud"
        >
          Cart Operations
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "blue",
            fontSize: "x-large",
            fontWeight: 500,
          }}
          to="/carts"
        >
          the all Carts
        </Link>
      </div>
    </div>
  );
}
