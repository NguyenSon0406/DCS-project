import React from 'react';
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,IconButton,Typography, Box } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"
export const DeleteDialog = (props) => {
    const { openPopup, setOpenPopup} = props;
    return(
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
                <Button variant='contained' sx={{fontWeight:"bold"}}>OK</Button>
            </DialogActions>
        </Dialog>
    )
};