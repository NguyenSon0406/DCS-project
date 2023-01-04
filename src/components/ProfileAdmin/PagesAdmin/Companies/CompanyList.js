import React, { useState, useReducer, useEffect,useRef  } from 'react';
import {Table,TableBody,TableCell,TableHead,TableContainer,TablePagination,TableRow,Paper,Button, Dialog, DialogContent,DialogActions,DialogContentText,Box, DialogTitle, Typography, Snackbar, TextField} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import MuiAlert from '@mui/material/Alert';
import ConvertHTML from "react-html-parser"
import axios from 'axios';
import "./CompanyList.css"

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'avatar', label: 'Avatar', minWidth: 70 },
    { id: 'firstName', label: 'First\u00a0Name', minWidth: 50 },
    { id: 'lastName', label: 'Last\u00a0Name', minWidth: 150 },
    { id: 'companyName', label: 'Company\u00a0Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'contact', label: 'Phone', minWidth: 50 },
    { id: 'action',  minWidth: 190 },
];

export default function CompanyList() {
    const token = localStorage.getItem('accessToken');
    const [reducerValue,forceUpdate] = useReducer(x => x + 1, 0);
    const [companies, setCompanies] = useState([]);
    const [companyInfo, getCompanyInfo] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState("");
    const inputElement = useRef("");
    const [success, setSuccess] = useState('')

    useEffect(() =>{
        if(token)
        {
        const getAllCompany= async() => {
            const response = await axios.get("/admin/list-company",{
            headers: {Authorization: token}
            });
            setCompanies(response.data);
        }
        getAllCompany();
        }
    },[reducerValue])

    const searchHandle = (searchTerm) => {
        setSearchTerm(searchTerm);
        if(searchTerm !== "")
        {
          const newCompaniesList = companies.filter((company) => {
            return Object.values(company)
            .join("")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          });
          setSearchResults(newCompaniesList);
        }
        else{
          setSearchResults(companies);
        }
      }
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
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


    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [idCompany, setIdCompany] = useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false);
    
    const handleClickOpen = (idStudent) => {
        setOpen(true);
        setIdCompany(idStudent)
    };

    const handleClickOpenView= async (id) => {
        const res = await axios.get(`/admin/company-info/${id}`,
        {
            headers: {Authorization: token}
        })
        getCompanyInfo(res.data);
        setOpenView(true);
    }

    const handleClose = () => {
        setOpen(false);
        setOpenView(false);
    };

   
    const handleClick = () => {
        setOpenSnackbar(true);
    };
    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnackbar(false);
   }
   const handleDeleteStudent = async (id) => {
    const res = await axios.delete(`/admin/delete-company/${id}`,
    {
        headers: {Authorization: token}
    })
    setSuccess(res.data.msg)
    forceUpdate();
    setOpen(false);
    handleClick();
}
  const handleReturnList=(list) => {
    return(
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  value={searchTerm}
                  style={{
                    minWidth: column.minWidth,
                    background: "#D8D8D8",
                    fontSize: "15px",
                  }}
                >
                  {column.id === "action" ? (
                    <>
                      <TextField
                        variant="filled"
                        size="small"
                        sx={{ width: "100%", overflow: "hidden" }}
                        label="Search"
                        inputRef={inputElement}
                        onChange={() =>
                          searchHandle(inputElement.current.value)
                        }
                        autoFocus={true}
                        InputProps={{
                          endAdornment: <SearchIcon />,
                        }}
                      />
                    </>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
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
                                onClick={() => handleClickOpen(row.user_id)}
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
                          ) : column.id === "avatar" ? (
                            <img
                              src={row.avatar}
                              alt="avatar"
                              style={{
                                verticalAlign: "middle",
                                margin: 0,
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                            />
                          ) : column.id === "id" ? (
                            handleID(row._id)
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
        className='paginate'
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    )
  }
  return (
    <div>
      {searchTerm.length < 1
        ? handleReturnList(companies)
        : handleReturnList(searchResults)}
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
          <Button
            variant="outlined"
            sx={{ fontWeight: "bold" }}
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            variant="contained"
            sx={{ fontWeight: "bold" }}
            onClick={() => handleDeleteStudent(idCompany)}
            autoFocus
          >
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
        <DialogTitle>Company details</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" textAlign="center" alignItems="center">
            <img
              alt="avatar company"
              src={companyInfo.avatar}
              style={{
                verticalAlign: "middle",
                margin: 0,
                width: "70px",
                height: "70px",
                borderRadius: "50%",
              }}
            />
            <Typography sx={{ marginLeft: "10px", fontWeight: "bold" }}>
              {companyInfo.companyName}
            </Typography>
          </Box>
          <Box sx={{ marginTop: "10px", display: "flex" }}>
            <Box sx={{ padding: 1 }}>
              <Typography sx={{ fontWeight: "bold" }}>Email:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Contact:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>Address:</Typography>
            </Box>
            <Box sx={{ padding: 1 }}>
              <Typography sx={{ paddingLeft: "5px" }}>
                {companyInfo.email}
              </Typography>
              <Typography sx={{ paddingLeft: "5px" }}>
                {companyInfo.contact}
              </Typography>
              <Typography sx={{ paddingLeft: "5px" }}>
                {companyInfo.address}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: "5px", padding: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>Description:</Typography>
            <Typography> {ConvertHTML(companyInfo.description)}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{ fontWeight: "bold" }}
            onClick={handleClose}
          >
            Return
          </Button>
          
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <div>
          {success && (
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              {success}
            </Alert>
          )}
        </div>
      </Snackbar>
    </div>
  );
}
