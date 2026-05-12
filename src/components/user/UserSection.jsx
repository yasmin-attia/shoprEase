import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import UserCard from "./UserCard";

export default function UserSection({ users }) {
  return (
    <div>
      <Row>
        {users.map((user) => (
          <Col
            key={user.id}
            sm={6}
            md={4}
            lg={3}
            className="my-2 border border-5"
          >
            <UserCard User={user} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
