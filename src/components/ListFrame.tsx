import React, { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Landing from "./Landing";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, width: "1200px" }} >
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const ListFrame: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 1000 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Capter 1" {...a11yProps(0)} />
                <Tab label="Capter 2" {...a11yProps(1)} />
                <Tab label="Capter 3" {...a11yProps(2)} />
                <Tab label="Capter 4" {...a11yProps(3)} />
                <Tab label="Capter 5" {...a11yProps(4)} />
                <Tab label="Capter 6" {...a11yProps(5)} />
                <Tab label="Capter 7" {...a11yProps(6)} />
                <Tab label="Capter 8" {...a11yProps(7)} />
                <Tab label="Capter 9" {...a11yProps(8)} />
                <Tab label="Capter 10" {...a11yProps(9)} />
                <Tab label="Capter 11" {...a11yProps(10)} />
                <Tab label="Capter 12" {...a11yProps(11)} />
                <Tab label="Capter 13" {...a11yProps(12)} />
                <Tab label="Capter 14" {...a11yProps(13)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Landing prop={{ id: "chapter1" }} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* <Landing /> */}
            </TabPanel>
        </Box>
    );
};

export default ListFrame;
