import React, { Component } from "react";
import './TabJobs.css';
import {connect} from "react-redux"
import convertHTMLToText from "react-html-parser";

class TabJobs extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
              
                <div
                    className="view-description"
                >
                    {convertHTMLToText(this.props.userData.description)}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      userData: state.auth.user,
    };
  };

export default connect(mapStateToProps)(TabJobs);
