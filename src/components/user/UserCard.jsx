import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardSubtitle,
  CardTitle,
} from "react-bootstrap";

export default function UserCard({ User }) {
  return (
    <div>
      <Card className="h-100">
        <Card.Img src={User.image} />
        <CardBody>
          <CardSubtitle>
            {User.firstName} <span>{User.lastName}</span>
          </CardSubtitle>
          <CardTitle>{User.id}</CardTitle>
        </CardBody>
        <CardFooter>{User.email}</CardFooter>
      </Card>
    </div>
  );
}
