import React, { Component } from "react";
import './BookMark.css';

class TabBookmark extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let { data } = this.props;
        return (
            <div className="bookmark-container">
                {data}
            </div>
        );
    }
}

export default TabBookmark;
