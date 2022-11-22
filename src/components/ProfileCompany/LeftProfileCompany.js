import React from "react";
import './LeftProfileCompany.css';
function LeftProfileCompany(props) {
    const {avatar,companyName,address} = props.auth;
        return (
            <>
                <div className="left-pf-company-container">
                    <div className="left-pf-company-content-left">
                        <img src={avatar} alt="avatar" 
                            style={{
                                verticalAlign:"middle",
                                margin:0, width:"150px", 
                                height:"150px",
                                borderRadius:"50%",
                                justifyContent:"center"}}/>
                    </div>
                    <div className="left-pf-company-content-right">
                        <div className="name">{companyName}</div>
                        <div className="address">Address: {address}</div>
                    </div>
                </div>
            </>
        );
    
}

export default LeftProfileCompany;
