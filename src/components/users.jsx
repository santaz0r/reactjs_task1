import React, { useState } from "react";
import api from "../api";

const Users = () => {
  //   console.log(api.users.fetchAll());
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((tag) => tag._id !== id));
  };
  const handleChangeText = () => {
    let arrLength = users.length.toString().split("");
    let lastNum = arrLength[arrLength.length - 1];
    const defaultClass = "badge bg-primary";

    if (lastNum >= 5 || users.length >= 10)
      return (
        <span className={defaultClass}>
          {users.length} человек тусанет с тобой сегодня
        </span>
      );
    if (lastNum > 1)
      return (
        <span className={defaultClass}>
          {users.length} человека тусанут с тобой сегодня
        </span>
      );
    if (users.length === 1)
      return (
        <span className={defaultClass}>
          {users.length} человек тусанет с тобой сегодня
        </span>
      );

    if (users.length === 0) {
      // const table = document.querySelector(".table");

      return (
        // (table.style.display = "none"),
        <span className="badge bg-danger">
          Никто с тобой не тусанет сегодня
        </span>
      );
    }
  };
  return (
    <>
      {handleChangeText()}
      {users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>
                    {user.qualities.map((q) => (
                      <span
                        key={q._id}
                        className={"badge bg-" + q.color + " m-1"}
                      >
                        {q.name}
                      </span>
                    ))}
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate} / 5</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
