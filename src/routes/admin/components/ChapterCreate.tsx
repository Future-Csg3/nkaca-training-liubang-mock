import React, { useEffect, useState } from "react";

import axios from "axios";
import { languageOptions } from "../../../constants/languageOptions";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LanguagesDropdown, { LanguagesDropdownOption } from "../../../components/LanguageDropdown";
import OutputWindow from "../../../components/OutputWindow";
import ThemeDropdown from "../../../components/ThemeDropdown";
import useKeyPress from "../../../hooks/useKeyPress";
import { defineTheme } from "../../../lib/defineTheme";

import AdminCodeEditorCluster from "./AdminCodeEditerCluster";

import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { chapterDefs } from "../../../constants/chapterDefs";

import callChapterPostApi from "../../../apis/chapter/ChapterPostFunc";


interface ChapterDef {
    mainCode: string;
    exampleCode: string;
    bestPracticeCode: string;
}

const ChapterCreate: React.FC = () => {
    const def: ChapterDef = chapterDefs["default"]

    const [mainCode, setCode] = useState(def.mainCode);
    const [exampleCode, setExampleCode] = useState(def.exampleCode);
    const [bestPracticeCode, setBestPracticeCode] = useState(def.bestPracticeCode);

    const handleCodeChange = (action: string, data: any) => {
        switch (action) {
            case "mainCode": {
                setCode(data);
                break;
            }
            case "exampleCode": {
                setExampleCode(data);
                break;
            }
            case "bestPracticeCode": {
                setBestPracticeCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };


    const [chapterId, setChapterId] = useState("CHAPTER-XX-XXX");
    const [level, setLevel] = useState(1);
    const [hasFormError, setFormError] = useState(true)

    const [exercise, setExercise] = useState("## Title");


    const [hasCompileError, setCompileError] = useState(true)
    const [expected, setExpected] = useState("")

    const handleCompileError = () => {
        setCompileError(true)
        showErrorToast(
            "Cpmpleted Unsuccessfully!",
            3000
        );
    }

    const handleCompileSuccess = (expected: string) => {
        setCompileError(false)
        setExpected(expected)
        showSuccessToast(`Compiled Successfully!`);
    }

    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(false);
    
    const [saving, setSaving] = useState(false);

    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(languageOptions[0]);

    const handleLanguageChange = (langage: LanguagesDropdownOption) => {
        setLanguage(langage);
    };

    function handleThemeChange(theme: string) {
        if (["light", "vs-dark"].includes(theme)) {
            setTheme(theme);
        } else {
            defineTheme(theme).then((_) => setTheme(theme));
        }
    }

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    useEffect(() => {
        if (enterPress && ctrlPress) {
            handleCompile();
        }
    }, [ctrlPress, enterPress]);

    const handleCompile = () => {

        const executeCode = `

        ${bestPracticeCode}

        ${mainCode}
        `
        setProcessing(true);
        const formData = {
            language_id: language.id,
            // encode source code in base64
            source_code: btoa(unescape(encodeURIComponent(executeCode))),
            stdin: btoa(""),
        };

        const options = {
            method: "POST",
            url: process.env.REACT_APP_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
            data: formData,
        };

        axios
            .request(options)
            .then(function (response) {
                console.log("res.data", response);
                const token = response.data.token;
                checkStatus(token);
            })
            .catch((err) => {
                let error = err.response ? err.response.data : err;
                console.error(err);
                // get error status
                let status = err.response.status;

                if (status === 429) {
                    console.log("too many requests", status);

                    showErrorToast(
                        `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
                        10000
                    );
                }
                setProcessing(false);
            });

    };

    const checkStatus = async (token: string) => {
        const options = {
            method: "GET",
            url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
            },
        };
        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else if (statusId === 3) {
                setProcessing(false);
                setOutputDetails(response.data);
                handleCompileSuccess(response.data.stdout)
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                handleCompileError()

            }

            return;
        } catch (err) {
            console.error("err", err);
            setProcessing(false);
            showErrorToast(
                `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
                10000
            );
        }
    };

    const handleSave = () => {
        setSaving(true);
        callChapterPostApi(
            chapterId,
            mainCode,
            exampleCode,
            expected,
            bestPracticeCode,
            level,
            exercise,
        ).then(function (response) {
            showSuccessToast(`Save Successfully!`);
        }).catch((err) => {
            // get error status
            console.error(err)
            showErrorToast(`Save Failed!`, 3000);
        });
        setSaving(false);
    }

    useEffect(() => {
        defineTheme("oceanic-next").then((_) =>
            setTheme("oceanic-next")
        );
    }, []);

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

            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    flexGrow: 1,
                }}
            >
                <Grid container spacing={2}>
                    <Grid xs ><LanguagesDropdown props={{ handleLanguageChange: handleLanguageChange }} /></Grid>
                    <Grid xs > <ThemeDropdown props={{ handleThemeChange: handleThemeChange, theme: theme }} /></Grid>
                    <Grid xs={6} ></Grid>
                    <Grid xs={8} >
                        <AdminCodeEditorCluster props={{
                            language: language,
                            theme: theme,
                            height: "700px",
                            mainCode: mainCode,
                            exampleCode: exampleCode,
                            bestPracticeCode: bestPracticeCode,
                            onChange: handleCodeChange,
                            chapterId: chapterId,
                            handleChapterIdChange: setChapterId,
                            level: level,
                            handleLevelChange: setLevel,
                            exercise: exercise,
                            handleExerciseChange: setExercise,
                            setFormError: setFormError,
                        }}
                        />
                    </Grid>
                    <Grid xs={4} >
                        <Stack spacing={2} >
                            <OutputWindow props={{
                                outputDetails: outputDetails,
                            }} />
                            <Button variant="contained" onClick={handleCompile} disabled={!mainCode}>
                                {processing ? "Processing..." : "Compile and Execute"}
                            </Button>

                            <Button variant="contained" onClick={handleSave} disabled={hasFormError || hasCompileError}>
                                {saving ? "Saving..." : "Save"}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ChapterCreate