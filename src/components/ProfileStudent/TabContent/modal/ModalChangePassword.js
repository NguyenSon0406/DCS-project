import React, { Component } from "react";
import './ModalChangePassword.css';
import { Modal } from "reactstrap";

class ModalChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showOldPassword: false,
            showNewPassword: false,
            showConfirmPassword: false,
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.setState({
                showOldPassword: false,
                showNewPassword: false,
                showConfirmPassword: false,
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
        }
    }
    onChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let copyState = {};
        copyState[id] = valueInput;
        this.setState({
            ...copyState
        })
    }
    handleShowHidePassword = (id) => {
        if (id === "oldPassword") {
            this.setState({
                showOldPassword: !this.state.showOldPassword
            })
        }
        if (id === "newPassword") {
            this.setState({
                showNewPassword: !this.state.showNewPassword
            })
        }
        if (id === "confirmPassword") {
            this.setState({
                showConfirmPassword: !this.state.showConfirmPassword
            })
        }
    };
    handleChange = () => {
        this.props.closeModal();
    }
    handleReturn = () => {
        this.props.closeModal();
    }
    render() {
        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    size="lg"
                    centered
                    style={
                        {
                            width: "40%",
                            padding: "20px"
                        }
                    }
                >
                    <div className="modal-changepassword-container">
                        <div className="title-change-password">
                            <label>Change Password</label>
                            <span onClick={this.props.closeModal}>
                                <i className="fas fa-xmark"></i>
                            </span>
                        </div>
                        <div className="old-password">
                            <div className="title-change">
                                Old password
                            </div>
                            <div className="group-change">
                                <input
                                    type={this.state.showOldPassword ? "text" : "password"}
                                    className=""
                                    placeholder="Old Password"
                                    value={this.state.oldPassword}
                                    onChange={(e) => this.onChangeInput(e, "oldPassword")}
                                />
                                <span onClick={() => this.handleShowHidePassword("oldPassword")}>
                                    <i
                                        className={
                                            this.state.showOldPassword
                                                ? "fas fa-eye show-password"
                                                : "fas fa-eye-slash show-password"
                                        }
                                    ></i>
                                </span>
                            </div>
                        </div>
                        <div className="new-password">
                            <div className="title-change">
                                New password
                            </div>
                            <div className="group-change">
                                <input
                                    type={this.state.showNewPassword ? "text" : "password"}
                                    className=""
                                    placeholder="New Password"
                                    value={this.state.newPassword}
                                    onChange={(e) => this.onChangeInput(e, "newPassword")}
                                />
                                <span onClick={() => this.handleShowHidePassword("newPassword")}>
                                    <i
                                        className={
                                            this.state.showNewPassword
                                                ? "fas fa-eye show-password"
                                                : "fas fa-eye-slash show-password"
                                        }
                                    ></i>
                                </span>
                            </div>
                        </div>
                        <div className="confirm-password">
                            <div className="title-change">
                                <label>Confirm password</label>
                            </div>
                            <div className="group-change">
                                <input
                                    type={this.state.showConfirmPassword ? "text" : "password"}
                                    className=""
                                    placeholder="Confirm Password"
                                    value={this.state.confirmPassword}
                                    onChange={(e) => this.onChangeInput(e, "confirmPassword")}
                                />
                                <span onClick={() => this.handleShowHidePassword("confirmPassword")}>
                                    <i
                                        className={
                                            this.state.showConfirmPassword
                                                ? "fas fa-eye show-password"
                                                : "fas fa-eye-slash show-password"
                                        }
                                    ></i>
                                </span>
                            </div>

                        </div>
                        <div className="btn-change-password">
                            <button
                                className="btn-return"
                                onClick={() => this.handleReturn()}
                            >Return</button>
                            <button
                                className="btn-change"
                                onClick={() => this.handleChange()}
                            >Change</button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

export default ModalChangePassword;
