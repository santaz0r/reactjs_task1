import React from "react";

const Bookmark = ({ ...user }) => {
    return (
        <i
            className={user.bookmark ? "bi bi-bookmark-fill" : "bi bi-bookmark"}
            onClick={() => user.onToggleBookMark(user._id)}
        ></i>
    );
};

export default Bookmark;
