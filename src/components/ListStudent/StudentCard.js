import React, {useState} from 'react'
import { styled } from '@mui/material/styles';
import {  Box, Grid, Typography, Button} from "@mui/material"
import { makeStyles } from '@mui/styles';
import { BorderColor,StarBorder, School } from '@mui/icons-material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import { useEffect } from 'react';
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

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#757575",
    color: theme.palette.common.white,
    boxShadow: theme.shadows[2],
    fontSize: 12,
  },
}));
export default function StudentCard(props) {
    const classes = useStyles();
    const token = localStorage.getItem('accessToken');
    const [flag, setFlag] = useState(false);
    const {firstName, lastName, className, avatar,user_id} = props.student.user_id;
    const {skills, GPA,_id} = props.student
    const [numPost, setNumPost] = useState('')
    const [highlight, setHighlight] = useState('');
    const handleClick = () => {
      setFlag(!flag);
    }
    const returnFullname = (lastName, firstName) => {
      const name = lastName + " " + firstName;
      return name;
    }
    
   useEffect(() => {
    if(token)
    {
      const countPosts = async () => {
        const res = await axios.patch(`/potential-student/count-post/${user_id}`,{
          _id: _id
        },{
          headers: {Authorization: token}
        });
        setNumPost(res.data);
        setHighlight(res.data*10);
      }
      countPosts();
    }
   },[token,user_id,_id]);

  return (
   <Box p={1} className={classes.wrapper}>
      <Grid container alignItems="center">
      <Grid item>
            <img alt='avatar'
              src={avatar}
              style={{
                margin:"10px",
                width: "70px",
                height: "70px",
                borderRadius:"50%"
                }}/>
            </Grid>
          <Grid item container direction="column" xs>
            <Grid item>
              <Typography variant='subtitle1' sx={{fontWeight:"bold"}}>{returnFullname(lastName,firstName)}</Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.companyName} variant='subtitle1'>{className}</Typography>
            </Grid>
        </Grid>
        <Grid item container xs={3}>
                {
                  skills.map((skill , index) =>(
                    <Grid key={index} className={classes.skillChip}>
                      {skill}
                 </Grid>
                  ))
                  }  
        </Grid>
        <Grid item xs alignItems="center">
          <Grid item display="flex" sx={{justifyContent:"center"}}>
                    <LightTooltip title="Exp">
                        <StarBorder  color='primary' sx={{fontSize:"25px"}} />
                    </LightTooltip>
                    <Typography variant='body1' color="#B5B5B5" sx={{fontSize:"20px"}}>{highlight}</Typography>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid item display="flex" sx={{justifyContent:"center"}} >
                    <LightTooltip title="Posts" >
                      <BorderColor  color='primary' sx={{fontSize:"22px"}} />
                    </LightTooltip>
                    <Typography variant='body1' color="#B5B5B5" sx={{fontSize:"20px", marginLeft:0.5}}>{numPost}</Typography>
          </Grid>
        </Grid>
        <Grid item xs >
          <Grid item display='flex' sx={{justifyContent:"center"}}>
                  <LightTooltip title="GPA">
                  <School  color='primary' sx={{fontSize:"26px"}}/>
                  </LightTooltip>
                  <Typography variant='body1' color="#B5B5B5" sx={{fontSize:"20px", marginLeft:0.5}}>{GPA}</Typography>
          </Grid>
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
