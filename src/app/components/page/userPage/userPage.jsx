import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import api from "../../../api";
import { Link } from "react-router-dom";

const UserPage = ({ id }) => {
    // const params = useParams();
    // const { edit } = params;
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
                    <Qualities qualities={user.qualities} />
                </p>
                <p>
                    <b>Встретился, раз: {user.completedMeetings}</b>
                </p>
                <h2>Рейтинг: {user.rate} / 5</h2>
                <Link to="/users">
                    <button>Все пользователи</button>
                </Link>

                <Link to={`/users/${id}/edit`}>
                    <button>Обновить</button>
                </Link>
            </div>
        );
    } else return <h1>LOADING...</h1>;
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserPage;
