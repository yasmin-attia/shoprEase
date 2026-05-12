import React, { useState } from "react";
import "./loginstyle.css";
import "../../TheSass.scss";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { errorhandeler } from "../../utills/errorHandle";
import { API } from "../../apis/API";
import { useDispatch } from "react-redux";
import { logInUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Login() {
  // hooks
  const [userName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [appeared, setAppeard] = useState(false);
  const [load, setload] = useState(false);
  const dispatch = useDispatch();
  const go = useNavigate();
  async function handleSubmit(ev) {
    ev.preventDefault();
    const data = {
      username: userName,
      password: Password,
    };
    // console.log(data);
    try {
      const response = await API.post("/auth/login", data);
      const uSer = response.data;
      //   console.log(uSer);
      //   localstorage
      localStorage.setItem("user", JSON.stringify(uSer));
      //   redux
      dispatch(logInUser(uSer));
      // toast
      toast.success("success LogIn");
      //   move
      go("/");
    } catch (error) {
      errorhandeler(error);
    }
  }

  return (
    <>
      <div className="w-100 h-100 form container">
        <Form onSubmit={handleSubmit}>
          <FormGroup className="my-3">
            <FormLabel htmlFor="username" style={{ color: "white" }}>
              Email-Address
            </FormLabel>
            <FormControl
              type="text"
              id="username"
              placeholder="  Enter your userName.."
              onChange={(even) => setUserName(even.target.value)}
            />
          </FormGroup>
          <FormGroup className="my-3">
            <FormLabel htmlFor="password" style={{ color: "white" }}>
              The Password
            </FormLabel>
            <InputGroup>
              <FormControl
                type={appeared ? "text" : "password"}
                id="password"
                placeholder="  Enter your Password.."
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputGroup.Text onClick={(ev) => setAppeard((prev) => !prev)}>
                {appeared ? <FaEye /> : <FaEyeSlash />}
              </InputGroup.Text>
            </InputGroup>
          </FormGroup>
          <Button
            disabled={!userName && !Password}
            className="my-5  w-25"
            type="submit "
          >
            LogIn
          </Button>
        </Form>
      </div>
    </>
  );
}
