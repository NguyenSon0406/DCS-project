import React from 'react'
import './PostCard.css';
import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import ConvertToHTML from "react-html-parser";
const PostCard =(props) => {
    const {title,img,avatar,name,createdAt,skills,description} = props.post
    const convertDay= (userbirthday) => {
        const birthday = new Date(userbirthday).toISOString().slice(0,10)
        return birthday;
    }
    const id = props.post._id;
const shortDescripstion = (string) =>{
    const text = ConvertToHTML(string).valueOf();
    const shortDes = text[0].props.children[0].slice(0,95);
    return shortDes;
}      
    return (
        <>
            <div class="col-md-4">
            <div class="my-3">
                <div class="card-item">
                    <img class="card-img-top" src={img} alt=''></img>
                    <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <div class="post-meta--inline">
                        <div class="d-inline-flex ">
                            <img src={avatar} alt="avatar" style={{verticalAlign:"middle",margin:0, width:"25px", height:"25px",borderRadius:"50%"}}/>
                            <a>{name}</a>
                        </div>
                        <div class="daytime">
                            <p>{convertDay(createdAt)}</p>
                        </div>
                    </div>
                    <p class="card-text" style={{display:"flex"}}>{shortDescripstion(description) } ...</p>
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
                            <a target="_blank" class="btn btn-sm btn-primary">Read More </a>
                        </Link>
                </div>
                </div>    
            </div>
        </div>
        </>
  )
}

export default PostCard;