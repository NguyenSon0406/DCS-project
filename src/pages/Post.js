import React, {useRef} from "react";
import PostCard from "../components/PostCard";
const Post = (props) => {
    // const inputElement = useRef("");
    // const getSearchTerm = () => {
    //     props.searchKeyword(inputElement.current.value);
    // }
    const renderContactList = ()=> {
        return <PostCard props="someprops"/>
    };
    return(
        <div className="main">
            <div className="content" >
                <div className="ui search">
                    <div className="ui icon input">
                        <input type="text" 
                        placeholder="Search" 
                        className="prompt" 
                        />
                        <i className="search icon"/>
                    </div>
                </div>
                <div>
                <div className="ui celled list">{renderContactList}</div>
                </div>
            </div>
        </div>
    );
}

export default Post;