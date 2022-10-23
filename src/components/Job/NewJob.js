import React from 'react'
import {Box,IconButton, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle,DialogContent,DialogActions, Chip, ListItem, Typography, Button} from "@mui/material";
import TagInput from './TagInput';
import {Close as CloseIcon} from "@mui/icons-material";
import TextEdittor from './TextEdittor';
const NewJob = (props) => {
  const { openPopup, setOpenPopup} = props;

  return (
    <Dialog open={openPopup} fullWidth={true} maxWidth="lg" onBackdropClick={() => setOpenPopup(false)}>
        <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItem="center">
                Post Job
                <IconButton>
                    <CloseIcon onClick={() => setOpenPopup(false)}/>
                </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={6} >
                    <FilledInput 
                    placeholder='Job title *' 
                    disableUnderline
                    fullWidth={true}
                    />
                </Grid>
                <Grid item xs={6}>
                <Select disableUnderline variant='filled' sx={{fontWeight:"bold"}} defaultValue="Full time" fullWidth={true}>
                    <MenuItem value="Full time">
                        Full time
                    </MenuItem>
                    <MenuItem value="Part time">
                        Part time
                    </MenuItem>
                    <MenuItem value="Contract">
                        Contract
                    </MenuItem>
                </Select>
                </Grid>
                <Grid item xs={6} >
                    <FilledInput 
                    placeholder='Job Link *' 
                    disableUnderline
                    fullWidth={true}
                    />
                     
                </Grid>
                <Grid item xs={6}>
                  <Select fullWidth={true} disableUnderline variant='filled' sx={{fontWeight:"bold"}} defaultValue="Remote" >
                    <MenuItem value="Remote">
                        Remote
                    </MenuItem>
                    <MenuItem value="In-Office">
                        In-Office
                    </MenuItem>
                  </Select>
                </Grid>
                
                <Grid item xs={12}>
                    <Typography variant='h5'>Skills</Typography>   
                </Grid>
                <TagInput  />
                <Grid item xs={12}>
                    <Box >
                        <TextEdittor/>
                    </Box>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
                <Box 
                color="red" 
                width="100%" 
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Typography variant="caption" sx={{fontSize:"14px",m:2}} >*Require Fields</Typography>
                <Button variant='contained' sx={{fontWeight:"bold",m:2}}>Post Job</Button>
                </Box>
        </DialogActions>    
    </Dialog>
  )
}

export default NewJob;
