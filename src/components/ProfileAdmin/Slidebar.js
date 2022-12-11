import React from "react";
import './Sliderbar.css';
import { Link, useLocation} from "react-router-dom";


let pathData = [
    {
        title: "Dashboard",
        path: "admin/dashboard",
        icon: <i className="fas fa-gauge-high"></i>
    },
    {
        title: "Student",
        path: 'admin/students',
        icon: <i className="fas fa-user-graduate"></i>
    },
    {
        title: "Company",
        path: 'admin/companies',
        icon: <i className="fas fa-building"></i>
    },
    {
        title: "Post",
        path: 'admin/request',
        icon: <i className="fas fa-file-pen"></i>
    }
]
function Sliderbar (){
        const location = useLocation();
        let url = location.pathname.slice(6);
        return (
            <div className="slidebar-container" >
                {
                    pathData.map((item, index) => {
                        return (
                            <div key={index} className={`slidebar-item ${item.path === url ? 'active' : ''}`}>
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

export default Sliderbar;
