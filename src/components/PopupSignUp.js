import React from "react";
import {Dialog, DialogTitle, DialogContent} from "@mui/material";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./PopupSignUp.css";

export default function PopupSignUp(props) {

    const { openPopup, setOpenPopup} = props;
    return (
        <Dialog open={openPopup} fullWidth={true} scroll="body" onBackdropClick={() => setOpenPopup(false)} >
            <DialogTitle sx={{margin:0, padding:2, fontWeight: 'bold', color:"#bd0c0c"}}>
                <div>Select your role! <i class="fa fa-close fa-xl fa-pull-right" onClick={() => setOpenPopup(false)}></i></div>
                <div className="ui divider"></div>
            </DialogTitle>
            <DialogContent >
                <div className="content">
                    <div className="fa fa-md fa-pull-left" >
                        <Link to="/sign-up-role-student">
                            <Button className="fluid ui button">
                                <img src="image/student.png" alt="Student icon" />
                                <p>Student</p>
                            </Button>
                        </Link>            
                    </div>         
                    <div className="fa fa-md fa-pull-right" >
                        <Link to="/sign-up-role-business">
                            <Button className="fluid ui button "  >
                            <img src="image/business.png" alt="Business icon" />
                                <p>Business</p>
                            </Button>
                        </Link>
                        
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
