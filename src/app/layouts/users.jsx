import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersList from "../components/page/usersList";
import UserPageEdit from "../components/page/userPageEdit";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            {edit ? (
                <UserPageEdit />
            ) : userId ? (
                <UserPage id={userId} />
            ) : (
                <UsersList />
            )}
        </>
    );
};

export default Users;
