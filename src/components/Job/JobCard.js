import React from 'react'
import {  Box, Grid, Typography, Button, Avatar} from "@mui/material"
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) =>({
  wrapper:{
    border:"1px solid #e8e8e8",
    transition:".3s",
    "&:hover":{
      boxShadow:"0px 5px 25px rgba(0,0,0,0.1)",
      borderLeft:"6px solid #4D64E4",
    }
  },
  
  companyName:{
    
    fontSize:"13.5px",
    padding:theme.spacing(0.5),
    borderRadius:"5px",
    display:"inline-block",
    color:"#B5B5B5",
    fontWeight:600, 
  },
  skillChip:{
    margin:theme.spacing(0.5),
    padding:theme.spacing(0.75),
    fontSize:"14.5",
    borderRadius:"5px",
    cursor:"pointer",
    backgroundColor:"#000000",
    color:"#fff"
  },
  button:{
    color:"#0B0B15" ,
    border:"2px solid #0B0B15", 
    fontWeight:"bold",
    borderRadius:"30px",
    "&:hover":{
      border:"2px solid #436EEE",
      color:"#436EEE",
    }
  },
 
}));

export default function JobCard(props) {
  const classes = useStyles();
  const calculateTimePass = ( datePast) => {
    const dateNow = Date.now();
    const datePa = Date.parse(datePast);
    let timePass ="";
    
      let timeDifference = dateNow - datePa;
      
      let monthDifference = parseInt(Math.abs(timeDifference/(1000*3600*24*30)))
      let dayDifference = parseInt(Math.abs(timeDifference/(1000*3600*24)));
      let hourDifference = parseInt(Math.abs(timeDifference/(1000*3600)));
      let minuteDifference = parseInt(Math.abs(timeDifference/(1000*60)));
      let secondDifference = parseInt(Math.abs(timeDifference/1000));

      if(monthDifference <= 0)
      {
        if(dayDifference <= 0)
        {
          if(hourDifference <= 0)
          {
            if(minuteDifference <=0 )
            {
              timePass = secondDifference + " seconds ago"
            }
            else{
              timePass= minuteDifference + " minutes ago";  
            }
          }else{
            timePass= hourDifference + " hours ago";
          }
        }
        else{
          timePass= dayDifference + " day ago";

          }
      }
      else
      {
        timePass = monthDifference + " months ago"
      }
      
    return timePass;
  }
  return (
   <Box p={1} className={classes.wrapper}>
      <Grid container alignItems="center">
      <Grid item>
            <img alt='avatar company'
              src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBK1lxREE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--6163801645eb4792d6534169042826e45cbf6b51/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--ee4e4854f68df0a745312d63f6c2782b5da346cd/mgm-technology-partners-vietnam-logo.png"
              style={{
                margin:"10px",
                width: "70px",
                height: "70px",
                }}/>
            </Grid>
          <Grid item container direction="column" xs>
          <Grid item>
          <Typography variant='subtitle1' sx={{fontWeight:"bold"}}>{props.title}</Typography>

          </Grid>
          <Grid item>
          <Typography className={classes.companyName} variant='subtitle1'>{props.companyName}</Typography>
          </Grid>
        </Grid>
            {/* <Grid item xs direction="column"  alignItems="flex-start">
              <Typography variant='subtitle1' sx={{fontWeight:"bold"}}>{props.title}</Typography>
              <Typography className={classes.companyName} variant='subtitle1'>{props.companyName}</Typography>
            </Grid> */}
        <Grid item container xs>
                {
                  props.skills.map((skill) =>(
                    <Grid key={skill} className={classes.skillChip}>
                      {skill}
                 </Grid>
                  ))
                  }  
        </Grid>
        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item>
            <Typography variant='caption'>
              {calculateTimePass(props.postedOn)} | {props.type} | {props.location}
            </Typography>
          </Grid>
          <Grid item>
            <Box mt={2}>
                <Button variant='outlined' 
                className={classes.button} 
                >
                  Check
                </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
   </Box>
  )
}
