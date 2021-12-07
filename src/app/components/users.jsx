import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((tag) => tag._id !== id));
  };
  const handleChangeText = (number) => {
    let lastNum = Number(number.toString().split("").slice(-1));
    if (number > 4 && number < 15) return "Человек тусанет";
    if ([2, 3, 4].includes(lastNum)) return "Человека тусанут";
    if (lastNum === 1) return "Человек тусанет";
  };
  return (
    <>
      <h2>
        <span
          className={"badge bg-" + (users.length > 0 ? "primary" : "danger")}
        >
          {users.length > 0
            ? `${users.length} ${handleChangeText(
                users.length
              )} с тобой сегодня`
            : "Никто с тобой не тусанет"}
        </span>
      </h2>
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
