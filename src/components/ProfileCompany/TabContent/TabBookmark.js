import React, { Component } from "react";
import './TabBookmark.css';
import ListBookmark from './listbookmark/ListBookmark';
import Pagination from './listbookmark/Pagination';

class TabBookmark extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            postsPerPage: 1,
        }
    }
    setCurrentPage = (page) => {
        this.setState({
            currentPage: page
        })
    }
    render() {
        let arrBookmark = ["BookMark 1", "BookMark 2", "BookMark 3", "BookMark 4",
            "BookMark 5", "BookMark 6", "BookMark 7", "BookMark 8", "BookMark 9", "BookMark 10",
        ]
        let { postsPerPage, currentPage } = this.state;
        let lastPostIndex = currentPage * postsPerPage;
        let firstPostIndex = lastPostIndex - postsPerPage;
        let currentPosts = arrBookmark.slice(firstPostIndex, lastPostIndex);
        return (
            <>
                <ListBookmark
                    coisnsData={currentPosts}
                />
                <Pagination
                    totalPosts={arrBookmark.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={this.setCurrentPage}
                />
            </>
        );
    }
}

export default TabBookmark;
