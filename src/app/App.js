import React, { useState, useEffect } from "react";
import api from "./api";
import Users from "./components/users";

function App() {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter((tag) => tag._id !== id));
    };
    const handleToggleBookMark = (id) => {
        const index = users.findIndex((item) => item._id === id);
        const newArr = users.slice();
        newArr[index].bookmark = !newArr[index].bookmark;
        setUsers(newArr);
    };
    return (
        <>
            {users && (
                <Users
                    users={users}
                    onToggleBookMark={handleToggleBookMark}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
}
export default App;
