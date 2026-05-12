import React, { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl, InputGroup, Table } from "react-bootstrap";
import "../../TheSass.scss";
import { errorhandeler } from "../../utills/errorHandle";
import { API } from "../../apis/API";
import { Prev } from "react-bootstrap/esm/PageItem";
export default function ProductDash() {
  const [products, setProducts] = useState([]);
  const Add = useRef();
  //   const [addItem, setAddItem] = useState(null);
  // fetchProducts
  useEffect(function () {
    async function fetchProducts() {
      try {
        const response = await API.get("/products?limit=15&select=id,title");
        setProducts(response.data?.products);
      } catch (error) {
        errorhandeler(error);
      }
    }
    fetchProducts();
  }, []);
  // add function
  async function AddProduct(ev) {
    ev.preventDefault();
    // console.log(add.current.value);
    try {
      const data = {
        title: Add.current.value,
      };
      const response = await API.post("/products/add", data);
      const addItem = response.data;
      addItem.id = products.length + 1;
      setProducts([...products, addItem]);
    } catch (error) {
      errorhandeler(error);
    }
  }
  //  update product
  async function updateProduct(id) {
    const Data = {
      title: "iPhone Galaxy +1",
    };
    try {
      const response = await API.put(`/products/${id}`, Data);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? response.data : product)),
      );
    } catch (error) {
      errorhandeler(error);
    }
  }
  //   delet product
  async function deleteProduct(id) {
    try {
      const response = await API.delete(`/products/${id}`);
      // console.log(response.data);
      response.data.isDeleted === true &&
        setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      errorhandeler(error);
    }
  }
  return (
    <>
      <div>
        <Form onSubmit={AddProduct}>
          <InputGroup>
            <FormControl
              ref={Add}
              type="text"
              placeholder="  Add the product title"
            />
            <InputGroup.Text>
              <Button variant="outline-light text-dark" type="submit">
                Add
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </Form>

        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td className="Center gap-1">
                  <Button
                    variant="outline-success"
                    onClick={() => updateProduct(product.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
