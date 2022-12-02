import React,{ useState, useEffect } from 'react'
import './PostCard.css';
import { Chip } from '@mui/material';
import { Link } from 'react-router-dom';
const PostCard =(props) => {
    // const[jobs, setJob] = useState([]);
const shortDescripstion = (props) =>{
    const shortDes = props.slice(0,95)
    return shortDes
}      
    return (
        <>
            <div class="col-md-4">
            <div class="my-3">
                <div class="card-item">
                    <img class="card-img-top" src={props.image} alt=''></img>
                    <div class="card-body">
                    <h5 class="card-title">{props.title}</h5>
                    <div class="post-meta--inline">
                        <div class="d-inline-flex ">
                            <img src="https://img.freepik.com/premium-vector/ukrainian-sunflower-shaped-flag-avatar-sunflower-symbol-ukraine-is-blue-yellow_549857-156.jpg" alt="avatar" style={{verticalAlign:"middle",margin:0, width:"25px", height:"25px",borderRadius:"50%"}}/>
                            <a>Nguyễn Sơn</a>
                        </div>
                        <div class="daytime">
                            <p>{props.postedOn}</p>
                        </div>
                    </div>
                    <p class="card-text">{shortDescripstion(props.jobDescription)}...</p>
                    <div>
                        {
                                props.skills.map((skill) => (
                                  <Chip label={skill} color="primary" size='small'
                                    sx={{fontWeight:"bold",fontSize:"10px",marginRight:"5px"}}
                                  />
                                ))
                              }
                        </div> 
                        <Link to="/home/post/readmore">
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
