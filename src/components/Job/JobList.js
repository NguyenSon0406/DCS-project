import React, {useEffect, useState} from 'react'
import JobCard from './JobCard';
import InfoIcon from '@mui/icons-material/Info';
import  { Box,CircularProgress,Typography } from '@mui/material';
import { red } from '@mui/material/colors';
const JobList =(props) => {
   const [progress, setProgress] = useState(0);
   const [open, setOpen]=useState(true);

   useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? setOpen(false) : prevProgress + 10));
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

   const renderJobList = props.jobs.sort((a,b) => {
   return new Date(b.createdAt) - new Date (a.createdAt)
   })
   .map((job, index) => {
        return <JobCard job = {job}
        key = {index} {...job}/>
    });
    
    return (
        <>
            { (open) ?
                (<Box sx={{width:"100%",alignItems:"center" , textAlign:"center",justifyContent:"center", display:"flex",marginTop:"50px" }}>
                <CircularProgress variant="determinate" value={progress} />
                <Typography sx={{marginLeft:"10px",fontSize:"40px"}}>Loading Data...</Typography>                                                                                                                                                                                                 
                </Box>) :  
                (renderJobList.length > 0 ? renderJobList :
                <Box sx={{width:"100%", alignItems:"center",textAlign:"center",justifyContent:"center", display:"flex", marginTop:"20px"}}>
                    <InfoIcon fontSize='large' sx={{color: red[500]}}/>
                    <Typography sx={{marginLeft:"10px",fontSize:"25px", color:"#9e9e9e"}}> No Jobs Available!</Typography>  
                </Box>)
             }
        </>
  )
}

export default JobList;
