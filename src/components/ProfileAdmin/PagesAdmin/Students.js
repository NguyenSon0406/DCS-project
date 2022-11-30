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

const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'firstName', label: 'First\u00a0Name', minWidth: 100 },
    { id: 'lastName', label: 'Last\u00a0Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'contact', label: 'Phone', minWidth: 100 },
    { id: 'gender', label: 'Gender', minWidth: 100 },
    { id: 'dayofbirth', label: 'Date\u00a0of\u00a0birth', minWidth: 100 },
    { id: 'className', label: 'Class', minWidth: 100 },
    { id: 'falculty', label: 'Falculty', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 },
];

export default function Students() {
    const token = localStorage.getItem('accessToken');
    const [reducerValue,forceUpdate] = useReducer(x => x + 1, 0);
    const [students, setStudents] = useState([]);
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
    const dataStudents = [
        {
            id: '01', firstName: 'Sơn', lastName: 'Nguyễn', email: 'nguyenson5@dtu.edu.vn',
            phone: '0123456789', roles: 'Student', gender: 'Male', birthday: '04/06/2001'
        },
        {
            id: '02', firstName: 'Hoàng', lastName: 'Trần Đình Minh', email: 'trandinhmhoang@gdtu.edu.vn',
            phone: '0123456789', roles: 'Student', gender: 'Female', birthday: '13/03/2001'
        },
        {
            id: '03', firstName: 'Chân', lastName: 'Phạm Ngọc', email: 'phamngocchan@dtu.edu.vn',
            phone: '0123456789', roles: 'Student', gender: 'Male', birthday: '13/01/2001'
        }
    ]
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let count = 0;
    const handleCountID = (countID) => {
        if(count === 0)
            count = 1;
        else {
            count = countID + 1;
        }
        return count;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleDeleteStudent = async (id) => {
        await axios.delete(`/admin/delete/${id}`,
        {
            headers: {Authorization: token}
        })
        forceUpdate();
        setOpen(false);
    }
    const [open, setOpen] = React.useState(false);
    const [idStudent, setIdStudent] = React.useState('')
    const handleClickOpen = (idStudent) => {
        setOpen(true);
        setIdStudent(idStudent)
    };

    const handleClose = () => {
        setOpen(false);
    };
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
                                                                            variant="contained">
                                                                            <i className="fas fa-magnifying-glass"></i>
                                                                        </Button>
                                                                    </>
                                                                    : column.id === 'dayofbirth' ? convertBirthday(value) 
                                                                    : column.id === "id" ? handleCountID(count) : value) }                                                                    
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
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Delete Student?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDeleteStudent(idStudent)} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

