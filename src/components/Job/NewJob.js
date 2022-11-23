import React,{useState} from 'react'
import {Box,IconButton, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle,DialogContent,DialogActions, Typography, Button} from "@mui/material";
import TagInput from './TagInput';
import {Close as CloseIcon} from "@mui/icons-material";
import TextEdittor from './TextEdittor';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const initialState = {
    title:'',
    avatar:'',
    companyName:'',
    link:'',
    address:'',
    err:'',
    success:''
}
const NewJob = (props) => {
  const { openPopup, setOpenPopup} = props;
  const [data, setData] = useState(initialState)
  let {title,avatar,companyName,link, address, err, success} = data;
  const [skills,setSkills] = useState([]);
  const [description,setDescription] = useState('');
  const [type, setType] = useState('Full time');
  const [location, setLocation] = useState('Remote');

  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const {user} = auth;

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
 }
  const handleSkills = (tags) => {
    setSkills(tags);
  }
  const handleDesciption = (text) => {
    setDescription(text);
  }
  const handleType = (e) => {
    setType(e.target.value)
  }
  useEffect(()=>{
   if(type === '')
    setType('Full time')
  },[type]);

  useEffect(()=>{
    if(location === '')
     setLocation('Remote')
   },[location]);

  const handleLocation = (e) => {
    setLocation(e.target.value)
  }
  const handleChange = e => {
    const {name, value} = e.target
    setData({...data, [name]:value, err:'', success: ''})
}
  
  const handlePost = async (e) => {
    e.preventDefault();
    avatar = user.avatar;
    companyName = user.companyName;
    address = user.address;
    try{
        const res = await axios.post('/recruitment/post',{
            title,avatar,companyName,link,type,location, address, skills, description
        },{
            headers: {Authorization: token} 
        })
        setData({...data, err:'', success: res.data.msg})
        handleClick();
    }catch(err){
        err.response.data.msg && 
        setData({...data, err:err.response.data.msg, success: ''})
        
    }
  }
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
                    name='title'
                    placeholder='Job title *' 
                    disableUnderline
                    fullWidth={true}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                <Select name="type" 
                disableUnderline 
                variant='filled' 
                sx={{fontWeight:"bold"}} 
                defaultValue="Full time" 
                onChange={handleType}
                fullWidth={true}
                >
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
                    name="link"
                    placeholder='Job Link *' 
                    disableUnderline
                    fullWidth={true}
                    onChange={handleChange}
                    />
                     
                </Grid>
                <Grid item xs={6}>
                  <Select name="location" fullWidth={true} disableUnderline variant='filled' sx={{fontWeight:"bold"}}  onChange={handleLocation} defaultValue="Remote">
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
                <TagInput setSkills={handleSkills}/>
                <Grid item xs={12}>
                    <Typography variant='h5'>Job Descriptions</Typography>   
                </Grid>
                <Grid item xs={12}>
                    <Box >
                        <TextEdittor setDescription={handleDesciption}/>
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
                <Button variant='contained' sx={{fontWeight:"bold",m:2}} onClick={handlePost}>Post Job</Button>
                </Box>
        </DialogActions>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            {success && <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {success}
            </Alert>}
         </Snackbar>    
    </Dialog>
  )
}

export default NewJob;
