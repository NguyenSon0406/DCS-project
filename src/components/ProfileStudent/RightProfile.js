import React from "react";


import './RightProfile.css';
function RightProfile(props) {
    const {email,contact,dayofbirth,gender,address,className,falculty}= props.auth;
    const convertDatetoString = (date) => {
        let timestamp = new Date(date).getTime();
        let day = new Date(timestamp).getDate();
        let month = new Date(timestamp).getMonth()+1;
        let year = new Date(timestamp).getFullYear(); 
        let newDateFormat = `${day}/${month}/${year}`;
        return newDateFormat;  
    }
        return (
            <>
                <div className="rightp-containter">
                    <div className="label-content">
                        <div className="label-left">
                            <div>Email:</div>
                            <div>Phone:</div>
                            <div>Birthday:</div>
                            <div>Gender:</div>
                            <div>Address:</div>
                            <div>Class:</div>
                            <div>Falculty:</div>
                        </div>
                        <div className="label-right">
                            <div>{email}</div>
                            <div>{contact}</div>
                            <div>{convertDatetoString(dayofbirth)}</div>
                            <div>{gender}</div>
                            <div>{address}</div>
                            <div>{className}</div>
                            <div>{falculty}</div>
                        </div>
                    </div>
                </div>
            </>
        );
}

export default RightProfile;
