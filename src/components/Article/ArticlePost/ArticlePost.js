import React,{useState} from 'react'
import './ArticlePost.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentBox from "./CommentBox";
import { DeletePost } from '../DeletePost/DeletePost';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Box, Grid, ThemeProvider, Typography, Button,Paper, Divider, Chip, IconButton,Menu, MenuItem,Tooltip} from "@mui/material"
import { useLocation,Link } from 'react-router-dom';
import ConvertToHTML from "react-html-parser";
export default function ArticleList() {
    const rootElement = document.getElementById("root");
    const root = createRoot(rootElement);
    const getLocation = useLocation(); 
    const [openPopup, setOpenPopup] = useState(false);
    const [anchorElSetting, setAnchorElSetting] = useState(null);
    const handleOpenSetting = (event) => {
        setAnchorElSetting(event.currentTarget);
      };
      const handleCloseSetting = () => {
        setAnchorElSetting(null);
      };
      const {_id,user_id,title,name,skills,img,avatar,description,createdAt} = getLocation.state.post;
      const convertDay= (userbirthday) => {
        const birthday = new Date(userbirthday).toISOString().slice(0,10)
        return birthday;
    }
      return (
      <>
      <div class="left-content grid-66">
        <article class="main-article boxed ">
            <header>
                <h1 class="title large bold text-primary">{title}</h1>
            </header>
            <Box sx={{float:'right'}}>
                           <Tooltip title="Setting" arrow >
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
                                <MenuItem>
                                <Link to={`/home/post/edit/${_id}`} state={{edit:{_id,title,img,skills,description}}}> 
                                  <EditIcon sx={{ fontSize: 18,marginRight:"5px" }}/>Edit
                                </Link> 
                                  
                                </MenuItem>
                              </Menu>
                          </Box>
            <div class="post-content__author_meta">
                <div class="post-author">
                    <img src={avatar} alt="avatar" style={{verticalAlign:"middle",margin:0, width:"50px", height:"50px",borderRadius:"50%"}}/>
                    <a>{name}</a>
                </div>
                <div class="text-muted">
                  
                    <p>{convertDay(createdAt)}</p>
                    
                </div>
            </div>
            <div class="posttag">
                        {
                                skills.map((skill) => (
                                  <Chip label={skill} color="primary" size='small'
                                    sx={{fontWeight:"bold",fontSize:"10px",marginRight:"5px"}}
                                  />
                                ))
                              }
            </div>
            <section class="post-content">
                <div class="post-format-image post-format-wrapper ">
                    <div class="fullimage">
                        <img class="cover" src={img} alt="img"></img>
                    </div>
                </div>
                <div class="text">
                    <p>
                    {ConvertToHTML(description)}
                    </p>
                </div>
            </section>
        </article>
      </div>
      <StrictMode>
    <CommentBox />
  </StrictMode>
  <DeletePost id={_id} openPopup = {openPopup} 
        setOpenPopup={setOpenPopup}/>
      </>
    )
}


