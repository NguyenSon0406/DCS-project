import React, { Component } from "react";
import './Sliderbar.css';
import { Link, NavLink } from "react-router-dom";


let pathData = [
    {
        title: "Dashboard",
        path: "/",
        icon: <i className="fas fa-gauge-high"></i>
    },
    {
        title: "Student",
        path: 'admin/students',
        icon: <i className="fas fa-user-graduate"></i>
    },
    {
        title: "Companies",
        path: 'admin/companies',
        icon: <i className="fas fa-building"></i>
    },
    {
        title: "Request",
        path: 'admin/request',
        icon: <i className="fas fa-file-pen"></i>
    }
]
class Sliderbar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="slidebar-container" >
                {
                    pathData.map((item, index) => {
                        return (
                            <div key={index} className="slidebar-item">
                                <Link to={item.path} className="nav-link">
                                    <span className="slidebar-icon">{item.icon}</span>
                                    <span className="slidebar-text">{item.title}</span>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Sliderbar;
