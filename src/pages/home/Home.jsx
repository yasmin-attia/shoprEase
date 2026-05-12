import React, { useEffect, useState } from "react";
import ProductDetails from "../oneProduct/ProductDetails";
import { Carousel, Col, Row } from "react-bootstrap";
import { images } from "./carouselimages";
import { images1 } from "./homeImages";
import { Link } from "react-router-dom";
import ProductSection from "../../components/productsection/ProductSection";
import { errorhandeler } from "../../utills/errorHandle";
import { API } from "../../apis/API";
import ProductsCategory from "../productsCategory/ProductsCategory";

export default function Home() {
  const [theProducts, setProducts] = useState([]);
  // fetch products
  useEffect(function () {
    async function fetchProducts() {
      try {
        const response = await API.get("/products");
        setProducts(response.data?.products);
      } catch (error) {
        errorhandeler(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      {/* carousel */}
      <Carousel className="mt-1">
        <Carousel.Item>
          <img
            src={images[0]}
            alt="banner1"
            // style={{ width: 1300, height: 500 }}
            className="w-100 "
          />
        </Carousel.Item>
        {images.slice(1, 3).map((imgg, index) => (
          <Carousel.Item key={index} className="h-50">
            <img src={imgg} alt="banner" className="w-100 h-100" />
          </Carousel.Item>
        ))}
      </Carousel>
      {/* some Categories */}
      <section className="container my-5">
        <Row>
          {/* home */}
          <Col md={12} lg={4} className="mt-4">
            <h1 className="text-center">Home</h1>
            <div className="Center text-center gap-3">
              <div>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  className="text-dark "
                  to="/productsCategory/furniture"
                >
                  Furniture
                </Link>
                <img
                  src={images1[1]}
                  alt="home1"
                  style={{ width: 150, height: 100, borderRadius: 10 }}
                />
              </div>
              <div>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  className="text-dark "
                  to={"/productsCategory/home-decoration"}
                >
                  Home Decoration
                </Link>
                <img
                  src={images1[0]}
                  alt="home2"
                  style={{ width: 150, height: 100, borderRadius: 10 }}
                />
              </div>
            </div>
          </Col>
          {/* elctronics */}
          <Col md={12} lg={4} className="mt-4">
            <h1 className="text-center">Electronics</h1>
            <div className="Center text-center gap-3">
              <div>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  className="text-dark "
                  to="/productsCategory/mobile-accessories"
                >
                  Mobile Accessories
                </Link>
                <img
                  src={images1[2]}
                  alt="phone1"
                  style={{ width: 150, height: 100, borderRadius: 10 }}
                />
              </div>
              <div>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  className="text-dark "
                  to={"/productsCategory/smartphones"}
                >
                  SmartPhones
                </Link>
                <img
                  src={images1[3]}
                  alt="phone2"
                  style={{ width: 150, height: 100, borderRadius: 10 }}
                />
              </div>
            </div>
          </Col>
          {/* women */}
          <Col md={12} lg={4} className="mt-4">
            <h1 className="text-center">Women</h1>
            <div className="Center text-center gap-3">
              <div>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  className="text-dark "
                  to="/productsCategory/womens-dresses"
                >
                  Women Dresses
                </Link>
                <img
                  src={images1[4]}
                  alt="home1"
                  style={{ width: 150, height: 100, borderRadius: 10 }}
                />
              </div>

              <div>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  className="text-dark "
                  to={"/productsCategory/womens-shoes"}
                >
                  Women Shoes
                </Link>
                <img
                  src={images1[5]}
                  alt="home2"
                  style={{ width: 150, height: 100, borderRadius: 10 }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </section>
      <section className="mt-4">
        <h1 style={{ fontStyle: "oblique" }}>
          Beauty<span style={{ color: "#0d0645" }}>Picks</span>
        </h1>
        <ProductSection products={theProducts.slice(2, 9)} />
      </section>
      <section className="mt-4">
        <h1 style={{ fontStyle: "oblique" }}>
          Furniture<span style={{ color: "#0d0645" }}>Picks</span>
        </h1>
        <ProductSection products={theProducts.slice(10, 15)} />
      </section>
      <section className="mt-4">
        <h1 style={{ fontStyle: "oblique" }}>
          Food<span style={{ color: "#0d0645" }}>Picks</span>
        </h1>
        <ProductSection products={theProducts.slice(20, 30)} />
      </section>
     
    </>
  );
}
