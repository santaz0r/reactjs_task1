import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.servise";

const httpLogin = axios.create();

const LoginContext = React.createContext();

export const useLogin = () => {
    return useContext(LoginContext);
};

const LoginProvider = ({ children }) => {
    const [error, setError] = useState(null);
    async function signIn({ email, password, stayOn, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpLogin.post(url, {
                email,
                password,
                stayOn,
                returnSecureToken: true
            });
            setTokens(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (
                    message === "EMAIL_NOT_FOUND" ||
                    message === "INVALID_PASSWORD"
                ) {
                    throw new Error(
                        "Имя пользователя или пароль введены неверно"
                    );
                }
            }
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    return (
        <LoginContext.Provider value={{ signIn }}>
            {children}
        </LoginContext.Provider>
    );
};

LoginProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default LoginProvider;
