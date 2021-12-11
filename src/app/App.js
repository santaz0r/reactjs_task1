import React, { useState } from "react";
import SearchStatus from "./components/searchStatus";
import api from "./api";

import Users from "./components/users";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());
  let { length = 0 } = users;
  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((tag) => tag._id !== id));
  };
  const handleToggleBookMark = (id) => {
    let index = users.findIndex((item) => item._id === id);
    const newArr = users.slice();
    newArr[index].bookmark = newArr[index].bookmark ? false : true;
    setUsers(newArr);
  };

  return (
    <>
      {SearchStatus({ length })}
      {users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Users({ users }, { handleDelete, handleToggleBookMark })}
          </tbody>
        </table>
      )}
    </>
  );
}
export default App;
