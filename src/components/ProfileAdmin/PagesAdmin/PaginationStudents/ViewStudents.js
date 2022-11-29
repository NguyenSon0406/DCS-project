import React, { Component } from "react";

class ViewStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let { data } = this.props;
        return (
            <div className="">
                <td>{data.id}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.roles}</td>
                <td>{data.gender}</td>
                <td>{data.birthday}</td>
                <td>
                    <button className="btn-delete-student">
                        <i className="fas fa-trash-can"></i>
                    </button>
                    <button className="btn-view-student">
                        <i className="fas fa-magnifying-glass"></i>
                    </button>
                </td>
            </div>
        );
    }
}

export default ViewStudents;
