import React, { Component } from "react";
import './ModalContent.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ViewScore from "./ViewScore"

const style = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: "35%",
    height: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
class ModalContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starting: '',
            complete: '',
            title: '',
            workAt: '',
            programingLanguage: '',
            languageSpoken: ''
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.setState({
                starting: '',
                complete: '',
                title: '',
                workAt: '',
                programingLanguage: '',
                languageSpoken: ''
            })
        }
    }

    handleChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let coppyState = { ...this.state }
        coppyState[id] = valueInput;
        this.setState({ ...coppyState })
    }
    handleSaveInput = () => {
        if (this.props.nameChild === "Education") {
            console.log('value: ', this.state.title, this.state.starting, this.state.complete);
        }
        if (this.props.nameChild === "Experience") {
            console.log('value: ', this.state.title, this.state.workAt,
                this.state.starting, this.state.complete);
        }
        if (this.props.nameChild === "Skills") {
            console.log('value: ', this.state.programingLanguage, this.state.languageSpoken);
        }
        this.props.closeModal();
    }
    render() {
        let { closeModal, nameChild } = this.props;
        let { starting, complete, title, workAt } = this.state;
        let placeholder = `Please enter ${nameChild} title`;
        return (
            <div className="modal-container">
                <Modal
                    open={this.props.isOpen}
                    modalClassName="booking-modal-container"
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onClose={closeModal}
                >
                    <Box sx={style}>
                        <div className="content-up-modal">
                            <span
                                onClick={closeModal}
                            >
                                <i className="fas fa-xmark"></i>
                            </span>
                            <label>
                                {nameChild}
                            </label>
                            <div className="content-btn">
                                <button
                                    className="btn-cancel"
                                    onClick={closeModal}
                                >Cancel</button>
                                <button
                                    className="btn-ok"
                                    onClick={() => this.handleSaveInput()}
                                >OK</button>
                            </div>
                        </div>
                        {
                            nameChild === "Education" || nameChild === "Experience" ?
                                <div className="content-down-modal">
                                    <div className="child-up">
                                        <div className="name-child">{nameChild}</div>
                                        <input
                                            type="text"
                                            className="input-title"
                                            placeholder={placeholder}
                                            onChange={(e) => this.handleChangeInput(e, "title")}
                                            value={title}
                                        />
                                    </div>
                                    {
                                        nameChild === "Experience" ?
                                            <div className="child-middle work-at">
                                                <div className="name-child">Work At</div>
                                                <input
                                                    type="text"
                                                    className="input-title"
                                                    placeholder="Please enter where you work"
                                                    onChange={(e) => this.handleChangeInput(e, "workAt")}
                                                    value={workAt}
                                                />
                                            </div>
                                            : ""
                                    }
                                    <div className="child-down">
                                        <div className="child-left">
                                            <label>Starting Date</label>
                                            <input
                                                type="date"
                                                className="input-title"
                                                onChange={(e) => this.handleChangeInput(e, "starting")}
                                                value={starting}
                                            />
                                        </div>
                                        <div className="child-right">
                                            <label>Complete Date</label>
                                            <input
                                                type="date"
                                                className="input-title"
                                                onChange={(e) => this.handleChangeInput(e, "complete")}
                                                value={complete}
                                            />
                                        </div>
                                    </div>
                                </div>
                                :
                                <>
                                    {
                                        nameChild === "Skills" ?
                                            <div className="view-skill-container">
                                                <div className="programing">
                                                    <div className="title-skill">Programing Language</div>
                                                    <input
                                                        type="text"
                                                        className="input-title"
                                                        value={this.state.programingLanguage}
                                                        onChange={(e) => this.handleChangeInput(e, "programingLanguage")}
                                                    />
                                                </div>
                                                <div className="spoken">
                                                    <div className="title-skill">Language Spoken</div>
                                                    <input
                                                        type="text"
                                                        className="input-title"
                                                        value={this.state.languageSpoken}
                                                        onChange={(e) => this.handleChangeInput(e, "languageSpoken")}
                                                    />
                                                </div>
                                            </div>
                                            :
                                            <ViewScore />
                                    }
                                </>
                        }
                    </Box>
                </Modal>
            </div>
        );
    }
}

export default ModalContent;