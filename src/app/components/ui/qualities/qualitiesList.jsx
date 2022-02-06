import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQuality();
    const qual = qualities.map((q) => getQuality(q));
    if (!isLoading) {
        return (
            <>
                {qual.map((q) => (
                    <Qualitie key={q._id} {...q} />
                ))}
            </>
        );
    } else {
        return "loading";
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
