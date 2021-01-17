import React, { useState } from 'react'
import { Container, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TextField, Avatar } from "@material-ui/core";
import "./Sidebar.css";
import App from '../App';



const Sidebar = ({ users, setUsers, visiblePage, setVisiblePage }) => {

    let arr = [];
    const addUser = (user) => {
        arr.push(user);
    }
     const [checkedUser, setCheckedUser] = useState([]);
    const showSecond = () => {
        setVisiblePage(false);
        setUsers(arr);
    }
    return (
        <div className="sidebar_page">
            {/* Logo */}
            <div className="dice_img">
                <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/ludo-dices-1994621-1682271.png" alt="dice Image" width="90" height="90" />
            </div>
            <div className="player_9_div">
                <p className="player_9">Playing 9</p>
            </div>
            {/* User */}
            <div className="userContainer">
                {
                    users.map((user) => {


                        if (user.select === true) {
                            
                            addUser(user);
                            return (

                                <div className="player_select">

                                    <img className="player_img" src={user["Profile Image"]} alt={`Image of ${user.Name}`} />

                                    <div className="name_mid">
                                        <p className="name_mid_player">{user.Name}</p>
                                        <div className="bet_wins">
                                            <p className="player_wins"><i class="fa fa-trophy" aria-hidden="true"></i> 20</p>
                                            <p className="player_bet"><i class="fa fa-certificate" aria-hidden="true"></i> 5</p>
                                        </div>

                                    </div>

                                    <p className="player_price"><i class="fa fa-money" aria-hidden="true"></i> {user.Price}</p>
                                </div>

                            )
                        }
                    })
                }
            </div>

            <button className="start_btn" onClick={showSecond}>START</button>


        </div>
    )


}

export default Sidebar;
