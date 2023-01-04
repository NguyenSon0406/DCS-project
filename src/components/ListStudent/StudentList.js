import React,{ useState, useEffect } from 'react'
import StudentCard from './StudentCard';
import InfoIcon from '@mui/icons-material/Info';
import  { Box,CircularProgress,Typography } from '@mui/material';
import { red } from '@mui/material/colors';
const StudentList =(props) => {
    const [progress, setProgress] = useState(0);
    const [open, setOpen]=useState(true);
    let [renderStudentList, setStudentList] = useState([]);
    useEffect(() => {
     const timer = setInterval(() => {
       setProgress((prevProgress) => (prevProgress >= 100 ? setOpen(false) : prevProgress + 5));
     }, 100);
 
     return () => {
       clearInterval(timer);
     };
   }, []);

   renderStudentList = props.students.sort((a,b) => {
    return b.numPost - a.numPost
   }).map((student, index) => {
    return <StudentCard student = {student}
    key = {index} {...student}/>
    });
    //  props.students.map((student, index) => {
    //   return <StudentCard student = {student}
    //   key = {index} {...student}/>
    //   })
    useEffect(() => {
      const updateList = () => {
        if(props.typeSort === 1)
        {
           setStudentList([...props.students].sort((a,b) => {
            return a.user_id.firstName.localeCompare(b.user_id.firstName)
          }).map((student, index) => {
            return <StudentCard student = {student}
            key = {index} {...student}/>
            }))
        }
        else {
          setStudentList([...props.students].sort((a,b) => {
            return b.numPost - a.numPost
           }).map((student, index) => {
            return <StudentCard student = {student}
            key = {index} {...student}/>
            }))
        }
        props.passUpdateSort();
      }
      updateList()
    },[props])
    return (
        <>
         { (open) ?
                (<Box sx={{width:"100%",alignItems:"center" , textAlign:"center",justifyContent:"center", display:"flex",marginTop:"50px" }}>
                <CircularProgress variant="determinate" value={progress} />
                <Typography sx={{marginLeft:"10px",fontSize:"40px"}}>Loading Data...</Typography>                                                                                                                                                                                                 
                </Box>) :  
                (renderStudentList.length > 0 ? renderStudentList :
                <Box sx={{width:"100%", alignItems:"center",textAlign:"center",justifyContent:"center", display:"flex", marginTop:"20px"}}>
                    <InfoIcon fontSize='large' sx={{color: red[500]}}/>
                    <Typography sx={{marginLeft:"10px",fontSize:"25px", color:"#9e9e9e"}}>No Suitable Students!</Typography>  
                </Box>)
             }
        </>
  )
}

export default StudentList;
