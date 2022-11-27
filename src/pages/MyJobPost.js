import React, { useState,useEffect } from 'react'
import {makeStyles} from "@mui/styles"
import {Box, Grid, ThemeProvider, Typography, Button, Pagination, FilledInput, InputAdornment} from "@mui/material"
import theme from "../components/Job/theme";
import CompanyList from '../components/Job/CompanyList';
import MyJobList from '../components/Job/MyJobList';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  wrapper:{
      backgroundColor:"#fff",
      display:"flex",
      boxShadow:"0px 1px 5px rgba(0,0,0,0.3)",
      borderRadius:'5px',
      alignItems:"center",
      "& > *" :{
          
          height:"45px",
          margin:"8px",
      },
  },
});
export default function MyJobPost() { 
  const classes = useStyles();
  const [jobs,setJobs] = useState([])
  const token = useSelector(state => state.token);
  

  useEffect(() =>{  
    const getAllJobs= async() => {
        const response = await axios.get("/recruitment/mypost",{
          headers: {Authorization: token}
        });
        setJobs(response.data);
    }
    getAllJobs();
    
  },[])  
  
  return (
    <>
    <ThemeProvider theme={theme} >
    <img src='/image/DTUConnection_banner.png' alt='duytan-banner' style={{marginTop:0,width:"100%",height:"200px",marginBottom:0}}/>
    <Box bgcolor="white" py={2} sx={{width:"100%"}}>
                <Grid container display="flex" spacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                 
               <Grid item xs={10}>
               <Grid container justifyContent="center" sx={{marginLeft:"20px",border:"1px solid #e8e8e8"}}>  
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" sx={{marginBottom:2 }}>
                    <Typography  variant='h3'>My Recruitment Post ({jobs.length})</Typography>
                    </Box>
                    <MyJobList jobs={jobs}/>
                  </Grid>
                  <Pagination 
                    style={{marginTop:"40px"}} 
                    count={1}
                    variant="outlined" 
                    shape="rounded" 
                    showFirstButton showLastButton  />           
                </Grid>
              
               </Grid>
               <Grid item xs={2}>
               <Box
                  sx={{
                    backgroundColor: 'primary.light',
                    width:"230px",
                    padding: 1,
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  <Typography color="#fff" variant='h6'>Top Company</Typography>
                </Box>
                <Box sx={{border:"1px solid primary.light"}}>
                    <CompanyList  />
                </Box>
                  <img src='/image/bannerRecruitment.png' alt='duytan-banner' style={{marginTop:"50px", width:"230px"}}/>
               </Grid>
                </Grid>
              </Box>
    </ThemeProvider>
  
</>
  )
}
