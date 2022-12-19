import React,{useState, useEffect} from 'react'
import {Box, Grid, ThemeProvider, Typography, Pagination} from "@mui/material"
import theme from "../components/Job/theme";
import SearchBar from '../components/ListStudent/SearchBar2';
import StudentList from '../components/ListStudent/StudentList';
import axios from 'axios';

const ListStudent = () => {
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const token = localStorage.getItem('accessToken');
  useEffect(() =>{  
    if(token)
    {
      const getAllStudents= async() => {
        const response = await axios.get("/potential-student/list-student",{
          headers: {Authorization: token}
        });
        setStudents(response.data);
    }
    getAllStudents();
    }
  },[token])

  const searchHandle = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newJobList = students.filter((student) => {
        return Object.values(student)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newJobList);
    } else {
      setSearchResults(students);
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
                    </Box>
                  </Grid>               
                </Grid>
              </Box>
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <SearchBar term = {searchTerm}
                    searchKeyWord = {searchHandle}
                  />
                  <StudentList students={searchTerm.length < 1 ? students : searchResults}/>
                </Grid>
                <Pagination style={{marginTop:"40px", marginBottom:"20px"}} count={10} variant="outlined" shape="rounded" showFirstButton showLastButton  />
              </Grid>

          </ThemeProvider> 
    </>
  );
};

export default ListStudent;
