import React from "react";
import CodeEditor from "../../../components/CodeEditor";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';


import ChapterCreateForm from "./ChapterCreateForm";

import MarkDownEditor from "../../../components/MarkDownEditer";

interface AdminCodeEditorClusterProps {
    props: {
        language: any;
        theme: string;
        height: string;
        mainCode: string;
        exampleCode: string;
        bestPracticeCode: string;
        onChange: any;
        chapterId: string,
        level: number,
        handleChapterIdChange: any;
        handleLevelChange: any;
        exercise: string;
        handleExerciseChange: any;
        setFormError: any;
    }
}

const AdminCodeEditorCluster: React.FC<AdminCodeEditorClusterProps> = ({ props }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const handleFormError = (hasError: boolean) => {
        props.setFormError(hasError)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Base" {...a11yProps(0)} />
                    <Tab label="Details" {...a11yProps(1)} />
                    <Tab label="Main Code" {...a11yProps(2)} />
                    <Tab label="Example Code" {...a11yProps(3)} />
                    <Tab label="Best practice Code" {...a11yProps(4)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <ChapterCreateForm props={{
                    chapterId: props.chapterId,
                    handleChapterIdChange: props.handleChapterIdChange,
                    leve: props.level,
                    handleLevelChange: props.handleLevelChange,
                    setFormError: props.setFormError,
                }} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MarkDownEditor props={{
                    markdown: props.exercise,
                    handleMarkDownChange: props.handleExerciseChange
                }} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CodeEditor props={{
                    code: props.mainCode,
                    onChange: props.onChange,
                    language: props.language?.value,
                    theme: props.theme,
                    height: props.height,
                    codeType: "mainCode"
                }}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <CodeEditor props={{
                    code: props.exampleCode,
                    onChange: props.onChange,
                    language: props.language?.value,
                    theme: props.theme,
                    height: props.height,
                    codeType: "exampleCode"
                }}
                />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <CodeEditor props={{
                    code: props.bestPracticeCode,
                    onChange: props.onChange,
                    language: props.language?.value,
                    theme: props.theme,
                    height: props.height,
                    codeType: "bestPracticeCode"
                }}
                />
            </TabPanel>
        </Box >
    );
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

export default AdminCodeEditorCluster;