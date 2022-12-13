import React,{useState, useEffect} from 'react';
import Pagination from '@mui/material/Pagination';
import {Box, Grid, ThemeProvider, Typography, Button,Paper, Divider, Chip, IconButton,Menu, MenuItem,Tooltip} from "@mui/material"
import Stack from '@mui/material/Stack';
import './ArticleList.css';
import Data from '../DummyData'
import { Link } from 'react-router-dom';
import PostCard from '../PostCard/PostCard'
import axios from 'axios';
export default function ArticleList() {
    const [skills, setSkills] = useState(["MongoDb","NodeJS"]);
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem('accessToken');
    const renderJobList = posts.sort((a,b) => {
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
        renderJobList.length > 0 ?
        renderJobList: "No Post Available"
        }
      </div>
      </div>
      </div>
      <Stack sx={{marginLeft: 100, marginBottom: 4}} spacing={2}>
      <Pagination count={10} color="primary" />   
    </Stack>
      </>
      
    );
  }