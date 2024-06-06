import React, { useState } from "react";


import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import NavigationIcon from '@mui/icons-material/Navigation';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Stack from "@mui/material/Stack";

import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';


import Typography from '@mui/material/Typography';

import MarkDownEditor from "../components/MarkDownEditer";
import MarkDownViewer from "../components/MarkDownViewer";

const ExampleForm1: React.FC = () => {

    const [lastName, setLastName] = useState("John");
    const [fisrtName, setFirstName] = useState("Smith");
    const [markdown, setMarkdown] = useState("# 自己紹介\r\n## 趣味\r\n- 釣り");

    const onLastNameChange = (e: any) => {
        setLastName(e.target.value)
    }

    const onFirstNameChange = (e: any) => {
        setFirstName(e.target.value)
    }

    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            <Box sx={{ minWidth: 120 }}>
                <Stack spacing={5}>
                    <Stack direction="row" spacing={5}>
                        {
                            isEdit ?
                                (
                                    <> <FormControl>
                                        <TextField
                                            type="text"
                                            label="last name"
                                            required
                                            value={lastName}
                                            onChange={onLastNameChange}
                                        />
                                    </FormControl>
                                        <FormControl>
                                            <TextField
                                                type="text"
                                                label="fisrt name"
                                                required
                                                value={fisrtName}
                                                onChange={onFirstNameChange}
                                            />
                                        </FormControl></>) :
                                (<>
                                    <Typography variant="body1" gutterBottom>{lastName}</Typography>
                                    <Typography variant="body1" gutterBottom>{fisrtName}</Typography>
                                </>)
                        }
                    </Stack>
                    {
                        isEdit ? (
                            <MarkDownEditor props={{ markdown: markdown, handleMarkDownChange: setMarkdown }} />
                        ) : (
                            <MarkDownViewer props={{ raw: markdown }} />
                        )

                    }
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab color="secondary" aria-label="edit" onClick={() => { setIsEdit(true) }}>
                            <EditIcon />
                        </Fab>
                        <Fab variant="extended" color="primary" onClick={() => { setIsEdit(false) }}>
                            <NavigationIcon sx={{ mr: 1 }} />
                            Save
                        </Fab>
                    </Box>
                </Stack>
            </Box >
        </>
    );
};

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
});

export default ExampleForm1;