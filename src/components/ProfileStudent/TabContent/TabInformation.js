import React, { Component } from "react";
import './TabInformation.css';
import ModalChangePassword from "./modal/ModalChangePassword";

class TabInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            birthday: '',
            gender: 'male',
            phone: '',
            email: 'son102938@gmail.com',
            address: '',
            falculty: '',
            className: '',
            isOpenModalChangePassword: false,
        }
    }
    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let copyState = { ...this.state }
        copyState[id] = valueInput;
        this.setState({
            ...copyState
        })
    }
    handleSaveInfor = () => {
        console.log("check state: ", this.state);
        this.setState({
            firstName: '',
            lastName: '',
            birthday: '',
            gender: 'male',
            phone: '',
            email: 'son102938@gmail.com',
            address: '',
            falculty: '',
            className: ''
        })
    }
    closeModalChangePassword = () => {
        this.setState({
            isOpenModalChangePassword: false
        })
    }
    handleOnChangePassword = () => {
        this.setState({
            isOpenModalChangePassword: true
        })
    }
    render() {
        let { firstName, lastName, birthday, gender, phone, email,
            address, falculty, className } = this.state;
        return (
            <>
                <ModalChangePassword
                    isOpen={this.state.isOpenModalChangePassword}
                    closeModal={this.closeModalChangePassword}
                />
                <div className="infor-container">
                    <div className="infor-title">Personal information</div>
                    <div className="avatar">
                        <div className="title-avatar">Avatar</div>
                        <input className="input-img" type="file" />
                    </div>
                    <div className="infor-input">
                        <div className="infor-group">
                            <div className="infor-item">
                                <label>First name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Last name</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Birthday</label>
                                <input
                                    className="form-control"
                                    type="date"
                                    value={birthday}
                                    onChange={(e) => this.handleOnChangeInput(e, "birthday")}
                                />
                            </div>
                        </div>
                        <div className="infor-group">
                            <div className="infor-item">
                                <label>Gender</label>
                                <select
                                    className="form-control"
                                    value={gender}
                                    onChange={(e) => this.handleOnChangeInput(e, "gender")}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="infor-item">
                                <label>Phone</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={phone}
                                    onChange={(e) => this.handleOnChangeInput(e, "phone")}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    value={email}
                                    onChange={(e) => this.handleOnChangeInput(e, "email")}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="infor-group">
                            <div className="infor-item">
                                <label>Address</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={address}
                                    onChange={(e) => this.handleOnChangeInput(e, "address")}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Falculty</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={falculty}
                                    onChange={(e) => this.handleOnChangeInput(e, "falculty")}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Class</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={className}
                                    onChange={(e) => this.handleOnChangeInput(e, "class")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="infor-btnsave">
                        <button
                            className="btn-save btn btn-primary"
                            onClick={() => this.handleSaveInfor()}
                        >SAVE</button>
                    </div>
                    <div className="infor-account">
                        <div className="text-account">Account</div>
                        <button
                            className="btn-on-change-password btn btn-primary"
                            onClick={() => this.handleOnChangePassword()}
                        >Change Password</button>
                    </div>
                </div>
            </>
        );
    }
}

export default TabInformation;
