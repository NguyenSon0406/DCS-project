import React from "react";
import {Dialog, DialogTitle, DialogContent,Box,IconButton, Typography, Button} from "@mui/material";
import {Close as CloseIcon} from "@mui/icons-material";

import {Link} from "react-router-dom";
import "./PopupSignUp.css";

export default function PopupSignUp(props) {

    const { openPopup, setOpenPopup} = props;
    return (
        <Dialog open={openPopup} fullWidth={true} maxWidth="sm"  onBackdropClick={() => setOpenPopup(false)} >
            <DialogTitle sx={{margin:0, padding:2, fontWeight: 'bold', color:"#bd0c0c"}}>
                <Box display="flex" justifyContent="space-between" alignItem="center">
                <Typography variant="body1" fontWeight="550" fontSize="20px" fontFamily="sans-serif">Select Role</Typography>
                    <IconButton>
                        <CloseIcon onClick={() => setOpenPopup(false)}/>
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent >
              <Box sx={{ display: 'flex', alightItems:"center"}} justifyContent="space-between" >         
                        <Box  display="flex" flexDirection="column" justifyContent="center"
                        boxShadow={12}
                        sx={{
                            transition:"0.3s",
                            textAlign:"center",
                            width: 200,
                            height: 200,      
                            borderRadius:"20px",  
                            '&:hover': {
                            opacity: [0.9, 0.8, 0.7],
                            transition:"0.3s",
                            },
                        }} >
                        <Link to="/sign-up-role-student">             
                            <img src="image/student.png" alt="Student icon" style={{width:"60%", height:"85%",padding:0}}/>
                            <Typography variant="body1" fontFamily="sans-serif" color="#000000" fontWeight="550" sx={{marginTop:"5px"}}>Student</Typography>
                        </Link>         
                        </Box>    
                       <Box  display="flex" flexDirection="column" justifyContent="center"
                        boxShadow={12}
                        sx={{
                            textAlign:"center",
                            width: 200,
                            height: 200,
                            borderRadius:"20px",
                            transition:"0.3s",
                            '&:hover': {
                            opacity: [0.9, 0.8, 0.7],
                            transition:"0.3s",
                            },
                        }}>
                       <Link to="/sign-up-role-business">
                            
                            <img src="image/business.png" alt="Business icon" style={{width:"60%", height:"85%",padding:0}}/>
                            <Typography variant="body1" fontFamily="sans-serif" color="#000000" fontWeight="550" sx={{marginTop:"5px"}}>Business</Typography>
                        </Link>
                       </Box>
              </Box>
            </DialogContent>
        </Dialog>
    );
}
