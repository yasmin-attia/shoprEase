import { Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import "react-icons";
import "../../index.css";
import { AiFillStar } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
export default function ProductCard({ product }) {
  const go = useNavigate();
  const dispatch = useDispatch();
  // cart function
  function handlerCart() {
    console.log(1);
    dispatch(addToCart(product));
  }
  // the price after discount
  let theLastPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);
  // rating color function
  function ratingColor(rating) {
    if (rating >= 4) return "green";
    else if (rating >= 2) return "#51CC0E";
    else return "#A9CC0E";
  }
  return (
    <div style={{ height: 430 }}>
      {/* card product */}
      <Card className="card h-100">
        <Card.Img
          className="cardImg"
          style={{ height: 200 }}
          src={product.thumbnail}
        />
        <Card.Body>
          <Card.Title className="pb-1 ">
            <Link
              to={`/product/${product.id}`}
              className="text-dark text-capitalize fs-4"
              style={{
                textDecoration: "none",
                width: "fit-content",
              }}
            >
              {product.title}
            </Link>
          </Card.Title>
          <Card.Subtitle>
            <div
              className="p-2 d-flex gap-1 rounded align-items-center"
              style={{ backgroundColor: "#C8D2E3", width: "fit-content" }}
            >
              <AiFillStar color={ratingColor(product.rating)} />
              <span>{product.rating}</span>
              <span className="text-muted">({product.reviews.length})</span>
            </div>
            <div className="d-flex align-items-center gap-1">
              {!!product.discountPercentage ? (
                <>
                  <span style={{ fontWeight: 600, fontSize: "x-large" }}>
                    {theLastPrice}
                  </span>
                  <span
                    style={{ fontWeight: 500, fontSize: "large" }}
                    className="text-muted text-decoration-line-through"
                  >
                    {product.price}
                  </span>
                </>
              ) : (
                <span style={{ fontWeight: 700, fontSize: "xx-large" }}>
                  {product.price}
                </span>
              )}
              <span
                style={{ color: "#066503", fontSize: "large", fontWeight: 700 }}
              >
                {product.discountPercentage}%
              </span>
            </div>
            {/* brand */}
            {!!product.brand && (
              <div
                style={{
                  backgroundColor: "#280EED",
                  borderRadius: "20px 0 20px 20px",
                  width: "fit-content",
                  color: "white",
                  fontWeight: 400,
                  padding: "5px",
                }}
              >
                {product.brand}
              </div>
            )}
          </Card.Subtitle>
        </Card.Body>
        <Card.Footer style={{ height: 50 }}>
          <Button onClick={handlerCart}>Add to cart</Button>
        </Card.Footer>
        {/* bluebox */}
        <div className="blueBox">
          <p>افضل المنتجات</p>
        </div>
        {/* Add */}
        {/* <div className="cart">
          <Button onClick={() => handlerCart()} variant="outline-primary">
            <IoMdAdd />
          </Button>
        </div> */}
      </Card>
    </div>
  );
}
