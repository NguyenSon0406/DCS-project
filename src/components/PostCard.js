import React from 'react';
import { Link } from 'react-router-dom';
import user from "../images/user.png"
const PostCard = (props) => {
    return (
        <div className="item" style={{display:"flex",padding:"10px"}}>
            <img className='ui avatar image' src={user} alt="user"/>
            <div className="content" style={{width:"1150px"}}>
                <Link to="/">
                    <div className="header">Son</div>
                    <div>nguyenson@gmail.com</div>
                </Link>
            </div>
            <div style={{display:"flex" ,paddingRight:"0px"}}>        
            </div>
        </div>
    );  
};

export default PostCard;

{/* <Link to={`/edit/${id}`} state = {{ contact: props.contact}}>
<i className="edit alternate outline icon"
    style={{color:"blue", marginTop: "8px",marginRight: "10px"}}
    ></i>
</Link>
<i className="trash alternate outline icon"
    style={{color:"red", marginTop: "8px",paddingRight:"0px"}}
    onClick={() => props.clickHander(id)}
    ></i> */}