import React, { useState } from "react";
import "./ArticlePost.css";
import { StrictMode } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentBox from "./CommentBox";
import { DeletePost } from "../DeletePost/DeletePost";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import ConvertToHTML from "react-html-parser";
import { useSelector } from "react-redux";
export default function ArticleList() {
  const auth = useSelector(state => state.auth)
  const {user} = auth;
  const getLocation = useLocation();
  const { _id, user_id, title, name, skills, img, avatar, description, createdAt } =
    getLocation.state.post;
  const [openPopup, setOpenPopup] = useState(false);
  const [anchorElSetting, setAnchorElSetting] = useState(null);
  const handleOpenSetting = (event) => {
    setAnchorElSetting(event.currentTarget);
  };
  const handleCloseSetting = () => {
    setAnchorElSetting(null);
  };
  const [likes, setLikes] = useState(100);
  const [isClicked, setIsClicked] = useState(false);
  const [isMark, setIsMark] = useState(false)
  const handleClick = () => {
    if (isClicked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsClicked(!isClicked);
  };
  const handleBookmark = () => {
    setIsMark(!isMark)
  }
  const convertDay = (userbirthday) => {
    const birthday = new Date(userbirthday).toISOString().slice(0, 10);
    return birthday;
  };
  return (
    <>
      <div className="body">
        <div className="left-content grid-66">
          <article className="main-article boxed">
            <Box sx={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            borderRadius:"10px",
            padding:"10px"
          }}>
            <header style={{display:"flex", justifyContent:"space-between"}}>
            <div className="post-author">
              <img
                    src={avatar}
                    alt="avatar"
                    style={{
                      verticalAlign: "middle",
                      margin: 0,
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
             <div className="author-name">
              <a href="#">{name}</a>
              <p>{convertDay(createdAt)}</p>
             </div>
            </div>
              {user_id === user.user_id 
              ?      <Box sx={{ float: "right" }}>
              <Tooltip title="Setting" arrow>
                <IconButton onClick={handleOpenSetting} size="small">
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "25px" }}
                id="menu-appbar"
                anchorEl={anchorElSetting}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElSetting)}
                onClose={handleCloseSetting}
              >
                <MenuItem onClick={() => setOpenPopup(true)}>
                  <DeleteIcon sx={{ fontSize: 18, marginRight: "5px" , color:"#f44336"}} />
                  <Typography sx={{color:"#f44336"}}>Delete</Typography>
                </MenuItem>
                <MenuItem>
                  <Link
                    to={`/home/post/edit/${_id}`}
                    state={{ edit: { _id, title, img, skills, description } }}
                  >
                    <EditIcon sx={{ fontSize: 18, marginRight: "5px" }} />
                    Edit
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            : ""}
            </header>
            <div className="post-content__author_meta">
                <h1 className="title large bold">{title}</h1>
            </div>
            <div className="posttag">
                <Typography sx={{color: "#757575", fontSize:"17px"}}>Tags:</Typography>
              {skills.map((skill) => (
                <Chip
                  label={skill}
                  color="primary"
                  sx={{
                    fontWeight:'bold',
                    fontSize: "12px",
                    marginRight: "5px",
                  }}
                />
              ))}
            </div>
            <section className="post-content">
              <div className="post-format-image post-format-wrapper ">
                <div className="fullimage">
                  <img className="cover" src={img} alt="img"/>
                </div>
              </div>
              <div className="text">
                <p>{ConvertToHTML(description)}</p>
                  <div style = {{display:"flex"}}>
                  {!isClicked ? (
                  <Button
                    className={`like-button ${isClicked && "liked"}`}
                    onClick={handleClick}
                    variant="contained"
                    color="action"
                  >
                    <ThumbUpIcon />
                    <span
                      className="likes-counter"
                      style={{
                        fontWeight: "bold",
                        padding: "5px",
                        paddingRight: "10px",
                      }}
                    >{`Like | ${likes}`}</span>
                  </Button>
                ) : (
                  <Button
                    className={`like-button ${isClicked && "liked"}`}
                    onClick={handleClick}
                    variant="contained"
                  >
                    <ThumbUpIcon />
                    <span
                      className="likes-counter"
                      style={{ fontWeight: "bold", padding: "5px" }}
                    >{`Liked | ${likes}`}</span>
                  </Button>
                )}
                {!isMark ? 
                 <Button
                  onClick={handleBookmark}
                  variant="contained"
                  color="action"
                  sx={{marginLeft:"10px"}}>
                  <BookmarkIcon/>
                  <span
                        className="bookmark-counter"
                        style={{
                          fontWeight: "bold",
                          padding: "5px",
                          paddingRight: "10px",
                        }}
                      >Bookmark</span>
                 </Button>
                 : <Button variant="contained"
                  onClick={handleBookmark}
                  sx={{marginLeft:"10px"}}>
                 <BookmarkIcon/>
                 <span
                        className="bookmark-counter"
                        style={{
                          fontWeight: "bold",
                          padding: "5px",
                          paddingRight: "10px",
                        }}
                      >Delete this bookmark</span>
                 </Button>}
                  </div>
              </div>
            </section>
            </Box>
          </article>
        </div>
      </div>

      <StrictMode>
        <CommentBox />
      </StrictMode>
      <DeletePost id={_id} openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </>
  );
}
