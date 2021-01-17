import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import './Second.css';
const SecondPage = ({ users, visiblePage, setVisiblePage }) => {

    const renUser = users.map((user) => {

        return user.select && <h1>{user.name}</h1>
    })

    return (
        <div className="second_users">
            <h1 className="second_heading">This is Round page</h1>

            <button className="btn_second" onClick={() => {

                setVisiblePage(true);

            }}>BACK</button>

            <div className="users_list">
                {
                    users.map(user => (

                        <Card className="user_card">
                            <CardActionArea>
                                <img
                                    className="user_img"
                                    src={user["Profile Image"]}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {user.Name}
                                    </Typography>

                                </CardContent>
                            </CardActionArea>

                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default SecondPage;
