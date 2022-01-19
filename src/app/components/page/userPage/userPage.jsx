import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import api from "../../../api";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    const handleGoBack = () => {
        history.push("/users");
    };
    const handleGoToEdit = () => {
        history.push(`/users/${id}/edit`);
    };

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <p>
                    <Qualities qualities={user.qualities} />
                </p>
                <p>
                    <b>Встретился, раз: {user.completedMeetings}</b>
                </p>
                <h2>Рейтинг: {user.rate} / 5</h2>

                <button className="btn btn-primary mx-2" onClick={handleGoBack}>
                    Все пользователи
                </button>

                <button
                    className="btn btn-primary mx-2"
                    onClick={handleGoToEdit}
                >
                    Обновить
                </button>
            </div>
        );
    } else return <h1>LOADING...</h1>;
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserPage;
