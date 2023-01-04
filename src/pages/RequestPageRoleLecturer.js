import React from 'react'
import {Box, Grid, ThemeProvider, Typography, InputAdornment, OutlinedInput, Pagination, Paper} from "@mui/material"
import theme from "../components/Job/theme";
import CompanyList from '../components/Job/CompanyList';
import SearchIcon from '@mui/icons-material/Search';
import RequestList from '../components/RequestRoleLecturer/RequestList';

export default function RequestPageRoleLecturer() {

  return (
    <>
          <ThemeProvider theme={theme} >
              <Box bgcolor="white" py={2} sx={{width:"100%"}}>
                <Grid container display="flex" spacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
               <Grid item xs={10}>
               <Grid container justifyContent="center" sx={{marginLeft:"20px"}}>  
                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" sx={{marginBottom:2}}>
                      <Typography  variant='h3'>Request List</Typography>
                    </Box>
                    <Box sx={{
                      width:"100%", 
                      display:"flex", 
                      height:"700px",
                      boxShadow:"0px 1px 5px rgba(0,0,0,0.3)",
                      borderRadius:'10px',
                      }}>
                      <Paper className='part-left' sx={{width:"30%", textAlign:"center", alignItems:"center"}}>
                      <OutlinedInput size='small'
                          sx={{width:"90%",
                          marginTop:"20px"}}
                          placeholder='Input keyword to search' 
                          startAdornment = {
                              <InputAdornment position='start'>
                                  <SearchIcon/>
                              </InputAdornment>
                          }
                      />
                        <RequestList/>
                      </Paper>
                      <Paper className='part-right' sx={{width:"70%", textAlign:"center", alignItems:"center"}}>
                          <Typography sx={{fontSize:"40px"}}>Update Soon!</Typography>
                      </Paper>
                    </Box>
                  </Grid>          
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
          </ThemeProvider> 
    </>
  )
}
