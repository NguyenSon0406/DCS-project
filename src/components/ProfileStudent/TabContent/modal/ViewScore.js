import React, { Component } from "react";
import './ViewScore.css';

class ViewScore extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        let arrScore = [
            { id: "Fundamentals Of Computing 1", value: "A" },
            { id: "Fundamentals Of Computing 2", value: "B+" },
            { id: "Requirements Engineering", value: "A-" },
            { id: "CDIO", value: "A" }
        ]
        return (
            <div className="view-score-container">
                {
                    arrScore.map((item, index) => {
                        return (
                            <div className="view-score-content">
                                <div className="title-score">{item.id}</div>
                                <div className="grade-score">{item.value}</div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}


export default ViewScore;
