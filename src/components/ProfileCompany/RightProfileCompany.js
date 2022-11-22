import React from "react";
import './RightProfileCompany.css';
function  RightProfileCompany(props) {
    const {email,contact}= props.auth;
        return (
            <>
                <div className="rightp-containter-company">
                    <div className="label-content-company">
                        <div className="label-left-company">
                            <div>Phone:</div>
                            <div>Email:</div>
                        </div>
                        <div className="label-right-company">
                            <div>{contact}</div>
                            <div>{email}</div>
                        </div>
                    </div>
                </div>
            </>
        );
}

export default RightProfileCompany;
