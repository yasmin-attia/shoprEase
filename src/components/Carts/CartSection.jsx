import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import CartCard from "./CartCard";


export default function CartSection({ carts }) {
  return (
    <div>
      <Row className="h-100">
        {carts.map((cart) => (
          <Col
            key={cart.id}
            sm={6}
            md={4}
            lg={3}
            className="my-2 border border-5"
          >
            <CartCard cart={cart} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
