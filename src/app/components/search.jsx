import React from "react";
import PropTypes from "prop-types";

const Search = ({ onChange, value }) => {
    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={handleSearchSubmit}>
            <div>
                <label htmlFor="search"></label>
                <input
                    type="text"
                    id="search"
                    name="search"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </form>
    );
};

Search.propTypes = {
    onChange: PropTypes.func,
    onSearchSubmit: PropTypes.func,
    value: PropTypes.string
};

export default Search;
