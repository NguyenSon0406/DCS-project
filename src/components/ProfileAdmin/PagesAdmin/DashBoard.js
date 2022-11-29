import React, { Component } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import './DashBoard.css';
import HomeProfileAdmin from "../HomeProfileAdmin";


class DashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: 10,
            lecturer: 2,
            companies: 4,
            admin: 2,
            pieData1: [],
            pieData2: [],
        }
    }
    componentDidMount() {
        this.pieDataStudentCompany();
        this.pieDataLecturerAdmin();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.students !== this.state.students ||
            prevState.lecturer !== this.state.lecturer ||
            prevState.companies !== this.state.companies ||
            prevState.admin !== this.state.admin
        ) {
            this.pieDataStudentCompany();
            this.pieDataLecturerAdmin();
        }
    }
    pieDataStudentCompany = () => {
        let pie1 = [
            {
                name: "Students",
                value: this.state.students
            },
            {
                name: "Companies",
                value: this.state.companies
            },
        ]
        this.setState({
            pieData1: pie1
        })
    }
    pieDataLecturerAdmin = () => {
        let pie2 = [
            {
                name: "Lecturer",
                value: this.state.lecturer
            },
            {
                name: "Admin",
                value: this.state.admin
            },
        ]
        this.setState({
            pieData2: pie2
        })
    }
    COLORS1 = ["#8884d8", "rgb(109, 154, 42)",];
    COLORS2 = ["#82ca9d", "rgb(26, 125, 167)",];
    CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: "#ffff",
                        padding: "5px",
                        border: "1px solid #cccc"
                    }}
                >
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }
        return null;
    };
    render() {
        let { students, companies, admin, lecturer } = this.state;
        return (
            <>
                <div className="dash-board-container">
                    
                    <div className="nav-page-admin">
                        <div className="dashboard-quantity">
                            <div className="dashboard-quantity-content">
                                <div className="dashboard-quanlity-left">
                                    <div className="quanlity-left-icon color-student-left">
                                        <i class="fas fa-graduation-cap"></i>
                                    </div>
                                </div>
                                <div className="dashboard-quanlity-right">
                                    <div className="quanlity-right-up">
                                        Quantity: {students}
                                    </div>
                                    <div className="quanlity-right-down color-student-right">
                                        Students
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard-quantity-content">
                                <div className="dashboard-quanlity-left">
                                    <div className="quanlity-left-icon color-companies-left">
                                        <i class="fas fa-city"></i>
                                    </div>
                                </div>
                                <div className="dashboard-quanlity-right">
                                    <div className="quanlity-right-up">
                                        Quantity: {companies}
                                    </div>
                                    <div className="quanlity-right-down color-companies-right">
                                        Companies
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard-quantity-content">
                                <div className="dashboard-quanlity-left">
                                    <div className="quanlity-left-icon color-admin-left">
                                        <i class="fas fa-user-large"></i>
                                    </div>
                                </div>
                                <div className="dashboard-quanlity-right">
                                    <div className="quanlity-right-up">
                                        Quantity: {admin}
                                    </div>
                                    <div className="quanlity-right-down color-admin-right">
                                        Admin
                                    </div>
                                </div>
                            </div>
                            <div className="dashboard-quantity-content">
                                <div className="dashboard-quanlity-left">
                                    <div className="quanlity-left-icon color-lecturer-left">
                                        <i class="fas fa-book-open-reader"></i>
                                    </div>
                                </div>
                                <div className="dashboard-quanlity-right">
                                    <div className="quanlity-right-up">
                                        Quantity: {lecturer}
                                    </div>
                                    <div className="quanlity-right-down color-lecturer-right">
                                        Lecturer
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-group">
                            <div className="dashboard-pieChart-left">
                                <div>
                                    <label>Students/Companies</label>
                                </div>
                                <PieChart width={400} height={400} >
                                    <Legend />
                                    <Pie
                                        data={this.state.pieData1}
                                        color="#000000"
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        innerRadius={50}
                                        fill="#8884d8"
                                    >
                                        {this.state.pieData1.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={this.COLORS1[index % this.COLORS1.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<this.CustomTooltip />} />
                                </PieChart>
                            </div>
                            <div className="dashboard-pieChart-right">
                                <div>
                                    <label>Lecturer/Admin</label>
                                </div>
                                <PieChart width={400} height={400} >
                                    <Legend />
                                    <Pie
                                        data={this.state.pieData2}
                                        color="#000000"
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        innerRadius={50}
                                        fill="#8884d8"
                                    >
                                        {this.state.pieData2.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={this.COLORS2[index % this.COLORS2.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<this.CustomTooltip />} />
                                </PieChart>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DashBoard;
