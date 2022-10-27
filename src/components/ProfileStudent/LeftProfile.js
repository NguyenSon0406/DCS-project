import React, { Component } from "react";
import './LeftProfile.css';
class LeftProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className="leftp-container">
                    <div className="leftp-content-left">

                    </div>
                    <div className="leftp-content-right">
                        <div className="name">Son Nguyen</div>
                    </div>
                </div>
            </>
        );
    }
}

export default LeftProfile;
