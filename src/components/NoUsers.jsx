import React from 'react'
import './NoUsers.css';
const NoUsers = ({ setVisiblePage }) => {
    return (
        <div className="no_users">

            <h1 className="no_heading">No users Checked Try Again !!!</h1>
            <button className="btn_no" onClick={() => {

                setVisiblePage(true);

            }}>BACK</button>
        </div>
    )
}

export default NoUsers;
