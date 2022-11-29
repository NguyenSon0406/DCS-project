import React, { Component } from "react";
import Slidebar from "./Slidebar";
import './HomeProfileAdmin.css';
import axios from "axios";
class HomeProfileAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    handleLogout = () => {
        try {
            localStorage.removeItem('accessToken')
            axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
            } catch (err) {
              window.location.href = "/";      
            }
        }
    render() {
        return (
            <>
                <section className="slidebar-section">
                    <div className="slidebar-left">
                        <img className="slidebar-logo" src="/image/logo.png"/>
                        <Slidebar />
                        <div className="slidebar-btn">
                            <button className="slidebar-btn-logout" onClick={this.handleLogout}>
                                <i className="fas fa-arrow-right-from-bracket"></i>
                                Logout
                            </button>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default HomeProfileAdmin;
