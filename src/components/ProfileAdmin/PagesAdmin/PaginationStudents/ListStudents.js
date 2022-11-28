import React, { Component } from "react";
import ViewStudents from './ViewStudents';

class ListStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let { dataStd } = this.props;
        return (
            <div className="list-student">
                <table>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Roles</th>
                            <th>Gender</th>
                            <th>Birthday</th>
                            <th>Action</th>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            {dataStd.map((item, index) => {
                                return (
                                    <ViewStudents
                                        key={index}
                                        data={item}
                                    />
                                )
                            })}
                        </tr>
                    </table>
                </table>
            </div>
        );
    }
}

export default ListStudents;
