import React, { useRef } from "react";
import "../loginpage/loginstyle.css";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../../apis/API";
import toast, { Toaster } from "react-hot-toast";
import { errorhandeler } from "../../utills/errorHandle";
export default function Register() {
  const go = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  // handleRegister func
  async function handleRegister(ev) {
    ev.preventDefault();
    // validition
    if (
      !firstNameRef.current.value ||
      !lastNameRef.current.value ||
      !ageRef.current.value
    ) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const data = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        age: ageRef.current.value,
      };
      const response = await API.post("/users/add", data);
      const newUser = response.data;
      toast.success("Creating your account");
      go("/login");
    } catch (error) {
      errorhandeler(error);
    }
  }
  return (
    <>
      <div className="form">
        <Toaster position="top-center" />
        <div>
          <h1 className=" text-light d-flex justify-content-center align-items-center">
            Create Your Account
          </h1>
          <Form onSubmit={handleRegister}>
            <FormGroup>
              <FormLabel htmlFor="firstname" className="text-light ps-3 pt-2">
                FirstName
              </FormLabel>
              <FormControl
                id="firstname"
                placeholder="  enter your first name...."
                type="text"
                ref={firstNameRef}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="lastname" className="text-light ps-3 pt-2">
                LastName
              </FormLabel>
              <FormControl
                id="lastname"
                placeholder="  enter your last name...."
                type="text"
                ref={lastNameRef}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="age" className="text-light ps-3 pt-2">
                Age
              </FormLabel>
              <FormControl
                id="age"
                placeholder="  enter your age...."
                type="number"
                ref={ageRef}
              />
            </FormGroup>
            <div className="text-light pb-1 my-2 d-flex justify-content-center align-items-center">
              <Button
                type="submit"
                variant="outline-primary"
                style={{ width: 400 }}
              >
                Create Account
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
