import React, { Component } from "react";
import Box from '@mui/material/Box';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
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
                                    <Tab label="About" value="1" />
                                    <Tab label="Information" value="2" />
                                    <Tab label="Bookmark" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1"><TabAbout /></TabPanel>
                            <TabPanel value="2"><TabInformation /></TabPanel>
                            <TabPanel value="3"><TabBookmark /></TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </>
        );
    }
}

export default TabProfile;
