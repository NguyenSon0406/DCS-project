import React from 'react'
import './PostCard.css';
import { Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import ConvertToHTML from "react-html-parser";
const PostCard =(props) => {
    const {title,img,avatar,name,createdAt,skills,description} = props.post
    const convertDay= (userbirthday) => {
        const birthday = new Date(userbirthday).toISOString().slice(0,10)
        return birthday;
    }
    const id = props.post._id;
    return (
        <>
            <div className="col-md-4">
            <div className="my-3">
                <div className="card-item">
                    <img className="card-img-top" src={img} alt='image post' />
                    <div className="card-body">
                        <div className="card-title"><h5 className='title'>{title}</h5></div>
                        <div className="post-meta--inline">
                            <div className="d-inline-flex ">
                                <img src={avatar} alt="avatar" style={{verticalAlign:"middle",margin:0, width:"40px", height:"40px",borderRadius:"50%"}}/>
                                <a href='#'>{name}</a>
                            </div>
                            <div className="daytime">
                                <p>{convertDay(createdAt)}</p>
                            </div>
                        </div>
                    <div className="card-text"><p>{ConvertToHTML(description)}</p></div>
                    <div>
                        {
                                skills.map((skill) => (
                                  <Chip label={skill} color="primary" size='small'
                                    sx={{fontWeight:"bold",fontSize:"10px",marginRight:"5px"}}
                                  />
                                ))
                              }
                        </div> 
                <Link to={`/home/post/readmore/${id}`} state = {{ post: props.post}}>    
                            <Button variant='contained' sx={{fontWeight:"bold" , marginTop:"10px"}}>Read More </Button>
                        </Link>
                </div>
                </div>    
            </div>
        </div>
        </>
  )
}

export default PostCard;