import React,{useState,useReducer,useRef, useEffect} from "react";
import {Table,TableBody,TableCell,TableHead,TableContainer,TablePagination,TableRow,Paper,Button, Dialog, DialogContent,DialogActions,DialogContentText,Box, DialogTitle, Typography, Snackbar, TextField} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import MuiAlert from '@mui/material/Alert';
import ConvertHTML from "react-html-parser"
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'title', label: 'Title', minWidth: 50 },
    { id: 'companyName', label: 'Company\u00a0Name', minWidth: 150 },
    { id: 'createdAt', label: 'Created At', minWidth: 50},
    { id: 'action',  minWidth: 190 },
];
export default function Recruitment() {
  const token = localStorage.getItem("accessToken");
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [recruitment, setRecruitment] = useState([]);
  const [companyInfo, getCompanyInfo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const inputElement = useRef("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (token) {
      const getAllRecruitment = async () => {
        const response = await axios.get("/admin/list-recruitment", {
          headers: { Authorization: token },
        });
        setRecruitment(response.data);
      };
      getAllRecruitment();
    }
  }, [reducerValue]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //cut id student
  const handleID = (id) => {
    let stringId = id.slice(19, 24);
    return stringId;
  };

  //handle page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const searchHandle = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newRecruitmentList = recruitment.filter((recruitment) => {
        return Object.values(recruitment)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newRecruitmentList);
    } else {
      setSearchResults(recruitment);
    }
  };

  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [idCompany, setIdCompany] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdCompany(id);
  };

  const handleClickOpenView = async (id) => {
    const res = await axios.get(`/admin/recruitment-info/${id}`, {
      headers: { Authorization: token },
    });
    getCompanyInfo(res.data);
    setOpenView(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenView(false);
  };

  const handleClick = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleDeleteRecruitment = async (id) => {
    const res = await axios.delete(`/admin/delete-recruitment/${id}`, {
      headers: { Authorization: token },
    });
    setSuccess(res.data.msg);
    forceUpdate();
    setOpen(false);
    handleClick();
  };

  const convertCreateDay = (day) => {
    const birthday = new Date(day).toISOString().slice(0, 16).replace("T"," ");
    return birthday;
  };

  const handleReturnList = (list) => {
    return (
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
                    align="center"
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
                .map((row, index) => {
                  return (
                    <TableRow
                      key={index}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={index} align="center">
                            {column.id === "action" ? (
                              <>
                                <Button
                                  variant="contained"
                                  color="error"
                                  sx={{
                                    cursor: "pointer",
                                    marginRight: "15px",
                                    padding: 1,
                                  }}
                                  onClick={() => handleClickOpen(row._id)}
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
                                    handleClickOpenView(row._id)
                                  }
                                >
                                  <i className="fas fa-magnifying-glass"></i>
                                </Button>
                              </>
                            ) : column.id === "createdAt" ? (
                              convertCreateDay(value)
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
  };
  return (
    <div>
    {searchTerm.length < 1 ? handleReturnList(recruitment) : handleReturnList(searchResults)}
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
          Are you sure to delete this post?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" sx={{fontWeight:"bold"}} onClick={handleClose}>
          No
        </Button>
        <Button
          variant="contained"
          sx={{fontWeight:"bold"}}
          onClick={() => handleDeleteRecruitment(idCompany)}
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
      <DialogTitle>Recruitment Post Information</DialogTitle>
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
            <div>
              {companyInfo.companyName}
            </div>
          </Typography>
        </Box>
        <Box>
          <Typography sx={{color:"#1976d2"}}>Job Title: {companyInfo.title}</Typography>
          <Typography>Type: {companyInfo.type}</Typography>
          <Typography>Location: {companyInfo.location}</Typography>
          <Typography>Address: {companyInfo.address}</Typography>
          <Typography>Job Link: {companyInfo.link}</Typography>
          <Typography>
            Description: {ConvertHTML(companyInfo.description)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" sx={{fontWeight:"bold"}} onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" sx={{fontWeight:"bold"}} autoFocus>
          Update
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
