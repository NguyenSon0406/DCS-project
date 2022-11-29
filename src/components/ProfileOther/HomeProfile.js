import React, {Component } from "react";
import './HomeProfile.css';
import LeftProfile from "./LeftProfile";
import RightProfile from "./RightProfile";
import TabProfile from "./TabProfile";
import { useSelector } from "react-redux";
import {connect} from "react-redux"

class HomeProfile extends Component {
    constructor(props) {
        super(props);
      }
    render(){
        return (
            <div>
            <img src='/image/DTUConnection_banner.png' alt='duytan-banner' style={{marginTop:0,width:"100%",height:"200px",marginBottom:0}}/>
                <div className="content-up">
                    <div className="border-content">
                        <div className="content-left">
                          <LeftProfile auth={this.props.userData} />
                        </div>
                        <div className="content-right">
                            <RightProfile auth={this.props.userData} />
                        </div>
                    </div>
                </div>
                <div className="content-down">
                    <TabProfile auth={this.props.userData}/>
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

export default connect(mapStateToProps)(HomeProfile);
