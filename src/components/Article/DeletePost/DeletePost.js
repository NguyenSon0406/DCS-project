import React,{ useState }  from 'react';
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,IconButton,Typography, Box } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"
import axios from 'axios';
import SnackBar from "../../../utils/SnackBar"

export const DeletePost = (props) => {
    const { openPopup, setOpenPopup} = props;
    const token = localStorage.getItem('accessToken');
    const [notify, setNotify] = useState('');
    const [open, setOpen] = useState(false);
    const post = "post";

    const handleClick = () => {
      setOpen(true);
    };

    const handleDelete = async (id) => {
        try{
            const res= await axios.delete(`/post/delete/${id}`, {
                headers: {Authorization: token}
            })
            setNotify(res.data.msg);
            setOpenPopup(false);
            handleClick();
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
        <SnackBar open={open} setOpen={setOpen} msg={notify} type={post}/>
        </>
    )
};