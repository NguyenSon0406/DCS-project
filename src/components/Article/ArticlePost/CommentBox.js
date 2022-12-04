import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CommentBox() {
  const auth = useSelector(state => state.auth)
  const {user} = auth;

  const [data] = useState([]);

  return (
    <div className="CommentBox">
      <CommentSection
        customNoComment={() => {
          return <div>No comments</div>;
        }}
        currentUser={{
          currentUserId: "01a",
          currentUserImg: user.avatar,
          currentUserProfile:
            "https://www.linkedin.com/in/riya-negi-8879631a9/",
          currentUserFullName: "Nguyễn Sơn"
        }}
        advancedInput={true}
        hrStyle={{ border: "0.5px solid #ff0072"}}
        commentData={data}
        logIn={{
          loginLink: "http://localhost:3001/",
          signupLink: "http://localhost:3001/"
        }}
        customImg={user.avatar}
        inputStyle={{ border: "1px solid rgb(208 208 208)" }}
        formStyle={{ backgroundColor: "white",width:"auto", margin: 0 }}
        submitBtnStyle={{
          border: "1px solid black",
          backgroundColor: "black",
          padding: "7px 15px"
        }}
        cancelBtnStyle={{
          border: "1px solid gray",
          backgroundColor: "gray",
          color: "white",
          padding: "7px 15px"
        }}
        replyInputStyle={{ borderBottom: "1px solid black", color: "black" }}
      />
    </div>
  );
}
