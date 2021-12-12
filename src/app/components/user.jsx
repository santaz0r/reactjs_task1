import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
const User = ({ ...user }) => {
    return (
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((qual) => (
                    <Qualitie
                        key={qual._id}
                        name={qual.name}
                        color={qual.color}
                        _id={qual._id}
                    />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate} / 5</td>
            <td>
                <Bookmark {...user} />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => user.onDelete(user._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default User;
