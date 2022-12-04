import React,{useState} from 'react'
import {makeStyles} from "@mui/styles"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CalendarMonth,AccessTime,LocationOn,Computer} from '@mui/icons-material';
import {Box, Grid, ThemeProvider, Typography, Button,Paper, Divider, Chip, IconButton,Menu, MenuItem,Tooltip} from "@mui/material"
import theme from "./theme";
import ConvertToHTML from "react-html-parser";
import CompanyList from './CompanyList';
import { useLocation,Link } from 'react-router-dom';
import { DeleteDialog } from './DeleteDialog';
import { useSelector } from 'react-redux';
const useStyles = makeStyles({
  wrapper:{
      backgroundColor:"#fff",
      display:"flex",
      boxShadow:"0px 1px 5px rgba(0,0,0,0.3)",
      borderRadius:'5px',
      alignItems:"center",
      "& > *" :{
          
          height:"45px",
          margin:"8px",
      },
  },
  companyName:{
    color:"#0288d1", 
    fontWeight:"bold",
    marginLeft:"10px",
    "&:hover":{
      color:"#42a5f5"
    }
  },
});
export default function JobDetail(props) { 
  const auth = useSelector(state => state.auth)
  const {user} = auth;
  const [openPopup, setOpenPopup] = useState(false);
  const classes = useStyles(); 
  const getLocation = useLocation(); 
  const [anchorElSetting, setAnchorElSetting] = useState(null);
  const handleOpenSetting = (event) => {
    setAnchorElSetting(event.currentTarget);
  };
  const handleCloseSetting = () => {
    setAnchorElSetting(null);
  };
  const {_id,user_id,title,type,address,location,avatar,companyName,createdAt,skills,description,link} = getLocation.state.job;
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
    <>
    <ThemeProvider theme={theme} >
    <img src='/image/DTUConnection_banner.png' alt='duytan-banner' style={{marginTop:0,width:"100%",height:"200px",marginBottom:0}}/>
    <Box bgcolor="white" py={2} sx={{width:"100%"}}>
                <Grid container display="flex" spacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
               <Grid item xs={10}>
               <Grid container justifyContent="center" sx={{marginLeft:"20px"}}>  
                  <Grid item xs={12}>
                    <Paper display="flex" flex-dicorection="column" sx={{textAlign: "left",maxHeight: 1000, overflow: 'auto'}}>
                        <Box display="flex" justifyContent="space-between">
                          <Box display="flex" alignItems="center">
                            <img src={avatar} alt="avatar" style={{verticalAlign:"middle",margin:0, width:"60px", height:"60px",borderRadius:"50%"}}/>
                            <Typography className={classes.companyName} variant="h5">{companyName}</Typography>
                          </Box>
                          { (user_id === user.user_id) ? <Box>
                           <Tooltip title="Setting" arrow>
                           <IconButton onClick={handleOpenSetting} size="small">
                              <MoreHorizIcon/>
                            </IconButton>
                           </Tooltip>
                            <Menu
                                sx={{ mt: '25px' }}
                                id="menu-appbar"
                                anchorEl={anchorElSetting}
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                open={Boolean(anchorElSetting)}
                                onClose={handleCloseSetting}
                              >
                                <MenuItem onClick={()=>setOpenPopup(true)}><DeleteIcon  sx={{ fontSize: 18,marginRight:"5px" }}/>Delete</MenuItem>
                                <MenuItem><Link to={`/home/recruitment/edit/${_id}`} state={{edit:{_id,title,type,link,location,skills,description}}}>
                                  <EditIcon sx={{ fontSize: 18,marginRight:"5px" }}/>Edit
                                  </Link>
                                </MenuItem>
                              </Menu>
                          </Box>: ''}
                        </Box>
                        <Box display="flex" >
                            <Box  display="flex" flexDirection="column" sx={{padding:1}} color="#9e9e9e">
                            <LocationOn />
                            <AccessTime />
                            <Computer />
                            <CalendarMonth />
                            </Box>
                            <Box display="flex" flexDirection="column" sx={{padding:1,right:"200px"}} color="#9e9e9e">
                            <Typography >{address}</Typography>
                            <Typography >{type}</Typography>
                            <Typography>{location}</Typography>
                            <Typography variant='subtitle1' >{calculateTimePass(createdAt)}</Typography>
                            </Box>
                            <Box>
                            <Divider orientation="vertical" variant="middle" flexItem sx={{height:"90%"}} />
                            </Box>
                           <Box display="flex" flexDirection="column">
                            <Box display="flex"  color="#9e9e9e" >
                                <Typography sx={{padding:1}} >
                                  Position 
                                </Typography>
                                <Box sx={{padding:1}}>
                                {
                                  skills.map((skill) => (
                                    <Chip label={skill} color="primary" size='small'
                                      sx={{fontWeight:"bold",fontSize:"10px",marginRight:"5px"}}
                                    />
                                  ))
                                }
                                </Box>
                              </Box>
                              <Box display="flex"  color="#9e9e9e" >
                                <Typography sx={{padding:1}} >
                                  Job Link 
                                </Typography>
                                <Box sx={{padding:1}}>
                                <a href={link}>{link}</a>
                                </Box>
                              </Box>
                            </Box>
                        </Box>
                        <Divider variant="middle" sx={{width:"auto"}} />
                        <Box>
                          <Typography sx={{fontWeight:"bold", fontSize:"40px",color:"primary.main"}}>{title}</Typography>
                        </Box>
                        <Box>
                          <Typography sx={{fontWeight:"bold", fontSize:"30px"}}>Job Descriptions</Typography>
                        </Box>
                        <Box>
                            {ConvertToHTML(description)}
                        </Box>
                        {user.role !== 1 ? 
                        ( <Button variant='contained' sx={{marginTop:"30px",marginBottom:"30px",fontWeight:"bold", justifyContent:"center", textAlign:"center"}}  color='error'>Apply Now</Button>)
                          : ""
                        }
                    </Paper>
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
                    <CompanyList  />
                </Box>
                  <img src='/image/bannerRecruitment.png' alt='duytan-banner' style={{marginTop:"50px", width:"230px"}}/>
               </Grid>
                </Grid>
              </Box>
    </ThemeProvider> 
    <DeleteDialog id={_id} openPopup = {openPopup}
        setOpenPopup={setOpenPopup}/>
</>
  )
}
