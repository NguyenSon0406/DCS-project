import React, { Component } from "react";
import './RightProfile.css';
class RightProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className="rightp-containter">
                    <div className="label-content">
                        <div className="label-left">
                            <div>Phone:</div>
                            <div>Email:</div>
                            <div>Birthday:</div>
                            <div>Gender:</div>
                            <div>Address:</div>
                            <div>Falculty:</div>
                            <div>Class:</div>
                        </div>
                        <div className="label-right">
                            <div>0123456789</div>
                            <div>nguyenson062001@gmail.com</div>
                            <div>06/2001</div>
                            <div>Female</div>
                            <div>Quang Nam</div>
                            <div>CMU</div>
                            <div>K25</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default RightProfile;
