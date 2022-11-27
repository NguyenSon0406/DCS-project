import { Box,Grid,Select,MenuItem,FilledInput,Typography,Button } from "@mui/material";
import React,{ useState } from "react";
import {useLocation,useNavigate} from "react-router-dom"
import TagInput from "./TagInput";
import TextEdittor from "./TextEdittor";
import CompanyList from "./CompanyList";
import axios from "axios";
import { useSelector } from "react-redux";

const initialState = {
    tempTitle:'',
    tempType:'',
    tempLocation:'',
    tempLink:'',
    err:'',
    success:''
}
const UpdateJob = (props) => {
    const getLocation = useLocation();
    const navigate = useNavigate();
    const token = useSelector(state => state.token);
    const {_id,title,type,location,skills,description,link} = getLocation.state.edit;
    const [data, setData] = useState(initialState);
    const {tempTitle,tempType,tempLocation,tempLink,success,err} = data;
    
    const [tempSkills,setTempSkills] = useState([]);
    const [tempDescription, setTempDescription] = useState('');

    const handleSkills = (tags) => {
        setTempSkills(tags);
    }
    const handleDescription = (text) => {
        setTempDescription(text);
    }
    const handleChange = (e) => {
        const {name,value} = e.target;
        setData({...data,[name]:value})
    }

    const handleUpdate = async(e) => {
        try{
           const res = await axios.patch(`/recruitment/update/${_id}`,{
                title: tempTitle ? tempTitle : title,
                link: tempLink ? tempLink : link,
                type: tempType ? tempType : type,
                location: tempLocation ? tempLocation : location,
                skills: tempSkills ? tempSkills : skills,
                description: tempDescription ? tempDescription : description
            },{
                headers: {Authorization: token}
            })
            setData({...data,err:'',success:res.data.msg})
            navigate("/home/recruitment/myjobpost")
        }catch(err)
        {
            err.response.data.msg && 
            setData({...data, err:err.response.data.msg, success: ''})
        }
    }
    const handleClick = (e) =>{
        e.preventDefault();
        navigate("/home/recruitment/myjobpost");
    } 
    return (
        <>
            <img src='/image/DTUConnection_banner.png' alt='duytan-banner' style={{marginTop:0,width:"100%",height:"200px",marginBottom:0}}/>
              <Box bgcolor="white" py={2} sx={{width:"100%"}}>
                <Grid container display="flex" spacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
               <Grid item xs={10}>
                <Grid container justifyContent="center" sx={{marginLeft:"20px"}}>  
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="space-between" sx={{marginBottom:2}}>
                        <Typography  variant='h3'>Edit Job</Typography>
                    </Box>
                    </Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <FilledInput 
                        name="tempTitle"
                        defaultValue={title}
                        placeholder='Job title *' 
                        disableUnderline
                        fullWidth={true}
                        onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <Select name="tempType" 
                    disableUnderline 
                    variant='filled' 
                    sx={{fontWeight:"bold"}} 
                    defaultValue={type} 
                    fullWidth={true}
                    onChange={handleChange}>
                        <MenuItem value="Full time">
                            Full time
                        </MenuItem>
                        <MenuItem value="Part time">
                            Part time
                        </MenuItem>
                        <MenuItem value="Contract">
                            Contract
                        </MenuItem>
                    </Select>
                    </Grid>
                    <Grid item xs={6} >
                        <FilledInput 
                        name="tempLink"
                        placeholder='Job Link *' 
                        disableUnderline
                        fullWidth={true}
                        defaultValue={link}
                        />
                        
                    </Grid>
                    <Grid item xs={6}>
                    <Select 
                    name="tempLocation" 
                    fullWidth={true} 
                    disableUnderline 
                    variant='filled' 
                    sx={{fontWeight:"bold"}} 
                    defaultValue={location} 
                    onChange={handleChange}>
                        <MenuItem value="Remote">
                            Remote
                        </MenuItem>
                        <MenuItem value="In-Office">
                            In-Office
                        </MenuItem>
                    </Select>
                    </Grid>
                    
                    <Grid item xs={12} display="flex">
                        <Typography variant='h5'>Skills</Typography>   
                    </Grid>
                    <TagInput skills={skills} handleSkills={handleSkills}/>
                    <Grid item xs={12} display="flex">
                        <Typography variant='h5'>Job Descriptions</Typography>   
                    </Grid>
                    <Grid item xs={12}>
                        <Box >
                            <TextEdittor jobDescription ={description} handleDescription={handleDescription}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} spacing={2}>
                        <Button variant="contained" color="primary" sx={{fontWeight:"bold",fontSize:"15px",padding:1,marginRight:"30px"}} onClick={handleUpdate}>EDIT</Button>
                        <Button variant="contained" color="error" sx={{fontWeight:"bold",fontSize:"15px", padding:1}} onClick={handleClick}>CANCEL</Button>
                    </Grid>
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
        </>
    )

}

export default UpdateJob;