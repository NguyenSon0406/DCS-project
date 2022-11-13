import React from 'react'
import {  Box, Grid, Typography, Button, Avatar} from "@mui/material"
import { makeStyles } from '@mui/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
    const [flag, setFlag] = React.useState(false);
  
    const handleClick = () => {
      setFlag(!flag);
    }
    
  return (
   <Box p={1} className={classes.wrapper}>
      <Grid container alignItems="center">
      <Grid item>
            <img alt='avatar company'
              src="https://www.citypng.com/public/uploads/preview/black-user-member-guest-icon-31634946589seopngzc1t.png"
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
            {flag ? <FavoriteIcon onClick = {handleClick} color="primary"/> :
            
              <FavoriteBorderIcon
              onClick = {handleClick}
            />}
                 
          </Grid>
          <Grid item>
            <Box mt={2}>
                <Button variant='outlined' 
                className={classes.button} 
                >
                  Detail
                </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
   </Box>
  )
}
