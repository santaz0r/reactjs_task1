import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    if (isLoading) return "loading";

    return (
        <>
            {qualitiesList.map((q) => (
                <Qualitie key={q._id} {...q} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
