import React,{ useState }  from 'react';
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,IconButton,Typography, Box, Snackbar } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"
import { useSelector } from 'react-redux';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export const DeleteDialog = (props) => {
    const { openPopup, setOpenPopup} = props;
    const token = useSelector(state => state.token);
    const [notify, setNotify] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleDelete = async (id) => {
        try{
            const res= await axios.delete(`/recruitment/delete/${id}`, {
                headers: {Authorization: token}
            })
            setNotify(res.data.msg);
            setOpenPopup(false);
            handleClick();
            navigate("/home/recruitment/myjobpost");
        }catch (err){
            setNotify(err.response.data.msg)
        }
    }
    return(
        <>
        <Dialog open={openPopup} fullWidth={true} maxWidth="sm" onBackdropClick={() => setOpenPopup(false)}>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <Box display="flex" justifyContent="space-between" >
                    <Typography sx={{fontWeight:"bold", fontSize:"20px"}}>Confirm</Typography>
                    <IconButton  onClick={()=>setOpenPopup(false)}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Typography>Accept delete this post?</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' sx={{fontWeight:"bold"}} onClick={()=>setOpenPopup(false)}>CANCEL</Button>
                <Button variant='contained' sx={{fontWeight:"bold"}} onClick={()=>handleDelete(props.id)}>OK</Button>
            </DialogActions>
        </Dialog>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        {notify && <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                           {notify}
                        </Alert>}
        </Snackbar>
        </>
    )
};