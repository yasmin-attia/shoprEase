import React from "react";
import { Spinner } from "react-bootstrap";
import "../../index.css";
export default function Loading() {
  return (
    <div>
      <div className="Center" style={{ marginTop: 200 }}>
        <Spinner style={{ color: "blue" }}></Spinner>
      </div>
    </div>
  );
}
