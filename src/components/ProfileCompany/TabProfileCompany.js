import React, { Component } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList,TabPanel } from '@mui/lab';
import TabInformation from "./TabContent/TabInformation";
import TabBookmark from "./TabContent/TabBookmark";
import TabJobs from "./TabContent/TabJobs";
import './TabProfileCompany.css';
class TabProfileCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '1'
        }
    }
    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    };
    render() {
        return (
            <>
                <div className="tabs-container">
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={this.state.value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList
                                    onChange={this.handleChange}
                                    aria-label="lab API tabs example"
                                >
                                    <Tab sx={{fontWeight:"bold"}} label="Jobs" value="1" />
                                    <Tab sx={{fontWeight:"bold"}} label="Information" value="2" />
                                    <Tab sx={{fontWeight:"bold"}} label="Bookmark" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1"><TabJobs /></TabPanel>
                            <TabPanel value="2"><TabInformation /></TabPanel>
                            <TabPanel value="3"><TabBookmark /></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </>
        );
    }
}

export default TabProfileCompany;
