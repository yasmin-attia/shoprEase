import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Row } from "react-bootstrap";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../../store/slices/cartSlice";

export default function Cart() {
  const { items, totalAmount } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  function handleRemove(index) {
    dispatch(removeFromCart(index));
  }

  function increaseQuantity(item) {
    dispatch(increaseQty(item));
  }
  function decreaseQuantity(item) {
    dispatch(decreaseQty(item));
  }

  function handleClear() {
    dispatch(clearCart());
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between flex-column mb-3 flex-sm-row">
        <h3>Cart</h3>

        {items.length > 0 && (
          <Button variant="outline-danger" onClick={handleClear}>
            Clear
          </Button>
        )}
      </div>
      {items.length === 0 && (
        <p className="bg-dark p-4 rounded text-center my-2 text-light">
          Please Add Product To Cart
        </p>
      )}

      <h1>total amount: {totalAmount.toFixed(2)}</h1>

      <Row>
        {items.map((item, index) => (
          <Col key={item.id} sm="12" md="6" lg="4">
            <Card>
              <Card.Header>
                <Card.Img src={item.thumbnail} alt={item.title} />
              </Card.Header>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Subtitle>
                  ${item.price} - Quantity: {item.quantity}
                </Card.Subtitle>
              </Card.Body>

              <Card.Footer className="d-flex gap-2">
                <Button
                  variant="warning"
                  onClick={() => decreaseQuantity(item)}
                >
                  Decrease Quantity
                </Button>
                <Button variant="danger" onClick={() => handleRemove(index)}>
                  Remove
                </Button>
                <Button
                  variant="success"
                  onClick={() => increaseQuantity(item)}
                >
                  Increase Quantity
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
