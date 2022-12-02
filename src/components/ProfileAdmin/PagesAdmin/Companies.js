import React,{ useEffect, useState,useReducer } from "react";
import { Snackbar,Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import axios from "axios";
import './Companies.css';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
function Companies() {
        const token = localStorage.getItem('accessToken');
        const [arrCompanies, setArrCompanies] = useState([]);
        const [studentInfo, getStuddentInfo] = useState('');
        const [reducerValue,forceUpdate] = useReducer(x => x + 1, 0);
        const [success, setSuccess] = useState('')
        useEffect(() =>{
            if(token)
            {
              const getAllCompany= async() => {
                const response = await axios.get("/admin/list-company",{
                  headers: {Authorization: token}
                });
                setArrCompanies(response.data);
            }
            getAllCompany();
            }
        },[reducerValue])
        const handleDeleteStudent = async (id) => {
            const res = await axios.delete(`/admin/delete-company/${id}`,
            {
                headers: {Authorization: token}
            })
            setSuccess(res.data.msg)
            forceUpdate();
            setOpen(false);
        }
        const [open, setOpen] = React.useState(false);
        const [openView, setOpenView] = React.useState(false);
        const [idStudent, setIdStudent] = React.useState('')
        const handleClickOpen = (idStudent) => {
            setOpen(true);
            setIdStudent(idStudent)
        };
    
        const handleClose = () => {
            setOpen(false);
            setOpenView(false);
        };
        const handleClickOpenView= async (id) => {
            // const res = await axios.get(`/admin/company-info/${id}`,
            // {
            //     headers: {Authorization: token}
            // })
            // getStuddentInfo(res.data);
            setOpenView(true);
        }
        return (
            <>
                <div className="companies-container">
                    <div className="nav-page-admin">
                        <div className="text-title-companies">Companies</div>
                        {
                            arrCompanies && arrCompanies.map((item, index) => {
                                return (
                                    <div className="item-companies" key={index}>
                                        <div className="item-companies-left">
                                            <img src={item.avatar} style={{width:"70px",height:"70px"}}/>
                                        </div>
                                        <div className="item-companies-right">
                                            <div className="item-name-companies">{item.companyName}</div>
                                            <div className="item-btn-companies">
                                                <Button
                                                    variant="contained"
                                                    sx={{ marginRight:"15px", padding:1.5}}
                                                    color='error'
                                                    onClick={() => handleClickOpen(item.user_id)}
                                                    >
                                                    <i className="fas fa-trash-can"></i>
                                                </Button>
                                                <Button              
                                                    onClick={() => handleClickOpenView(item.user_id)}                                                             
                                                    sx={{ marginRight:"15px", padding:1.5}}
                                                    variant="contained">
                                                    <i className="fas fa-magnifying-glass"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth="sm"
                onBackdropClick={handleClose}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       Are you sure to delete this company?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>No</Button>
                    <Button variant="contained" onClick={() => handleDeleteStudent(idStudent)} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openView}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onBackdropClick={handleClose}
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle>
                    Company details
                </DialogTitle>
                <DialogContent dividers>
                    <Box display="flex" textAlign='center' alignItems='center'>
                    <img alt='avatar company'
                        src={studentInfo.avatar}
                        style={{
                            verticalAlign: "middle", margin: 0, width: "70px", height: "70px", borderRadius: "50%"
                            }}/>
                    <Typography sx={{marginLeft:"10px", fontWeight:"bold"}}>{studentInfo.companyName}</Typography>
                    </Box>
                    <Typography>Email: {studentInfo.email}</Typography>
                    <Typography>Contact: {studentInfo.contact}</Typography>
                    <Typography>Address: {studentInfo.address}</Typography>
                    <Typography>Description: {studentInfo.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            {success && <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {success}
            </Alert>}
         </Snackbar>   
            </>
        );
    }

export default Companies;
