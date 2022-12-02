import React, { Component } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList,TabPanel } from '@mui/lab';
import TabAbout from './TabContent/TabAbout';
import TabInformation from "./TabContent/TabInformation";
import TabBookmark from "./TabContent/TabBookmark";
import './TabProfile.css';
class TabProfile extends Component {

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
                                    <Tab sx={{fontWeight:"bold"}} label="About" value="1" />
                                    <Tab sx={{fontWeight:"bold"}} label="Post" value="2" />     
                                </TabList>
                            </Box>
                            <TabPanel value="1"><TabAbout /></TabPanel>
                            <TabPanel value="2"><TabBookmark /></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </>
        );
    }
}

export default TabProfile;
