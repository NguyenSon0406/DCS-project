import React, { Component } from "react";
import Slidebar from "./Slidebar";
import './HomeProfileAdmin.css';

class HomeProfileAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <section className="slidebar-section">
                    <div className="slidebar-left">
                        <Slidebar />
                        <div className="slidebar-btn">
                            <button className="slidebar-btn-logout">
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
