import React,{ useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import './Companies.css';

function Companies() {
        const token = localStorage.getItem('accessToken');
        const [arrCompanies, setArrCompanies] = useState([]);
        useEffect(() =>{
            if(token)
            {
              const getAllCompany= async() => {
                const response = await axios.get("/admin/list-company",{
                  headers: {Authorization: token}
                });
                setArrCompanies(response.data);
            }
            getAllCompany();
            }
        })
        return (
            <>
                <div className="companies-container">
                    <div className="nav-page-admin">
                        <div className="text-title-companies">Companies</div>
                        {
                            arrCompanies && arrCompanies.map((item, index) => {
                                return (
                                    <div className="item-companies" key={index}>
                                        <div className="item-companies-left">
                                            <img src={item.avatar} style={{width:"70px",height:"70px"}}/>
                                        </div>
                                        <div className="item-companies-right">
                                            <div className="item-name-companies">{item.companyName}</div>
                                            <div className="item-btn-companies">
                                                <Button
                                                    variant="contained"
                                                    sx={{cursor:"pointer", marginRight:"15px", padding:1.5}}
                                                    color='error'
                                                    >
                                                    <i className="fas fa-trash-can"></i>
                                                </Button>
                                                <Button              
                                                                                                                
                                                    sx={{cursor:"pointer", marginRight:"15px", padding:1.5}}
                                                    variant="contained">
                                                    <i className="fas fa-magnifying-glass"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        );
    }

export default Companies;
