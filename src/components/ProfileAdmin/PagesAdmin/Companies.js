import React, { Component } from "react";
import HomeProfileAdmin from "../HomeProfileAdmin";
import './Companies.css';

class Companies extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let arrCompanies = [
            {
                img: "",
                name: "FPT SOFWARE"
            }, {
                img: "",
                name: "RIKKEISOFT"
            }, {
                img: "",
                name: "ENCLAVE"
            }, {
                img: "",
                name: "BRAVO"
            }
        ]
        return (
            <>
                <div className="companies-container">
                    <div className="nav-page-admin">
                        <div className="text-title-companies">Companies</div>
                        {
                            arrCompanies && arrCompanies.map((item, index) => {
                                return (
                                    <div className="item-companies" key={index}>
                                        <div className="item-companies-left">

                                        </div>
                                        <div className="item-companies-right">
                                            <div className="item-name-companies">{item.name}</div>
                                            <div className="item-btn-companies">
                                                <button className="btn-delete-companies">
                                                    <i className="fas fa-trash-can"></i>
                                                </button>
                                                <button className="btn-view-companies">
                                                    <i className="fas fa-magnifying-glass"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default Companies;
