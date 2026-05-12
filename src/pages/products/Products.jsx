import React, { useEffect, useState } from "react";
import { API } from "../../apis/API";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Controller, Navigation } from "swiper/modules";
import "swiper/css";
import "../../index.css";
import "../../TheSass.scss";
import { errorhandeler } from "../../utills/errorHandle";
import Imag from "../../assets/products.png";
import { Button, Form, InputGroup } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { Link, Links } from "react-router-dom";
import ProductSection from "../../components/productsection/ProductSection";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
export default function Products() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [nopages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [appear, setAppear] = useState(false);
  const [sortProducts, setSortingProducts] = useState([]);
  const limit = 10;
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
  //fetch products
  useEffect(
    function () {
      async function fetchProduct() {
        try {
          const response = await API.get(
            `/products?limit=${limit}&skip=${skip}`,
          );
          // console.log(response.data);
          setProducts(response.data.products);
          setPages(Math.ceil(response.data.total / limit));
          // console.log(nopages);
        } catch (error) {
          errorHandle(error);
        }
      }
      fetchProduct();
    },
    [skip],
  );
  // calskip fun
  function calSkip(page) {
    setSkip((page - 1) * limit);
  }
  // handleSorting function
  function handleSorting(event) {
    setSort(event.target.value);
    setAppear(true);
  }
  // handleTheSort(sort, order);
  async function handleTheSort(theSort, theOrder) {
    try {
      const response = await API.get(
        `/products?sortBy=${theSort}&order=${theOrder}`,
      );
      setSortingProducts(response.data?.products);
    } catch (error) {
      errorhandeler(error);
    }
  }

  return (
    <div>
      <div className="Center">
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          allowTouchMove={true}
          className="mt-3"
        >
          {category.map((item, index) => (
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
        <div className="Center gap-2">
          <Form style={{ width: 100 }}>
            <Form.Select
              className="bg-dark text-white"
              onChange={handleSorting}
            >
              <option value="" selected>
                Sort By
              </option>
              <option value={"price"}>Price</option>
              <option value={"title"}>Title</option>
              <option value={"rating"}>Rating</option>
              <option value={"stock"}>Stock</option>
            </Form.Select>
          </Form>
          {appear && (
            <Form>
              <Form.Check
                name="order"
                type="radio"
                value={"asc"}
                onChange={(ev) => {
                  const newOrder = ev.target.value;
                  setOrder(newOrder);
                  handleTheSort(sort, newOrder);
                }}
                label="asc"
              />
              <Form.Check
                name="order"
                type="radio"
                value={"desc"}
                onChange={(ev) => {
                  const newOrder = ev.target.value;
                  setOrder(newOrder);
                  handleTheSort(sort, newOrder);
                }}
                label="desc"
              />
            </Form>
          )}
        </div>
      </div>
      {sortProducts.length > 0 ? ( //sortProducts
        <>
          <h1
            style={{
              color: "rgb(18, 18, 240)",
              backgroundColor: "rgba(87, 87, 228, 0.5)",
              borderRadius: 10,
              width: "fit-content",
              textAlign: "center",
            }}
          >
            the Sort Products
          </h1>
          <ProductSection products={sortProducts} />
        </>
      ) : (
        //  products
        <>
          <div className="productbanner my-2 "></div>
          <ProductSection products={products} />
          {/* pagination */}
          <Pagination className="Center">
            {currentPage !== 1 && (
              <Pagination.First
                onClick={() => {
                  setCurrentPage(1);
                  calSkip(1);
                }}
              />
            )}
            <Pagination.Prev
              disabled={currentPage == 1}
              onClick={() => {
                setCurrentPage((prev) => prev - 1);
                calSkip(currentPage - 1);
              }}
            />
            {Array.from({ length: nopages }).map((_, i) => (
              <Pagination.Item
                active={currentPage == i + 1}
                key={i}
                onClick={() => {
                  calSkip(i + 1);
                  setCurrentPage(i + 1);
                }}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage == nopages}
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
                calSkip(currentPage + 1);
              }}
            />
            {currentPage !== nopages && (
              <Pagination.Last
                onClick={() => {
                  calSkip(nopages);
                  setCurrentPage(nopages);
                }}
              />
            )}
          </Pagination>
        </>
      )}
    </div>
  );
}
