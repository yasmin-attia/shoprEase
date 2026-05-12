import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "../TheSass.scss";
import { useNavigate } from "react-router-dom";
export default function VerifyUser() {
  const [role, setRole] = useState("");
  const go = useNavigate();
  return (
    <div>
      <section
        className=" w-100 pt-5  text-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderRadius: 20,
          height: "50vh",
          color: "rgb(7, 11, 138)",
        }}
      >
        <h1> Please choose Your Role</h1>
        <Form className="Center pt-2">
          <Form.Check
            type="radio"
            name="role"
            onChange={(ev) => {
              setRole(ev.target.value);
              localStorage.setItem("role", JSON.stringify(ev.target.value));
              go("/thedashhome");
            }}
            value={"admin"}
            label="Admin"
          />
          <Form.Check
            type="radio"
            name="role"
            onChange={(ev) => {
              setRole(ev.target.value);
              localStorage.setItem("role", JSON.stringify(ev.target.value));
              go("/");
            }}
            value={"user"}
            label="User"
          />
        </Form>
      </section>
    </div>
  );
}
