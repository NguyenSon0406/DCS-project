import React,{useState} from 'react'
import {Box, Grid, ThemeProvider, Typography, Button, Pagination} from "@mui/material"
import theme from "../theme";
import SearchBar from '../components/Job/SearchBar';
import NewJob from '../components/Job/NewJob';
import JobData from "../components/Job/dummyData"
import JobList from '../components/Job/JobList';

const Recruitment=() => {
  const [openPopup, setOpenPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const searchHandle = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== "")
    {
      const newJobList = JobData.filter((job) => {
        return Object.values(job)
        .join("")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newJobList);
    }
    else{
      setSearchResults(JobData);
    }
  }
  return (
    <>
          <ThemeProvider theme={theme} >
          <img src='/image/slider1.jpg' alt='duytan-banner' style={{marginTop:0,width:"100%",height:"350px",marginBottom:0}}/>
              <Box bgcolor="white" py={2} sx={{marginTop:0,width:"100%"}}>
                <Grid container justifyContent="center">  
                  <Grid item xs={10}>
                    <Box display="flex" justifyContent="space-between">
                    <Typography variant='h3'>Job Listing</Typography>
                    <Button 
                    variant='contained'
                    color='error'                   
                    sx={{fontWeight:"bold"}}
                    onClick={() => setOpenPopup(true)}                    
                    >Post a job</Button>
                    </Box>
                  </Grid>               
                </Grid>
              </Box>
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <SearchBar term = {searchTerm}
                    searchKeyWord = {searchHandle}
                  />
                  <JobList jobs={searchTerm.length < 1 ? JobData : searchResults}/>
                </Grid>
              </Grid>
              <Pagination style={{marginTop:"40px"}} count={10} variant="outlined" shape="rounded" showFirstButton showLastButton  />
              <NewJob openPopup = {openPopup}
        setOpenPopup={setOpenPopup} />
          </ThemeProvider> 
    </>
  )
}


export default Recruitment
