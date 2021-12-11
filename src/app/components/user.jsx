import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
const User = ({ user, status = user.bookmark }, props) => {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.qualities.map((q) => Qualitie({ q }))}</td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} / 5</td>
      <td>{Bookmark({ user }, props)}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => props.handleDelete(user._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
