import * as React from 'react';
import './Students.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useState, useReducer, useEffect  } from 'react';
import axios from 'axios';
import { Box, DialogTitle, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';


const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'firstName', label: 'First\u00a0Name', minWidth: 50 },
    { id: 'lastName', label: 'Last\u00a0Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'contact', label: 'Phone', minWidth: 100 },
    { id: 'gender', label: 'Gender', minWidth: 50 },
    { id: 'dayofbirth', label: 'Date\u00a0of\u00a0birth', minWidth: 70 },
    { id: 'className', label: 'Class', minWidth: 100 },
    { id: 'falculty', label: 'Falculty', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 200 },
];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
export default function Students() {
    const token = localStorage.getItem('accessToken');
    const [reducerValue,forceUpdate] = useReducer(x => x + 1, 0);
    const [students, setStudents] = useState([]);
    const [studentInfo, getStuddentInfo] = useState('');
    const [success, setSuccess] = useState('')
    useEffect(() =>{  
        if(token)
        {
          const getAllStudents= async() => {
            const response = await axios.get("/admin/list-student",{
              headers: {Authorization: token}
            });
            setStudents(response.data);
        }
        getAllStudents();
        }
      },[reducerValue])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleID = (id) => {
        let stringId = id.slice(19,24)
        return stringId;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleDeleteStudent = async (id) => {
        const res = await axios.delete(`/admin/delete/${id}`,
        {
            headers: {Authorization: token}
        })
        setSuccess(res.data.msg)
        handleClick();
        forceUpdate();
        setOpen(false);
    }
    const [open, setOpen] = React.useState(false);
    const [openView, setOpenView] = React.useState(false);
    const [idStudent, setIdStudent] = React.useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleClick = () => {
        setOpenSnackbar(true);
    };
    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnackbar(false);
   }

    const handleClickOpen = (idStudent) => {
        setOpen(true);
        setIdStudent(idStudent)
    };

    const handleClose = () => {
        setOpen(false);
        setOpenView(false);
    };
    const handleClickOpenView= async (id) => {
        const res = await axios.get(`/admin/student-info/${id}`,
        {
            headers: {Authorization: token}
        })
        getStuddentInfo(res.data);
        setOpenView(true);
    }
    const convertBirthday= (userbirthday) => {
        const birthday = new Date(userbirthday).toISOString().slice(0,10)
        return birthday;
    }
    return (
        <>
            <div className="student-container">
                <div className="nav-page-admin">
                    <div className="text-title-student">Users</div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                    background: "#D8D8D8",
                                                    fontSize: "15px"
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {(column.id === 'action'
                                                                    ?
                                                                    <>
                                                                        <Button
                                                                            variant="contained"   
                                                                            color='error'                                                                         
                                                                            sx={{cursor:"pointer", marginRight:"15px", padding:1.5}}
                                                                            onClick={() => handleClickOpen(row.user_id)}
                                                                        >
                                                                            <i className="fas fa-trash-can"></i>
                                                                        </Button>
                                                                        <Button     
                                                                            color='info'                                                                     
                                                                            sx={{cursor:"pointer", marginRight:"15px", padding:1.5}}
                                                                            variant="contained"
                                                                            onClick={() => handleClickOpenView(row.user_id)}>
                                                                            <i className="fas fa-magnifying-glass"></i>
                                                                        </Button>
                                                                    </>
                                                                    : column.id === 'dayofbirth' ? convertBirthday(value) 
                                                                    : column.id === "id" ? handleID(row._id) : value) }                                                                    
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={students.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
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
                       Are you sure to delete this student?
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
                    Student details
                </DialogTitle>
                <DialogContent dividers>
                    <Box display="flex" textAlign='center' alignItems='center'>
                    <img alt='avatar company'
                        src={studentInfo.avatar}
                        style={{
                            verticalAlign: "middle", margin: 0, width: "70px", height: "70px", borderRadius: "50%"
                            }}/>
                    <Typography sx={{marginLeft:"10px", fontWeight:"bold"}}>{studentInfo.lastName} {studentInfo.firstName}</Typography>
                    </Box>
                    <Typography>Email: {studentInfo.email}</Typography>
                    <Typography>Gender: {studentInfo.gender}</Typography>
                    <Typography>Date of birth: {studentInfo.dayofbirth}</Typography>
                    <Typography>Address: {studentInfo.address}</Typography>
                    
                    <Typography>Class: {studentInfo.className}</Typography>
                    <Typography>Falculty: {studentInfo.falculty}</Typography>
                    <Typography>Description: {studentInfo.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            {success && <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                {success}
            </Alert>}
         </Snackbar>  
        </>
    );
}

