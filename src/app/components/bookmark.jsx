import React from "react";

const Bookmark = ({ user }, props) => {
  return (
    <i
      className={user.bookmark ? "bi bi-bookmark-fill" : "bi bi-bookmark"}
      onClick={() => props.handleToggleBookMark(user._id)}
    ></i>
  );
};

export default Bookmark;
