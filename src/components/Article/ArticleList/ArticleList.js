import * as React from 'react';
import {useState, useEffect} from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './ArticleList.css';
import PostCard from '../PostCard/PostCard'
import axios from 'axios'
export default function ArticleList() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('accessToken');
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
          const response = await axios.get("/post/list-post",{
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
        <div class='container2 my-3'>
            <div className='text-center headline'>
                <h1>Article</h1>
            </div>
        
      <div className='row'>
        {
          renderPostList.length > 0 ?
          renderPostList: "No Post Available"
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