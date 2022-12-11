import React from "react";
import { Box, Tab} from "@mui/material";
import './Companies.css';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CompanyList from "./CompanyList";
import GrantAccount from "./GrantAccount"

function Companies() {
        const [value, setValue] = React.useState('1');

        const handleChange = (event, newValue) => {
          setValue(newValue);
        };
        return (
            <>
                <div className="companies-container">
                    <div className="nav-page-admin">
                        <div className="text-title-companies">Manage Company</div>
                        <Box sx={{ width: '100%', typography: 'body1', marginTop:"20px",p:3 }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{width:"100%", backgroundColor:"white"}}>
                                <Tab label="List of Companies" sx={{fontWeight:"bold", maxWidth:"50%" , width:"100%"}} value="1" />
                                <Tab label="Grant Account Access"  sx={{fontWeight:"bold", maxWidth:"50%" , width:"100%"}}value="2" />
                            </TabList>
                            </Box>
                        <TabPanel value="1" sx={{backgroundColor:"white",height:"520px"}}><CompanyList/></TabPanel>
                        <TabPanel value="2" sx={{backgroundColor:"white",height:"520px"}}><GrantAccount/> </TabPanel>
                        </TabContext>
                        </Box>
                    </div>
                </div>
            </>
        );
    }

export default Companies;
