import React from 'react'
import {Box, Grid, ThemeProvider, Typography, Button, Pagination} from "@mui/material"
import theme from "../theme";
export default function MyJobPost() {   
  return (
    <>
    <ThemeProvider theme={theme} >
    <img src='/image/slider1.jpg' alt='duytan-banner' style={{marginTop:0,width:"100%",height:"350px",marginBottom:0}}/>
        <Box bgcolor="white" py={2} sx={{marginTop:0,width:"100%"}}>
          <Grid container justifyContent="center">  
            <Grid item xs={10}>
              <Box display="flex" justifyContent="space-between">
              <Typography variant='h4'>My Recruitment Post</Typography>
              </Box>
            </Grid>               
          </Grid>
        </Box>
        <Grid container justifyContent="center">
          <Grid item xs={10}>
           
          </Grid>
        </Grid>
        <Pagination style={{marginTop:"40px"}} count={1} variant="outlined" shape="rounded" showFirstButton showLastButton  />
        
    </ThemeProvider> 
</>
  )
}
