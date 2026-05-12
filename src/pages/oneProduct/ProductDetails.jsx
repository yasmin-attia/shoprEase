import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../../TheSass.scss";
import { AiFillStar } from "react-icons/ai";
import { errorhandeler } from "../../utills/errorHandle";
import { API } from "../../apis/API";
import { GrCurrency } from "react-icons/gr";
export default function ProductDetails() {
  const { id } = useParams();
  const theId = Number(id);
  const [product, setProduct] = useState(null);
  // fetch single product
  useEffect(
    function () {
      async function fetchProductDetails() {
        try {
          const response = await API.get(`/products/${theId}`);
          setProduct(response.data);
        } catch (error) {
          errorhandeler(error);
        }
      }
      fetchProductDetails();
    },
    [theId],
  );
  //   console.log(product);
  //   return <>{product?.price}</>;
  // }
  //  maping // rating color
  function ratingColor(rating) {
    if (rating >= 4) return "green";
    else if (rating >= 2) return "#51CC0E";
    else return "#A9CC0E";
  }
  // the price after discount
  // console.log(product);
  let theLastPrice =
    product?.price && product?.discountPercentage
      ? (
          product.price -
          (product.price * product.discountPercentage) / 100
        ).toFixed(2)
      : null;
  return (
    <>
      <Row>
        <Col md={12} lg={6}>
          <div className="Center mt-5">
            <div>
              {product?.images?.slice(0, 2).map((img, index) => (
                <img
                  style={{ width: 100, height: 100 }}
                  src={img}
                  key={index}
                />
              ))}
            </div>
            <div>
              <img
                style={{ width: 200, height: 200 }}
                src={product?.thumbnail}
              />
            </div>
          </div>
        </Col>
        <Col md={12} lg={6} className="p-5">
          <h1>{product?.title}</h1>
          <h1
            style={{
              fontSize: "medium",
              color: "rgb(5, 97, 5)",
              backgroundColor: "rgba(2,54,2,.2)",
              borderRadius: 5,
              width: "fit-content",
            }}
          >
            {product?.stock} Stock
          </h1>
          <div>
            <AiFillStar color={ratingColor(product?.rating)} />
            <span>{product?.rating}</span>
            <span className="text-muted">({product?.reviews?.length})</span>
          </div>
          <div className="m-1">
            {!!product?.discountPercentage ? (
              <>
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: "xx-large",
                    marginRight: 15,
                  }}
                >
                  {theLastPrice}
                </span>
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: "large",
                    marginRight: 15,
                  }}
                  className="text-muted text-decoration-line-through"
                >
                  {product?.price}
                </span>
              </>
            ) : (
              <span style={{ fontWeight: 700, fontSize: "xx-large" }}>
                {product?.price}
              </span>
            )}
            <span
              style={{
                color: "rgb(184, 15, 15)",
                fontSize: "large",
                fontWeight: 700,
                backgroundColor: "rgba(184, 15, 15,.2)",
                borderRadius: 5,
              }}
            >
              {product?.discountPercentage}%
            </span>
          </div>
          <div
            className="Center text-start m-2"
            style={{ color: "rgb(67, 73, 66)" }}
          >
            {product?.description}
          </div>
        </Col>
      </Row>
      <div className="Center mt-3 gap-3">
        <Button
          as={Link}
          to={"/cart"}
          style={{ width: 300 }}
          disabled={product?.stock === 0}
        >
          Add To Cart
        </Button>
      </div>
    </>
  );
}
