import React from "react";
import PropTypes from "prop-types";
const SearchStatus = ({ length }) => {
    const handleChangeText = (number) => {
        const lastNum = Number(number.toString().split("").slice(-1));
        if (number > 4 && number < 15) return "Человек тусанет";
        if ([2, 3, 4].includes(lastNum)) return "Человека тусанут";
        if (lastNum === 1) return "Человек тусанет";
    };
    return (
        <h2>
            <span className={"badge bg-" + (length > 0 ? "primary" : "danger")}>
                {length > 0
                    ? `${length} ${handleChangeText(length)} с тобой сегодня`
                    : "Никто с тобой не тусанет"}
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
export default SearchStatus;
