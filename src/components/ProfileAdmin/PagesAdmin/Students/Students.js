import * as React from 'react';
import './Students.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
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
import TableHeader from './TableHeader';

const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'firstName', label: 'First\u00a0Name', minWidth: 50 },
    { id: 'lastName', label: 'Last\u00a0Name', minWidth: 130 },
    { id: 'email', label: 'Email', minWidth: 30 },
    { id: 'contact', label: 'Phone', minWidth: 50 },
    { id: 'gender', label: 'Gender', minWidth: 50 },
    { id: 'dayofbirth', label: 'Date\u00a0of\u00a0birth', minWidth: 70 },
    { id: 'className', label: 'Class', minWidth: 120 },
    { id: 'falculty', label: 'Faculty', minWidth: 120 },
    { id: 'action',  minWidth: 190 },
];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function descendingComparator(a,b, orderBy) {
  if(b[orderBy] < a[orderBy])
    return -1;
  if(b[orderBy] > a[orderBy])
    return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' 
  ? (a,b) => descendingComparator(a,b, orderBy)
  : (a,b) => -descendingComparator(a,b,orderBy)
}
export default function Students() {
    const token = localStorage.getItem('accessToken');
    const [reducerValue,forceUpdate] = useReducer(x => x + 1, 0);
    const [students, setStudents] = useState([]);
    const [studentInfo, getStudentInfo] = useState('');
    const [success, setSuccess] = useState('')
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState("");
    //get data student
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
    
    // search function
    const searchHandle = (searchTerm) => {
        setSearchTerm(searchTerm);
        if(searchTerm !== "")
        {
          const newStudentList = students.filter((student) => {
            return Object.values(student)
            .join("")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          });
          setSearchResults(newStudentList);
        }
        else{
          setSearchResults(students);
        }
      }
    const [orderDirection, setOrderDirection] = useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState('firstName');

    // sorting
    const handleSort = (event, property) =>
    {
        const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');
    }
    const sortedRowInformation = (rowArr, comparator) => {
      const stabilizedRowArray = rowArr.map((el, index) => [el,index])
      stabilizedRowArray.sort((a,b) => {
        const order = comparator(a[0],b[0])
        if(order !== 0) return order;
        return a[1] = b[1];
      })
      return stabilizedRowArray.map((el) => el[0])
    }
    const handleReturnList = (list) => {
        return (
          <Paper className='table' sx={{ width: "99%", overflow: "hidden" }}>
            <TableContainer sx={{ height: 440 }}>
              <Table
                stickyHeader
                aria-label="sticky table"
                sx={{
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TableHeader
                  handleSort={handleSort}
                  searchHandle={searchHandle}
                  searchTerm={searchTerm}
                  columns={columns}
                  orderDirection = {orderDirection}
                  valueToOrderBy = {valueToOrderBy}
                />
                <TableBody>
                  {sortedRowInformation(list, getComparator(orderDirection,valueToOrderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          key={index}
                        >
                          {columns.map((column, index) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={index}>
                                {column.id === "action" ? (
                                  <Box sx={{textAlign:"center",justifyContent:"center", alignItems:"center"}}>
                                  <Button
                                      variant="contained"
                                      color="error"
                                      sx={{
                                        cursor: "pointer",
                                        marginRight: "15px",
                                        padding: 1,
                                      }}
                                      onClick={() =>
                                        handleClickOpen(row.user_id)
                                      }
                                    >
                                      <i className="fas fa-trash-can"></i>
                                    </Button>
                                    <Button
                                      color="info"
                                      sx={{
                                        cursor: "pointer",
                                        marginRight: "15px",
                                        padding: 1,
                                      }}
                                      variant="contained"
                                      onClick={() =>
                                        handleClickOpenView(row.user_id)
                                      }
                                    >
                                      <i className="fas fa-magnifying-glass"></i>
                                    </Button>
                                  </Box>
                                ) : column.id === "dayofbirth" ? (
                                  convertBirthday(value)
                                ) : column.id === "id" ? (
                                  handleID(row._id)
                                ) : column.id === "falculty" ? (
                                  <p className="falculty">{value}</p>
                                ) : (
                                  value
                                )}
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
              count={list.length}
              rowsPerPage={rowsPerPage}
              page={page}
              className="paginate"
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        );
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    //cut id student
    const handleID = (id) => {
        let stringId = id.slice(19,24)
        return stringId;
    }

    //handle page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // delete student function
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
    
    //open dialog or modal
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
    function dateIsValid(date) {
      return !Number.isNaN(new Date(date).getTime());
    }
    const handleClickOpenView= async (id) => {
        const res = await axios.get(`/admin/student-info/${id}`,
        {
            headers: {Authorization: token}
        })
        getStudentInfo(res.data);
        setOpenView(true);
    }
    const convertBirthday= (userbirthday) => {
        if(dateIsValid(userbirthday))
        {
          const birthday = new Date(userbirthday).toISOString().slice(0,10)
          return birthday;
        }
        else return "not valid date"
    }
    return (
        <>
            <div className="student-container">
                <div className="nav-page-admin">
                    <div className="text-title-student">Manage Student</div>
                    {searchTerm.length < 1 ? handleReturnList(students) : handleReturnList(searchResults)}
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
                    <Box sx={{marginTop:"10px", display:"flex"}}>
                      <Box sx={{ padding: 1}}>
                        <Typography sx={{fontWeight:"bold"}}>Email:</Typography>
                        <Typography sx={{fontWeight:"bold"}}>Gender:</Typography>
                        <Typography sx={{fontWeight:"bold"}}>Date of birth:</Typography>
                        <Typography sx={{fontWeight:"bold"}}>Address:</Typography>
                        <Typography sx={{fontWeight:"bold"}}>Class:</Typography>
                        <Typography sx={{fontWeight:"bold"}}>Falculty:</Typography>
                        
                      </Box>
                      <Box sx={{padding: 1}}>
                        <Typography sx={{paddingLeft:"5px"}}> {studentInfo.email}</Typography>
                        <Typography sx={{paddingLeft:"5px"}}> {studentInfo.gender}</Typography>
                        <Typography sx={{paddingLeft:"5px"}}> {convertBirthday(studentInfo.dayofbirth)}</Typography>
                        <Typography sx={{paddingLeft:"5px"}}> {studentInfo.address}</Typography>
                        <Typography sx={{paddingLeft:"5px"}}> {studentInfo.className}</Typography>
                        <Typography sx={{paddingLeft:"5px"}}> {studentInfo.falculty}</Typography>

                      </Box>
                    </Box>
                    <Box sx={{marginTop:"5px", padding: 1}}>
                      <Typography sx={{fontWeight:"bold"}}>Description:</Typography>
                      <Typography> {studentInfo.description}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' sx={{fontWeight:"bold"}} onClick={handleClose}>Return</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <>
              {success && <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                  {success}
              </Alert>}
              </>
         </Snackbar>  
        </>
    );
}
