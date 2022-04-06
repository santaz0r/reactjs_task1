import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ name, color, _id }) => {
    return (
        <span key={_id} className={"badge bg-" + color + " m-1"}>
            {name}
        </span>
    );
};
Qualitie.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};
export default Qualitie;
