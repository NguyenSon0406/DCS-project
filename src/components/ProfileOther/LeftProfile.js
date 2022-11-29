import { Button } from "@mui/material";
import React from "react";
import './LeftProfile.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
function LeftProfile(props) {
    const {avatar,firstName,lastName,description} = props.auth;
        return (
            <>
                <div className="leftp-container">
                    <div className="leftp-content-left">
                        <img src={avatar} alt="avatar" 
                        style={{
                            verticalAlign:"middle",
                            margin:0, width:"150px", 
                            height:"150px",
                            borderRadius:"50%",
                            justifyContent:"center"}}/>
                    </div>
                    <div className="leftp-content-right">
                        <div className="name">{lastName} {firstName}</div>
                        <div className="description">Description: {description}</div>
                        <Button variant="contained"
                        startIcon={<PersonAddIcon/>}>Follow</Button>
                    </div>
                </div>
            </>
        );
}

export default LeftProfile;
