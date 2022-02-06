import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersList from "../components/page/usersList";
import UserPageEdit from "../components/page/userPageEdit";
import UserProvider from "../hooks/useUsers";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <UserPageEdit />
                    ) : (
                        <UserPage id={userId} />
                    )
                ) : (
                    <UsersList />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
