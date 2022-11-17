import React, { Component } from "react";
import Bookmark from './BookMark';
import './ListBookmark.css';

class ListStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let { coisnsData } = this.props;
        return (
            <div className="list-book-mark">
                {coisnsData.map((item, index) => {
                    return (
                        <Bookmark
                            key={index}
                            data={item}
                        />
                    )
                })}
            </div>
        );
    }
}

export default ListStudents;
