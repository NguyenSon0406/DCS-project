import * as React from 'react';
import {useState, useEffect} from 'react'
import '../ArticleList/ArticleList.css';
import PostCard from '../PostCard/PostCard'
import InfoIcon from '@mui/icons-material/Info';
import  { Box,CircularProgress,Typography,Pagination, Stack } from '@mui/material';
import { red } from '@mui/material/colors';
import axios from 'axios'
export default function MyArticle() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('accessToken');
  const [progress, setProgress] = useState(0);
   const [open, setOpen]=useState(true);

   useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? setOpen(false) : prevProgress + 5));
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const renderPostList = posts.sort((a,b) => {
    return new Date(b.createdAt) - new Date (a.createdAt)
    })
    .map((post) => {
         return <PostCard post = {post}
         key = {post.id} {...post}/>
  });
  
  useEffect(() =>{  
      if(token)
      {
        const getAllPosts= async() => {
          const response = await axios.get("/post/mypost",{
            headers: {Authorization: token}
          });
          setPosts(response.data);
      }
      getAllPosts();
      }
    },[])
    return (
      <>
     <div id='root'>
        <div className='container2 my-3'>
            <div className='text-center headline'>
                <h1>My Article</h1>
            </div>
        
          <div className='row'>
            {
              
              (open) ?
                    (<Box sx={{width:"100%",alignItems:"center" , textAlign:"center",justifyContent:"center", display:"flex",marginTop:"50px" }}>
                    <CircularProgress variant="determinate" value={progress} />
                    <Typography sx={{marginLeft:"10px",fontSize:"40px"}}>Loading Data...</Typography>                                                                                                                                                                                                 
                    </Box>) :  
                    (renderPostList.length > 0 ?
                      renderPostList:
                    <Box sx={{width:"100%", alignItems:"center",textAlign:"center",justifyContent:"center", display:"flex", marginTop:"20px"}}>
                        <InfoIcon fontSize='large' sx={{color: red[500]}}/>
                        <Typography sx={{marginLeft:"10px",fontSize:"25px", color:"#9e9e9e"}}> No Article Available!</Typography>  
                    </Box>)
                
            }
          </div>
          </div>
      </div>
      <Stack sx={{
      marginBottom: 4,
      textAlign:"center", 
      justifyContent:"center",
      width:"100%",
      display:"flex",
      alignItems:"center"}} spacing={2}>
      <Pagination count={10} color="primary" />   
    </Stack>
      </>
      
    );
  }