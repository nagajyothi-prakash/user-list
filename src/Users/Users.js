import React, { useState, useRef, useCallback } from "react";
import useLoadUsers from "./useLoadUsers";
import "./Users.css";

export default function Users() {
  const [pageNumber, setPageNumber] = useState(1);

  const { users, hasMore, loading, error } = useLoadUsers(pageNumber);

  const observer = useRef();
  const lastUserElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className="user-list">
        {users.map((user, index) => {
          console.log(user);
          if (users.length === index + 1) {
            return (
              <div className="card" ref={lastUserElementRef} key={user.id}>
                <img src={user.avatar} alt="Avatar" className="avatar" />
                <div className="container">
                  <h4 className="user-name">
                    <b>{`${user.first_name} ${user.last_name}`}</b>
                  </h4>
                  <p className="user-email">{user.email}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="card" key={user.id}>
                <img src={user.avatar} alt="Avatar" className="avatar" />
                <div className="container">
                  <h4 className="user-name">
                    <b>{`${user.first_name} ${user.last_name}`}</b>
                  </h4>
                  <p className="user-email">{user.email}</p>
                </div>
              </div>
            );
          }
        })}
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error"}</div>
      </div>
    </>
  );
}
