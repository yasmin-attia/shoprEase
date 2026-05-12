import React, { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl, InputGroup, Table } from "react-bootstrap";
import { errorhandeler } from "../../../utills/errorHandle";
import { API } from "../../../apis/API";
import "../../../TheSass.scss";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
export default function UserCrud() {
  const [users, setUsers] = useState([]);
  const [search, setSearchArray] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showUpdate, setShowUpdate] = useState(null);
  const firstRef = useRef();
  const lastRef = useRef();
  const ageRef = useRef();
  const searchRef = useRef();
  const updateRef = useRef();
  // fetch users
  useEffect(function () {
    async function fetchUsers() {
      try {
        const response = await API.get(
          "/users?limit=10&select=firstName,lastName,age",
        );
        // console.log(response.data?.users)
        setUsers(response.data?.users);
      } catch (error) {
        errorhandeler(error);
      }
    }
    fetchUsers();
  }, []);
  // handleSearch
  async function handleSearch(ev) {
    ev.preventDefault();
    try {
      const response = await API.get(
        `/users/search?q=${searchRef.current.value}`,
      );
      // console.log(response.data.users);
      setSearchArray(response.data?.users);
      setShowSearch(true);
    } catch (error) {
      errorhandeler(error);
    }
  }
  // adduser
  async function AddUser(ev) {
    ev.preventDefault();
    const Data = {
      firstName: firstRef.current.value,
      lastName: lastRef.current.value,
      age: ageRef.current.value,
    };
    try {
      const response = await API.post("/users/add", Data);
      const AddUser = response.data;
      setUsers([...users, AddUser]);
    } catch (error) {
      errorhandeler.apply(error);
    }
  }
  // updateuser
  async function updateUser(id) {
    setShowUpdate(id);
  }
  async function theHandleUpdate(ev, id) {
    ev.preventDefault();
    const daata = {
      lastName: updateRef.current.value,
    };
    try {
      const response = await API.put(`/users/${id}`, daata);
      // console.log(response.data?.lastName);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? {
                ...user,
                lastName: response.data?.lastName,
              }
            : user,
        ),
      );
      setShowUpdate(null);
    } catch (error) {
      errorhandeler(error);
    }
  }
  // deleteUser
  async function deleteUser(id) {
    try {
      const response = await API.delete(`/users/${id}`);
      // console.log(response.data);
      const Delete = response.data.deletedOn;
      !!Delete &&
        setUsers((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      errorhandeler(error);
    }
  }
  return (
    <>
      <div>
        <div>
          <div>
            <Form onSubmit={AddUser} className="Center">
              <div>
                <FormControl
                  ref={firstRef}
                  className="p-1"
                  type="text"
                  placeholder="  your first name...."
                />
                <FormControl
                  ref={lastRef}
                  className="p-1"
                  type="text"
                  placeholder="  your last name...."
                />
                <FormControl
                  ref={ageRef}
                  className="p-1"
                  type="numbre"
                  placeholder="  your age...."
                />
              </div>
              <Button variant="outline- text-dark" type="submit">
                Add
              </Button>
            </Form>
          </div>
          <form onSubmit={handleSearch} className="m-2">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Enter the name you want to search.."
                ref={searchRef}
              />
              <InputGroupText className="bg-primary">
                <Button type="submit" variant="outline-primary text-light">
                  <FaSearch />
                </Button>
              </InputGroupText>
            </InputGroup>
          </form>
          {showSearch && (
            <div className="searchbox">
              <ul style={{ listStyle: "none", padding: 0 }}>
                {search.slice(0, 5).map((user) => (
                  <li className="searchitem" key={user.id}>
                    <Link
                      to={`/user/${user.id}`}
                      className="text-dark"
                      style={{
                        textDecoration: "none",
                        display: "block",
                        padding: "10px",
                      }}
                      onClick={() => setShowSearch(false)}
                    >
                      {user.firstName}
                      <span>{user.lastName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Table style={{ color: "rgba(1,1,1,0.5)" }}>
          <thead>
            <tr>
              <th> First Name</th>
              <th> Last Name</th>
              <th> Age</th>
              <th className="ps-2"> Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td className="Center gap-1">
                  {!showUpdate && (
                    <Button
                      variant="outline-success"
                      onClick={() => updateUser(user.id)}
                    >
                      Update
                    </Button>
                  )}
                  {showUpdate === user.id && (
                    <div className="updatebox">
                      <Form onSubmit={(ev) => theHandleUpdate(ev, user.id)}>
                        <FormControl
                          type="text"
                          ref={updateRef}
                          placeholder="new name"
                        />
                        <Button type="submit">the update</Button>
                      </Form>
                    </div>
                  )}
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
