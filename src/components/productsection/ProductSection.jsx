import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ProductCard from "../productcard/ProductCard";

export default function ProductSection({ products }) {
  return (
    <div>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={6} md={4} lg={3} className="my-2 border border-5">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
