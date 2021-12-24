import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import api from "../api";
import { Link } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <p>
                    <QualitiesList qualities={user.qualities} />
                </p>
                <p>
                    <b>Встретился, раз: {user.completedMeetings}</b>
                </p>
                <h2>Рейтинг: {user.rate} / 5</h2>
                <Link to="/users">
                    <button>Все пользователи</button>
                </Link>
            </div>
        );
    }
    return <h1>LOADING...</h1>;
};
UserPage.propTypes = {
    id: PropTypes.string
};
export default UserPage;
