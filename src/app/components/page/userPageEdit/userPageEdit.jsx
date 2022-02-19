import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useQuality } from "../../../hooks/useQuality";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UserPageEdit = () => {
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });

    const { isLoading: qualitiesLoading, qualities, getQuality } = useQuality();
    const { isLoading: professionsLoading, professions } = useProfessions();

    const { currentUser, changeUserData } = useAuth();

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const quals = currentUser.qualities.map((q) => getQuality(q));
    const transformData = (data) => {
        return data.map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
    };

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading) {
            setData(() => ({
                name: currentUser.name,
                email: currentUser.email,
                profession: currentUser.profession,

                sex: currentUser.sex,
                qualities: transformData(quals)
            }));
            setIsLoading(false);
        }
    }, [professionsLoading, qualitiesLoading]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        changeUserData(data);
        history.replace(`/users/${currentUser._id}`);
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
                {!isLoading && !professionsLoading && !qualitiesLoading ? (
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
