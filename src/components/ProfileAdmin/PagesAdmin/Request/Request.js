import React from 'react';
import './Request.css';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab} from "@mui/material";
import Article from "./Article";
import Recruitment from "./Recruitment"

// const columns = [
//     { id: 'id', label: 'ID', minWidth: 50 },
//     { id: 'firstName', label: 'First\u00a0Name', minWidth: 100 },
//     { id: 'lastName', label: 'Last\u00a0Name', minWidth: 100 },
//     { id: 'companyName', label: 'Company\u00a0Name', minWidth: 100 },
//     { id: 'email', label: 'Email', minWidth: 100 },
//     { id: 'phone', label: 'Phone', minWidth: 100 },
//     { id: 'businessLiscense', label: 'Business\u00a0liscense', minWidth: 100 },
//     { id: 'action', label: 'Action', minWidth: 150 },
// ];

export default function Request() {
    // const handleChangeFile = (event, id) => {
    //     console.log("check data file: ", event.target.files)
    //     console.log("check data file: ", id)
    // }
    // const dataRequest = [
    //     {
    //         id: '001',
    //         firstName: 'Sơn',
    //         lastName: 'Nguyễn',
    //         companyName: 'Enclave',
    //         email: 'nguyenson5@dtu.edu.vn',
    //         phone: '0123456789',
    //     },
    //     {
    //         id: '002',
    //         firstName: 'Chân',
    //         lastName: 'Phạm Ngọc',
    //         companyName: 'Axon Active',
    //         email: 'nguyenson5@dtu.edu.vn',
    //         phone: '0123456789',
    //     },
    // ]
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    // const [open, setOpen] = React.useState(false);
    // const [idRequest, setIdRequest] = React.useState('')
    // const handleClickOpen = (id) => {
    //     setOpen(true);
    //     setIdRequest(id)
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };
    // const handleDeclineRequest = (idRequest) => {
    //     console.log("xoa request : ", idRequest)
    //     setOpen(false);
    // }
    // return (
    //     <>
    //         <div className="request-container">
    //             <div className="nav-page-admin-request">
    //                 <div className="text-title-request">Request</div>
    //                 <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    //                     <TableContainer sx={{ maxHeight: 440 }}>
    //                         <Table stickyHeader aria-label="sticky table">
    //                             <TableHead>
    //                                 <TableRow>
    //                                     {columns.map((column) => (
    //                                         <TableCell
    //                                             key={column.id}
    //                                             align={column.align}
    //                                             style={{ minWidth: column.minWidth, background: "#D8D8D8", fontSize: "15px" }}
    //                                         >
    //                                             {column.label}
    //                                         </TableCell>
    //                                     ))}
    //                                 </TableRow>
    //                             </TableHead>
    //                             <TableBody>
    //                                 {dataRequest
    //                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //                                     .map((row) => {
    //                                         return (
    //                                             <TableRow hover role="checkbox" tabIndex={-1}>
    //                                                 {columns.map((column) => {
    //                                                     const value = row[column.id];
    //                                                     return (
    //                                                         <TableCell key={column.id} align={column.align}>
    //                                                             {column.id === 'action'
    //                                                                 ?
    //                                                                 <>
    //                                                                 <Button
    //                                                                     variant="contained"
    //                                                                     sx={{cursor:"pointer", marginRight:"15px", padding:1.5}}
    //                                                                     color='success'
    //                                                                     onClick={() => handleClickOpen(row.id)}
    //                                                                     >
    //                                                                      <i className="fas fa-check"></i>
    //                                                                 </Button>
    //                                                                 <Button              
    //                                                                     color="error"                                                           
    //                                                                     sx={{cursor:"pointer", marginRight:"15px", padding:1.5}}
    //                                                                     variant="contained"
    //                                                                     onClick={() => handleClickOpen(row.id)}>

    //                                                                     <i className="fas fa-xmark"></i>
    //                                                                 </Button>
    //                                                                 </>
    //                                                                 :
    //                                                                 column.id === 'businessLiscense' ?
    //                                                                     <input
    //                                                                         className="input-file-bussiness-liscense"
    //                                                                         type="file"
    //                                                                         onChange={(event) => handleChangeFile(event, row.id)}
    //                                                                     />
    //                                                                     : value
    //                                                             }
    //                                                         </TableCell>
    //                                                     );
    //                                                 })}
    //                                             </TableRow>
    //                                         );
    //                                     })}
    //                             </TableBody>
    //                         </Table>
    //                     </TableContainer>
    //                     <TablePagination
    //                         rowsPerPageOptions={[10, 25, 100]}
    //                         component="div"
    //                         count={dataRequest.length}
    //                         rowsPerPage={rowsPerPage}
    //                         page={page}
    //                         onPageChange={handleChangePage}
    //                         onRowsPerPageChange={handleChangeRowsPerPage}
    //                     />
    //                 </Paper>
    //             </div>

    //             <Dialog
    //                 open={open}
    //                 aria-labelledby="alert-dialog-title"
    //                 aria-describedby="alert-dialog-description"
    //             >
    //                 <DialogContent>
    //                     <DialogContentText id="alert-dialog-description">
    //                         Reject This Request
    //                     </DialogContentText>
    //                 </DialogContent>
    //                 <DialogActions>
    //                     <Button onClick={handleClose}>Disagree</Button>
    //                     <Button onClick={() => handleDeclineRequest(idRequest)} autoFocus>
    //                         Agree
    //                     </Button>
    //                 </DialogActions>
    //             </Dialog>
    //         </div>
    //     </>
    // );
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <>
            <div className="companies-container">
                <div className="nav-page-admin">
                    <div className="text-title-companies">Manage Post</div>
                    <Box sx={{ width: '100%', typography: 'body1', marginTop:"20px",p:3 }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{width:"100%", backgroundColor:"white"}}>
                            <Tab label="Article" sx={{fontWeight:"bold", maxWidth:"50%" , width:"100%"}} value="1" />
                            <Tab label="Recruitment Post"  sx={{fontWeight:"bold", maxWidth:"50%" , width:"100%"}}value="2" />
                        </TabList>
                        </Box>
                    <TabPanel value="1" sx={{backgroundColor:"white",height:"520px"}}><Article/></TabPanel>
                    <TabPanel value="2" sx={{backgroundColor:"white",height:"520px"}}><Recruitment/> </TabPanel>
                    </TabContext>
                    </Box>
                </div>
            </div>
        </>
    );
}

