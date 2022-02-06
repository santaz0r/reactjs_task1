import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import api from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import Search from "../../../components/search";
import { useUser } from "../../../hooks/useUsers";

const UsersList = () => {
    const { users } = useUser();
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [search, setSearch] = useState("");

    const handleDelete = (id) => {
        // setUsers((prevState) => prevState.filter((tag) => tag._id !== id));
        console.log(id);
    };
    const handleToggleBookMark = (id) => {
        const index = users.findIndex((item) => item._id === id);
        const newArr = users.slice();
        newArr[index].bookmark = !newArr[index].bookmark;
        // setUsers(newArr);
        console.log(newArr);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, search]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        if (search !== "") setSearch("");
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearchChange = ({ target }) => {
        setSearch(target.value);
        setSelectedProf(undefined);
    };

    if (users) {
        const filteredUsers = search
            ? users.filter((user) =>
                  user.name.toLowerCase().includes(search.toLowerCase())
              )
            : selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />

                    <Search onChange={handleSearchChange} value={search} />

                    {count !== 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return "LOADING...";
};
UsersList.propTypes = {
    users: PropTypes.array
};
export default UsersList;
