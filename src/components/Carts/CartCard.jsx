import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardSubtitle,
  CardTitle,
} from "react-bootstrap";

export default function CartCard({ cart }) {
  return (
    <div>
      <Card className="h-100">
        <CardBody>
          <CardSubtitle>
             <span>{cart.id}</span>
          </CardSubtitle>
          <CardTitle>
            {cart.products.slice(0,2).map((product) => (
              <h5>{product.title}</h5>
            ))}
          </CardTitle>
        </CardBody>
      </Card>
    </div>
  );
}
