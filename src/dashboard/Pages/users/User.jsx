import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { errorhandeler } from "../../../utills/errorHandle";
import { API } from "../../../apis/API";
import { Col, Row } from "react-bootstrap";
import "../../../TheSass.scss";
export default function User() {
  const { id } = useParams();
  const Id = Number(id);
  const [user, setUser] = useState(null);
  //   fetch the user
  useEffect(function () {
    async function fetchUser() {
      try {
        const response = await API.get(`/users/${Id}`);
        setUser(response.data);
      } catch (error) {
        errorhandeler(error);
      }
    }
    fetchUser();
  }, []);
  //   console.log(typeof(Id));
  return (
    <div className="Center mt-5">
      <Row>
        <Col md={12} lg={6}>
          <div>
            <img style={{ width: 200, height: 200 }} src={user?.image} />
          </div>
        </Col>
        <Col md={12} lg={6}>
          <h1>
            {user?.firstName} <span>{user?.lastName}</span>
          </h1>
          <h3 className="text-secondary">{user?.age}</h3>
          <h3 className="text-secondary">{user?.company?.department}</h3>
          <h3 className="text-secondary">{user?.phone}</h3>
        </Col>
      </Row>
    </div>
  );
}
