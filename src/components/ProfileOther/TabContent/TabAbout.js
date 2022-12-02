import React, { Component } from "react";
import './TabAbout.css';
import ModalContent from "./modal/ModalContent";
class TabAbout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            nameChild: ''
        }
    }
    closeModal = () => {
        this.setState({
            isOpenModal: false
        })
    }
    handleChange = (item) => {

        this.setState({
            isOpenModal: true,
            nameChild: item
        })
    }
    render() {
        let arrAbout = ["Score", "Education", "Experience", "Skills"];
        return (
            <>
                <ModalContent
                    isOpen={this.state.isOpenModal}
                    closeModal={this.closeModal}
                    nameChild={this.state.nameChild}
                />
                <div className="tab-about-containter">
                    <table>
                        <tbody>
                            {
                                arrAbout && arrAbout.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <div className="row-about">
                                                    {item}
                                                    {item === "Education" || item === "Experience"
                                                        || item === "Skills" ?
                                                        <button
                                                            className="btn-update"
                                                            onClick={() => this.handleChange(item)}
                                                        >
                                                            <i className="fa-solid fa-plus">
                                                            </i>
                                                            Update
                                                        </button>
                                                        :
                                                        <button
                                                            className="btn-view"
                                                            onClick={() => this.handleChange(item)}
                                                        >
                                                            <i className="fa-solid fa-magnifying-glass"></i>
                                                            View
                                                        </button>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default TabAbout;
