import React,{useState} from 'react'
import {Box, Grid, ThemeProvider, Typography, Button, Pagination} from "@mui/material"
import theme from "../components/Job/theme";
import SearchBar from '../components/Job/SearchBar';
import NewJob from '../components/Job/NewJob';
import JobData from "../components/Job/dummyData"
import JobList from '../components/Job/JobList';
import CompanyList from '../components/Job/CompanyList';

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
          <img src='/image/DTUConnection_banner.png' alt='duytan-banner' style={{marginTop:0,width:"100%",height:"200px",marginBottom:0}}/>
              <Box bgcolor="white" py={2} sx={{width:"100%"}}>
                <Grid container display="flex" spacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                 
               <Grid item xs={10}>
               <Grid container justifyContent="center" sx={{marginLeft:"20px"}}>  
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" sx={{marginBottom:2}}>
                    <Typography  variant='h3'>Newest Job</Typography>
                    <Button 
                    variant='contained'
                    color='error'                   
                    sx={{fontWeight:"bold"}}
                    onClick={() => setOpenPopup(true)}                    
                    >Post a job</Button>
                    </Box>
                    <SearchBar term = {searchTerm}
                    searchKeyWord = {searchHandle}
                  />
                  <JobList jobs={searchTerm.length < 1 ? JobData : searchResults}/>
                 
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

              
              <NewJob openPopup = {openPopup}
        setOpenPopup={setOpenPopup} />
          </ThemeProvider> 
    </>
  )
}


export default Recruitment

