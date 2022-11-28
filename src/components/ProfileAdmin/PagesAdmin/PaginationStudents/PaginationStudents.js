import React, { Component } from "react";

class PaginationStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: []
        }
    }
    componentDidMount() {
        let { totalPosts, postsPerPage } = this.props;
        let pageIndex = []
        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageIndex.push(i)
        }
        this.setState({
            pages: pageIndex
        })
    }
    setCurrentPage = (page) => {
        this.props.setCurrentPage(page);
    }

    render() {

        let { pages } = this.state;
        return (
            <div className="index-page">
                {pages.map((page, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => this.setCurrentPage(page)}
                        >{page}</button>
                    )
                })}
            </div>
        );
    }
}

export default PaginationStudents;
