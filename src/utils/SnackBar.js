import React from 'react'
import { Modal, Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign:"center",
};
export default function SnackBar(props) {
    const {open, setOpen} = props;
    const navigate = useNavigate();
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={open && setTimeout(() => {
            setOpen(false)
            navigate('/home/recruitment/myjobpost');
        }, 3000)}
            >
            <Box sx={style}>
                <CheckCircleIcon fontSize='large' sx={{color:"green"}}/>
                <Typography>{props.msg}</Typography>
                <Button variant="contained" sx={{marginTop:"10px"}}>
                    <Link to="/home/recruitment/myjobpost" style={{ color: "white", fontWeight:"bold" }}>Return
                    </Link>
                </Button>
            </Box>
        </Modal>
    )
}
