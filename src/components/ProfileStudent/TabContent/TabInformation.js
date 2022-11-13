import React, { Component } from "react";
import './TabInformation.css';
import ModalChangePassword from "./modal/ModalChangePassword";

class TabInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.auth.firstName,
            lastName: this.props.auth.lastName,
            avatar:"",
            birthday: new Date(this.props.auth.dayofbirth).toISOString().slice(0,10),
            gender: this.props.auth.gender,
            phone: this.props.auth.contact,
            email: this.props.auth.email,
            address: this.props.auth.address,
            falculty: this.props.auth.falculty,
            className: this.props.auth.className,
            isOpenModalChangePassword: false,
        }
        
       console.log(this.state);
    }
    convertDatetoString = (date) => {
        let timestamp = new Date(date).getTime();
        let day = new Date(timestamp).getDate();
        let month = new Date(timestamp).getMonth()+1;
        let year = new Date(timestamp).getFullYear(); 
        let newDateFormat = year+"-"+month+"-"+day;
        return newDateFormat;  
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
        // this.setState({
        //     firstName: '',
        //     lastName: '',
        //     birthday: '',
        //     gender: 'male',
        //     phone: '',
        //     email: 'son102938@gmail.com',
        //     address: '',
        //     falculty: '',
        //     className: '',
        //     avatar:'',
        // })
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
                    <div className="infor-title">Personal Information</div>
                    <div className="avatar">
                        <div className="title-avatar">Avatar</div>
                        <input className="input-img" type="file" />
                    </div>
                    <div className="infor-input">
                        <div className="infor-group">
                            <div className="infor-item">
                                <label>First name</label>
                                <input
                                    className="input-item"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                                    disabled={true}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Last name</label>
                                <input
                                    className="input-item"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                                    disabled={true}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Birthday</label>
                                <input
                                    className="input-item"
                                    type='date'
                                    value={birthday}
                                    placeholder="dd/mm/yyyy"
                                    onChange={(e) => this.handleOnChangeInput(e, "birthday")}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="infor-group">
                            <div className="infor-item">
                                <label>Gender</label>
                                <select
                                    className="input-item"
                                    value={gender}
                                    onChange={(e) => this.handleOnChangeInput(e, "gender")}
                                    disabled={true}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="infor-item">
                                <label>Phone</label>
                                <input
                                    className="input-item"
                                    type="text"
                                    value={phone}
                                    onChange={(e) => this.handleOnChangeInput(e, "phone")}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Email</label>
                                <input
                                    className="input-item"
                                    type="text"
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
                                    className="input-item"
                                    type="text"
                                    value={address}
                                    onChange={(e) => this.handleOnChangeInput(e, "address")}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Falculty</label>
                                <input
                                    className="input-item"
                                    type="text"
                                    value={falculty}
                                    disabled={true}
                                    onChange={(e) => this.handleOnChangeInput(e, "falculty")}
                                />
                            </div>
                            <div className="infor-item">
                                <label>Class</label>
                                <input
                                    className="input-item"
                                    type="text"
                                    value={className}
                                    disabled={true}
                                    onChange={(e) => this.handleOnChangeInput(e, "class")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="infor-btnsave">
                        <button
                            className="btn-save"
                            onClick={() => this.handleSaveInfor()}
                        >SAVE</button>
                    </div>
                    <div className="infor-account">
                        <div className="text-account">Account</div>
                        <button
                            className="btn-on-change-password"
                            onClick={() => this.handleOnChangePassword()}
                        >Change Password</button>
                    </div>
                </div>
            </>
        );
    }
}

export default TabInformation;
