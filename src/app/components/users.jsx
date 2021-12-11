import React from "react";
import User from "./user";

const Users = ({ users }, props) => {
  return (
    <>
      {users.map((user) => {
        return User({ user }, props);
      })}
    </>
  );
};

export default Users;
