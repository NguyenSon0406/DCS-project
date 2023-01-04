import React,{useState,useEffect, useReducer} from 'react'
import {Box, Grid, ThemeProvider, Typography, Button, Pagination} from "@mui/material"
import theme from "../components/Job/theme";
import SearchBar from '../components/Job/SearchBar';
import NewJob from '../components/Job/NewJob';
import JobList from '../components/Job/JobList';
import CompanyList from '../components/Job/CompanyList';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PostAddIcon from '@mui/icons-material/PostAdd';

const Recruitment=() => {
  const [openPopup, setOpenPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem('accessToken');
  const [reducerValue,forceUpdate] = useReducer(x => x + 1, 0);
  const auth = useSelector( state => state.auth)
  const {role} = auth 

  useEffect(() =>{  
    if(token)
    {
      const getAllJobs= async() => {
        const response = await axios.get("/recruitment/list-post",{
          headers: {Authorization: token}
        });
        setJobs(response.data);
    }
    getAllJobs();
    }
  },[reducerValue,token])
  const searchHandle = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== "")
    {
      const newJobList = jobs.filter((job) => {
        return Object.values(job)
        .join("")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newJobList);
    }
    else{
      setSearchResults(jobs);
    }
  }
  const passUpdateList = () => {
    forceUpdate();
  }
  return (
    <>
          <ThemeProvider theme={theme} >
              <Box bgcolor="white" py={2} sx={{width:"100%"}}>
                <Grid container display="flex" spacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
               <Grid item xs={10}>
               <Grid container justifyContent="center" sx={{marginLeft:"20px"}}>  
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" sx={{marginBottom:2}}>
                    <Typography  variant='h3'>Newest Job</Typography>
                   {(role === 1) &&  <Button 
                    variant='contained'
                    color='error'                   
                    sx={{fontWeight:"bold"}}
                    onClick={() => setOpenPopup(true)}
                    startIcon={<PostAddIcon/>}                    
                    >Post a job</Button>
                   }
                    </Box>
                    <SearchBar term = {searchTerm}
                    searchKeyWord = {searchHandle}
                  />
                  <JobList jobs={searchTerm.length < 1 ? jobs : searchResults}/>
                 
                  </Grid>
                  <Pagination 
                  style={{marginTop:"40px"}} 
                  count={10}
                   
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
                    <CompanyList/>
                </Box>
                  <img src='/image/bannerRecruitment.png' alt='duytan-banner' style={{marginTop:"50px", width:"230px"}}/>
               </Grid>
                </Grid>
              </Box>

              <NewJob openPopup = {openPopup} passUpdateList = {passUpdateList}
        setOpenPopup={setOpenPopup} />
          </ThemeProvider> 
    </>
  )
}


export default Recruitment

