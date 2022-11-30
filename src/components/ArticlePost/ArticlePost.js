import React,{useState} from 'react'
import './ArticlePost.css';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentBox from "./CommentBox";
import { DeletePost } from './DeletePost';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Box, Grid, ThemeProvider, Typography, Button,Paper, Divider, Chip, IconButton,Menu, MenuItem,Tooltip} from "@mui/material"
import { useLocation,Link } from 'react-router-dom';
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
      // const {id,title,type,address,location,image,companyName,postedOn,skills,jobDescription,companyUrl} = getLocation.state.job;
    return (
      <>
      <div class="left-content grid-66">
        <article class="main-article boxed ">
            <header>
                <h1 class="title large bold text-primary">Cẩm nang sử dụng Figma hiệu quả dành cho UI/UX Designer </h1>
            </header>
            <Box>
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
                                <MenuItem>
                                  <EditIcon sx={{ fontSize: 18,marginRight:"5px" }}/>Edit
                                  
                                </MenuItem>
                              </Menu>
                          </Box>
            <div class="post-content__author_meta">
                <div class="post-author">
                    <img src="https://img.freepik.com/premium-vector/ukrainian-sunflower-shaped-flag-avatar-sunflower-symbol-ukraine-is-blue-yellow_549857-156.jpg" alt="avatar" style={{verticalAlign:"middle",margin:0, width:"50px", height:"50px",borderRadius:"50%"}}/>
                    <a>Nguyễn Sơn</a>
                </div>
                <div class="text-muted">
                    <p>Đã đăng 1 giờ trước</p>
                </div>
            </div>
            <section class="post-content">
                <div class="post-format-image post-format-wrapper ">
                    <div class="fullimage">
                        <img class="cover" src="https://cdn.sforum.vn/sforum/wp-content/uploads/2021/12/FIGMA-bg.jpg" alt="img"></img>
                    </div>
                </div>
                <div class="text">
                    <p>
                    Tuy Sketch đã có mặt từ lâu, nhưng gần đây Figma đang dần trở thành công cụ thiết kế UI/ UX phổ biến hơn cả. Do đó, sử dụng Figma thành thạo có thể mang đến cho bạn lợi thế cạnh tranh lớn trong cuộc đua tìm việc làm “chất”.

UI/ UX Designer đang là một trong những vị trí hot trên thị trường IT với tỉ lệ cạnh tranh cao. Để trở thành người được “săn đón”, bạn không chỉ cần những tố chất cần có của một UI/ UX Designer, mà còn cần sử dụng thành thạo những công cụ tiện ích như Figma để công việc dễ dàng và hiệu quả hơn.

Dù bạn mới tìm hiểu hoặc đã biết Figma là gì bài viết này sẽ cung cấp những định hướng hữu ích để bạn có thể bắt đầu sử dụng Figma ngay hôm nay!

                    </p>
                </div>
            </section>
        </article>
      </div>
      <StrictMode>
    <CommentBox />
  </StrictMode>
  <DeletePost openPopup = {openPopup}
        setOpenPopup={setOpenPopup}/>
      </>
    )
}


