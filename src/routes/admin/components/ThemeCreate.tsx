import React from "react";

import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";

import { callThemePostApi } from "../../../apis/theme/ThemeApi";

import Grid from '@mui/material/Unstable_Grid2';

import MarkDownEditor from "../../../components/MarkDownEditer";


const ThemeCreate: React.FC = () => {

    const [hasThemeIdError, setHasThemeIdError] = React.useState(false)
    const [themeId, setThemeId] = React.useState("THEME-XX")

    const onThemeIdChange = (e: any) => {
        setThemeId(e.target.value)
        themeIdVaid(e.target.value)
    }

    const themeIdRegex = /^[A-Z0-9\-]*$/;
    const themeIdVaid = (e: string) => {
        const isError = !themeIdRegex.test(e)
        setHasThemeIdError(isError)
    }

    const [hasThemeError, setHasThemeError] = React.useState(false)
    const [theme, setTheme] = React.useState("")

    const onThemeChange = (e: any) => {
        setTheme(e.target.value)
        themeVaid(e.target.value)
    }

    const themeVaid = (e: string) => {
        const isError = 50 <= e.length
        setHasThemeError(isError)
    }

    const [hasDescriptionError, setHasDescriptionError] = React.useState(false)
    const [description, setDescription] = React.useState("")

    const onDescriptionChange = (e: any) => {
        setDescription(e)
        descriptionVaid(e)
    }

    const descriptionVaid = (e: string) => {
        setHasDescriptionError(false)
    }

    const handleSave = () => {
        callThemePostApi(themeId, theme, description)
            .then(function (response) {
                showSuccessToast(`Save Successfully!`);
            }).catch((err) => {
                // get error status
                console.error(err)
                showErrorToast(`Save Failed!`, 3000);
            });
    }

    const showSuccessToast = (msg: any) => {
        toast.success(msg || `Compiled Successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const showErrorToast = (msg: any, timer: any) => {
        toast.error(msg || `Something went wrong! Please try again.`, {
            position: "top-right",
            autoClose: timer ? timer : 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Box sx={{ maxWidth: '70%' }}>
                <Stack spacing={2}>
                    <Grid container spacing={2}>
                        <Grid xs={3}>
                            <FormControl sx={{ minWidth: "100%" }}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    label="Theme ID"
                                    required
                                    value={themeId}
                                    error={hasThemeIdError}
                                    onChange={onThemeIdChange}
                                    helperText={hasThemeIdError ? 'A~Z,-,0~9が使えます' : 'format:THEME-XX'}
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={9}>
                            <FormControl sx={{ minWidth: "100%" }}>
                                <TextField
                                    type="text"
                                    fullWidth
                                    label="Theme"
                                    required
                                    value={theme}
                                    error={hasThemeError}
                                    onChange={onThemeChange}
                                    helperText={hasThemeError ? '50文字以内で登録してください' : ''}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <MarkDownEditor props={{
                        markdown: description,
                        handleMarkDownChange: onDescriptionChange
                    }} />
                    <Grid container spacing={2}>
                        <Grid xs={4}></Grid>
                        <Grid xs={4}>
                            <Button fullWidth variant="contained" onClick={handleSave} disabled={hasThemeIdError || hasThemeError || hasDescriptionError}>
                                Save
                            </Button>
                        </Grid>
                        <Grid xs={4}></Grid>    
                    </Grid>
                </Stack>
            </Box >
        </>
    )
};

export default ThemeCreate
