import * as React from 'react';
import HomeProfileAdmin from "../HomeProfileAdmin";
import './Request.css';
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

const columns = [
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'firstName', label: 'First\u00a0Name', minWidth: 100 },
    { id: 'lastName', label: 'Last\u00a0Name', minWidth: 100 },
    { id: 'companyName', label: 'Company\u00a0Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'phone', label: 'Phone', minWidth: 100 },
    { id: 'businessLiscense', label: 'Business\u00a0liscense', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 150 },
];

export default function Request() {
    const handleChangeFile = (event, id) => {
        console.log("check data file: ", event.target.files)
        console.log("check data file: ", id)
    }
    const dataRequest = [
        {
            id: '001',
            firstName: 'Sơn',
            lastName: 'Nguyễn',
            companyName: 'Nguyễn Sơn',
            email: 'nguyenson5@dtu.edu.vn',
            phone: '0123456789',
        },
        {
            id: '002',
            firstName: 'Chân',
            lastName: 'Phạm Ngọc',
            companyName: 'Ngọc Chân',
            email: 'nguyenson5@dtu.edu.vn',
            phone: '0123456789',
        },
    ]
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [open, setOpen] = React.useState(false);
    const [idRequest, setIdRequest] = React.useState('')
    const handleClickOpen = (id) => {
        setOpen(true);
        setIdRequest(id)
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDeclineRequest = (idRequest) => {
        console.log("xoa request : ", idRequest)
        setOpen(false);
    }
    return (
        <>
            <div className="request-container">
                <div className="nav-page-admin-request">
                    <div className="text-title-request">Request</div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth, background: "#D8D8D8", fontSize: "15px" }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataRequest
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.id === 'action'
                                                                    ?
                                                                    <>
                                                                        <button className="btn-accept-request">
                                                                            <i className="fas fa-check"></i>
                                                                        </button>
                                                                        <button
                                                                            className="btn-decline-request"
                                                                            onClick={() => handleClickOpen(row.id)}
                                                                        >
                                                                            <i className="fas fa-xmark"></i>
                                                                        </button>
                                                                    </>
                                                                    :
                                                                    column.id === 'businessLiscense' ?
                                                                        <input
                                                                            className="input-file-bussiness-liscense"
                                                                            type="file"
                                                                            onChange={(event) => handleChangeFile(event, row.id)}
                                                                        />
                                                                        : value
                                                                }
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
                            count={dataRequest.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>

                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Reject This Request
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={() => handleDeclineRequest(idRequest)} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

