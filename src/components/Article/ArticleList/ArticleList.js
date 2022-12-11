import * as React from 'react';
import {useState} from 'react'
import Pagination from '@mui/material/Pagination';
import {Box, Grid, ThemeProvider, Typography, Button,Paper, Divider, Chip, IconButton,Menu, MenuItem,Tooltip} from "@mui/material"
import Stack from '@mui/material/Stack';
import './ArticleList.css';
import Data from '../DummyData'
import { Link } from 'react-router-dom';
import PostCard from '../PostCard/PostCard'
export default function ArticleList() {
    const [skills, setSkills] = useState(["MongoDb","NodeJS"]);
    return (
      <>
      <div id='root'>
        <div class='container2 my-3'>
            <div className='text-center headline'>
                <h1>Article</h1>
            </div>
        
      <div className='row'>
        {
        Data.map((post)  =>(
        <PostCard post = {post}
        key = {post.id} {...post}/>
    ))
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