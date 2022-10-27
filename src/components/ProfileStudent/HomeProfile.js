import React, { Component } from "react";
import './HomeProfile.css';
import LeftProfile from "./LeftProfile";
import RightProfile from "./RightProfile";
import TabProfile from "./TabProfile";

class HomeProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className="home-title">
                    My Profile
                </div>
                <div className="content-up">
                    <div className="border-content">
                        <div className="content-left">
                            <LeftProfile />
                        </div>
                        <div className="content-right">
                            <RightProfile />
                        </div>
                    </div>
                </div>
                <div className="content-down">
                    <TabProfile />
                </div>
            </div>
        );
    }
}

export default HomeProfile;
