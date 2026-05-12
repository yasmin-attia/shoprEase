import React, { useRef, useState } from "react";
import "../../TheSass.scss";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FaShopify } from "react-icons/fa";
import { IoIosSearch, IoMdLogIn } from "react-icons/io";
import { TbRegistered } from "react-icons/tb";
import { errorhandeler } from "../../utills/errorHandle";
import { API } from "../../apis/API";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/slices/userSlice";

export default function AppNav() {
  // hooks
  // const searchRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchArray, setSearchArray] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const go = useNavigate();
  const { isLoggedIn } = useSelector((store) => store.user);
  // search handle function
  async function searchHandle(ev) {
    ev.preventDefault();
    setShowSearch(true);
    // const values = searchRef.current?.value;
    const values = searchValue;
    // console.log(values);
    try {
      const response = await API.get(`/products/search?q=${values}`);
      // console.log(response.data.products);
      setSearchArray(response.data.products);
      //   console.log(searchArray);
    } catch (error) {
      errorhandeler(error);
    }
  }
  // handle LogOut
  function handleLogOut() {
    dispatch(clearUser());
    // localstorge
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    go("/verifyuser");
  }
  return (
    <>
      <Navbar expand="lg ">
        <Container>
          <Navbar.Brand>
            <div className="Center">
              <FaShopify className="text-primary " />
              <h5 className="mt-2" style={{ fontStyle: "oblique" }}>
                Shope<span className="text-primary">Ease</span>
              </h5>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-content" />
          <Navbar.Collapse id="navbar-content">
            <div className="w-100 d-flex flex-column align-items-center  flex-md-row justify-content-between ">
              <Nav>
                <Nav.Item>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to={"/products"}>
                    Products
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to={"/cart"}>
                    Cart
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              {/* search bar */}
              <Form
                onSubmit={searchHandle}
                style={{ position: "relative", zIndex: 1000, width: 350 }}
              >
                <FormGroup>
                  <InputGroup>
                    <FormControl
                      // ref={searchRef}
                      type="search"
                      placeholder="search for product....."
                      onChange={(ev) => setSearchValue(ev.target.value)}
                      onBlur={(ev) => setShowSearch(false)}
                    />
                    <InputGroup.Text className="bg-primary">
                      <Button
                        variant="outline-primary"
                        className="border-0 text-light"
                        disabled={!searchValue}
                        type="submit"
                      >
                        <IoIosSearch />
                      </Button>
                    </InputGroup.Text>
                  </InputGroup>
                </FormGroup>
                {showSearch && (
                  <div className="searchbox">
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {searchArray.slice(0, 5).map((product) => (
                        <li className="searchitem" key={product.id}>
                          <Link
                            to={`/product/${product.id}`}
                            className="text-dark"
                            style={{
                              textDecoration: "none",
                              display: "block",
                              padding: "10px",
                            }}
                            onClick={() => setShowSearch(false)}
                          >
                            <span className="me-1">
                              <IoIosSearch />
                            </span>

                            {product.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Form>
              {/* buttons */}
              <div className="Center">
                {isLoggedIn && (
                  <Button variant="outline-primary" onClick={handleLogOut}>
                    LogOut
                  </Button>
                )}
                {!isLoggedIn && (
                  <>
                    <Button
                      variant="outline-black"
                      className="Center"
                      as={Link}
                      to={"/login"}
                      style={{ height: 30, border: "none" }}
                    >
                      <IoMdLogIn className="text-primary " />
                      <p className="mt-2">LogIn</p>
                    </Button>
                    <Button
                      variant="outline-black"
                      className="Center"
                      as={Link}
                      to="/register"
                      style={{ height: 30, border: "none" }}
                    >
                      {/* <TbRegistered className="text-primary " /> */}
                      <p className="mt-2 ">Register</p>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
