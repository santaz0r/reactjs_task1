import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import { validator } from "../../../utils/validator";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserData, updateUser } from "../../../store/users";

const UserPageEdit = () => {
    const [data, setData] = useState();
    const dispatch = useDispatch();
    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const currentUser = useSelector(getCurrentUserData());

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    };

    const quals = currentUser.qualities.map((q) => getQuality(q));
    const transformData = (data) => {
        return data.map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
    };

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
            setData(() => ({
                ...currentUser,
                qualities: transformData(quals)
            }));
        }
    }, [professionsLoading, qualitiesLoading, currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            updateUser({
                ...data,
                qualities: data.qualities.map((q) => q.value)
            })
        );
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => validate(), [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                {!isLoading && Object.keys(professions).length > 0 ? (
                    <form
                        onSubmit={handleSubmit}
                        className="col-md-6 offset-md-3 shadow p-4"
                    >
                        <h3 className="mb-4">Изменить пользователя</h3>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption="Choose..."
                            options={transformData(professions)}
                            name="profession"
                            onChange={handleChange}
                            value={data.profession}
                            error={errors.profession}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={data.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Сменить пол на..."
                        />
                        <MultiSelectField
                            options={transformData(qualities)}
                            onChange={handleChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />

                        <button
                            className="btn btn-primary w-100 mx-auto"
                            disabled={!isValid}
                            type="submit"
                        >
                            Изменить
                        </button>
                    </form>
                ) : (
                    "LOADING!!!!!!!!!"
                )}
            </div>
        </div>
    );
};

export default UserPageEdit;
