import React from "react";


import './RightProfile.css';
function RightProfile(props) {
    const {email,contact,gender,className,falculty}= props.auth;
        return (
            <>
                <div className="rightp-containter">
                    <div className="label-content">
                        <div className="label-left">
                            <div>Email:</div>
                            <div>Phone:</div>
                            <div>Gender:</div>
                            <div>Class:</div>
                            <div>Falculty:</div>
                        </div>
                        <div className="label-right">
                            <div>{email}</div>
                            <div>{contact}</div>
                            <div>{gender}</div>
                            <div>{className}</div>
                            <div>{falculty}</div>
                        </div>
                    </div>
                </div>
            </>
        );
}

export default RightProfile;
