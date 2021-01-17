import React, { useState, useEffect } from 'react'
import './Table.css'
import {
    TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TextField, Avatar
    , TablePagination,
    TableSortLabel,
    Toolbar,
    InputAdornment,
    makeStyles
} from "@material-ui/core";

import axios from 'axios';
import Controls from './controls/Controls'
import { Search } from '@material-ui/icons';




const headCells = [
    { id: "Select", label: "SELECT", disableSorting: true },
    { id: "PlayerName", numeric: false, disablePadding: true, label: "PLAYER NAME" },
    { id: "Level", numeric: true, disablePadding: false, label: "LEVEL", disableSorting: true },
    { id: "Avator", numeric: false, disablePadding: true, label: "AVATOR", disableSorting: true },
    { id: "Bet", numeric: true, disablePadding: false, label: "BET" },
    { id: "Wins", numeric: true, disablePadding: false, label: "WINS", disableSorting: true },
    { id: "Lost", numeric: true, disablePadding: false, label: "LOST", disableSorting: true },
    { id: "Price", numeric: true, disablePadding: false, label: "PRICE" }
]



const TableComponent = ({ users, setUsers }) => {

    const [searchValue, setSearchValue] = useState("");
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const [checkedCount, setCheckedCount] = useState(0);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    let it = 0;
    const addIdentifiers = (target) => {
        target.id = it;
        target.select = false;
        it++;
    }

    const loadUsers = async () => {
        const res = await axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json");


        let dataUser = res.data;
        for (var i in dataUser) {

            var c = dataUser[i];

            if (typeof c === 'object') {

                if (c.length === undefined) {

                    //c is not an array
                    addIdentifiers(c);

                }
            }
        }

        setUsers(dataUser);
    }


    useEffect(() => {
        loadUsers();
    }, [])

    const onChangePage = (event, nextPage) => {
        setPage(nextPage);
    }


    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (orderBy === "PlayerName") {
            return (b.Name < a.Name ? -1 : 1);
        }
        else {
            if (b[orderBy] < a[orderBy]) {
                return -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return 1;
            }
        }
        return 0;
    }
    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(users), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }


    const handleSortRequest = cellId => {
        const isAsc = orderBy === cellId && order === "asc";
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.Name.toLowerCase().includes(target.value))
            }
        })
    }

    return (
        <div className="main_menu">
            {/* Search field */}
            <div className="search">

                <Toolbar>
                    <Controls.Input
                        label="Search Players"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}

                        onChange={
                            handleSearch
                        }
                    />
                </Toolbar>
            </div>
            <TableContainer>
                <Table>
                    {/* Heading */}
                    <TableHead >
                        <TableRow className="head_row">
                            {
                                headCells.map(headCell => (

                                    <TableCell key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                    >
                                        {headCell.disableSorting ? headCell.label :
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : 'asc'}
                                                onClick={() => { handleSortRequest(headCell.id) }}>
                                                {headCell.label}
                                            </TableSortLabel>
                                        }
                                    </TableCell>

                                ))
                            }
                        </TableRow>
                    </TableHead>

                    {/*   Body   */}
                    <TableBody>

                        {
                            recordsAfterPagingAndSorting().map((user) => {
                                return (<TableRow key={user.id} className="user_table">
                                    <TableCell>

                                        <input onChange={event => {
                                            let checkedCount1;
                                            let checked = event.target.checked;
                                            if (checked) {
                                                checkedCount1 = checkedCount + 1;
                                                setCheckedCount(checkedCount1);
                                            }
                                            if (checked === false) {
                                                checkedCount1 = checkedCount - 1;
                                                setCheckedCount(checkedCount1);
                                            }

                                            setUsers(users.map(data => {


                                                if (user.id === data.id) {
                                                    if (checked && checkedCount1 > 9) {
                                                        setCheckedCount(checkedCount)
                                                        alert("You've reached the limit");
                                                        checked = false;
                                                    }
                                                    data.select = checked;
                                                    // console.log(data);
                                                }

                                                return data;
                                            }))


                                        }} type="checkbox" checked={user.select} />
                                    </TableCell>
                                    <TableCell className="user_name">{user.Name}</TableCell>
                                    <TableCell>2</TableCell>
                                    <TableCell>
                                        <Avatar className="avator_profile" variant="square" alt={`Image of ${user.Name}`} src={user["Profile Image"]} />
                                    </TableCell>
                                    <TableCell>{user.Bet}</TableCell>
                                    <TableCell>Wins</TableCell>
                                    <TableCell>Lost</TableCell>
                                    <TableCell>{user.Price}</TableCell>

                                </TableRow>
                                )

                            })
                        }

                    </TableBody>

                </Table>
                <TablePagination
                    rowsPerPageOptions={[]}
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>


        </div>
    )
}

export default TableComponent;
