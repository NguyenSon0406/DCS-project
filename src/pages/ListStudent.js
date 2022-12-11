import React,{useState} from 'react'
import {Box, Grid, ThemeProvider, Typography, Button, Pagination} from "@mui/material"
import theme from "../components/Job/theme";
import SearchBar from '../components/ListStudent/SearchBar2';
import JobData from "../components/ListStudent/dummyData2"
import JobList from '../components/ListStudent/StudentList';

const ListStudent = () => {
  const [openPtxopup, setOpenPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const searchHandle = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newJobList = JobData.filter((job) => {
        return Object.values(job)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newJobList);
    } else {
      setSearchResults(JobData);
    }
  };
  return (
    <>
      <ThemeProvider theme={theme} >
              <Box bgcolor="white" py={2} sx={{marginTop:0,width:"100%"}}>
                <Grid container justifyContent="center">  
                  <Grid item xs={10}>
                    <Box display="flex" justifyContent="space-between">
                    <Typography variant='h3'>List Potential Student</Typography>
                    {/*  */}
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
              
          </ThemeProvider> 
    </>
  );
};

export default ListStudent;
