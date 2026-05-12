import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductSection from "../../components/productsection/ProductSection";
import { errorhandeler } from "../../utills/errorHandle";
import { API } from "../../apis/API";
import { Swiper } from "swiper/react";
import { Button } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
export default function ProductsCategory() {
  const { category } = useParams();
  const [categoryes, setCategory] = useState([]);
  const [theProducts, setProducts] = useState([]);
  // category
  useEffect(function () {
    async function fetchCategory() {
      try {
        const response = await API.get("/products/categories");
        setCategory(response.data);
        // console.log(response.data);
      } catch (error) {
        errorhandeler(error);
      }
    }
    fetchCategory();
  }, []);
  //   fetch products by category
  useEffect(
    function () {
      async function fetchProductsByCategory() {
        try {
          const response = await API.get(`/products/category/${category}`);
          setProducts(response.data.products);
        } catch (error) {
          errorhandeler(error);
        }
      }
      fetchProductsByCategory();
    },
    [category],
  );
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        allowTouchMove={true}
        className="p-3"
      >
        {categoryes.map((item, index) => (
          <SwiperSlide key={index}>
            <Button
              variant="outline-black
              "
              as={Link}
              to={`/productsCategory/${item.slug}`}
            >
              {item.name}
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
      <h1 className="text-center my-4 " style={{ color: "rgb(2, 4, 66)" }}>
        {category.toLocaleUpperCase()}
      </h1>

      <ProductSection products={theProducts} />
    </>
  );
}
