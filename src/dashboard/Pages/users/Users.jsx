import React, { useEffect, useState } from "react";
import { API } from "../../../apis/API";
import { errorhandeler } from "../../../utills/errorHandle";
import { Pagination } from "react-bootstrap";
import UserSection from "../../../components/user/UserSection";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [nopages, setPages] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  //fetch userss
  useEffect(
    function () {
      async function fetchUsers() {
        try {
          const response = await API.get(`/users?limit=${limit}&skip=${skip}`);
          // console.log(response.data);
          setUsers(response.data.users);
          setPages(Math.ceil(response.data.total / limit));
          // console.log(nopages);
        } catch (error) {
          errorhandeler(error);
        }
      }
      fetchUsers();
    },
    [skip],
  );
  // calskip fun
  function calSkip(page) {
    setSkip((page - 1) * limit);
  }

  return (
    <>
      <div>
        <UserSection users={users} />
      </div>
      {/* pagination */}
      <Pagination className="Center">
        {currentPage !== 1 && (
          <Pagination.First
            onClick={() => {
              setCurrentPage(1);
              calSkip(1);
            }}
          />
        )}
        <Pagination.Prev
          disabled={currentPage == 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
            calSkip(currentPage - 1);
          }}
        />
        {Array.from({ length: nopages }).map((_, i) => (
          <Pagination.Item
            active={currentPage == i + 1}
            key={i}
            onClick={() => {
              calSkip(i + 1);
              setCurrentPage(i + 1);
            }}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage == nopages}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
            calSkip(currentPage + 1);
          }}
        />
        {currentPage !== nopages && (
          <Pagination.Last
            onClick={() => {
              calSkip(nopages);
              setCurrentPage(nopages);
            }}
          />
        )}
      </Pagination>
    </>
  );
}
