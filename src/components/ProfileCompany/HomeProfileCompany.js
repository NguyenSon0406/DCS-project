import React, { Component } from "react";
import './HomeProfileCompany.css';
import LeftProfileCompany from './LeftProfileCompany';
import RightProfileCompany from './RightProfileCompany';
import TabProfileCompany from './TabProfileCompany';
import {connect} from "react-redux"

class HomeProfileCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className="home-title">
                    Company Profile
                </div>
                <div className="content-up">
                    <div className="border-content">
                        <div className="content-left">
                            <LeftProfileCompany auth={this.props.userData} />
                        </div>
                        <div className="content-right">
                            <RightProfileCompany auth={this.props.userData} />
                        </div>
                    </div>
                </div>
                <div className="content-down">
                    <TabProfileCompany auth={this.props.userData}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      userData: state.auth.user,
    };
  };

export default connect(mapStateToProps)(HomeProfileCompany);
