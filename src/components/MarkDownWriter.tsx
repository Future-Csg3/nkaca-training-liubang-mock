import React, { useState } from "react";

import { Button, TextField } from '@mui/material';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import MarkDownEditor from "./MarkDownEditer";
import MarkDownViewer from "./MarkDownViewer";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface MarkDownWriterProps {
    props: {
        markdown: string;
        handleMarkDownChange: any;
    }
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const MarkDownWriter: React.FC<MarkDownWriterProps> = ({ props }) => {
    const [raw, setRaw] = useState(props.markdown || "");

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <MarkDownEditor props={{
                markdown: raw,
                handleMarkDownChange: setRaw
            }} />
        </>
    );
};

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default MarkDownWriter;