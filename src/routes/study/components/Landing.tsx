import React, { useEffect, useState } from "react";
import CodeEditor from "../../../components/CodeEditor";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LanguagesDropdown, { LanguagesDropdownOption } from "../../../components/LanguageDropdown";
import OutputWindow, { OutputDetails } from "../../../components/OutputWindow";
import ThemeDropdown from "../../../components/ThemeDropdown";
import { languageOptions } from "../../../constants/languageOptions";
import useKeyPress from "../../../hooks/useKeyPress";
import { defineTheme } from "../../../lib/defineTheme";
import TextField from '@mui/material/TextField';
import DOMPurify from "dompurify";
import "easymde/dist/easymde.min.css";
import { marked } from "marked";

import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { callArchivementGetApi, callArchivementPostApi } from "../../../apis/archivement/ArchivementApi";
import { callChapterGetApi } from "../../../apis/chapter/ChapterApi";


interface LandingProp {
    props: {
        selected: SelectedChapter | null;
    }
}

export interface SelectedChapter {
    chapterId: string;
    archiveId: string;
}

interface Chapter {
    mainCode: string;
    exampleCode: string;
    expected: string;
    bestPracticeCode: string;
    level: number;
    exercise: string;
}

interface Archivement {
    archivementId: string;
    status: string;
    version: number;
    code: string;
    comment: string;
    result: string;
    isCompileError: boolean,
}

const Landing: React.FC<LandingProp> = ({ props }) => {


    // layout
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const [chapter, setChapter] = useState<Chapter | null>(null)
    const [archivement, setArchivement] = useState<Archivement | null>(null)
    const [code, setCode] = useState("")
    const [comment, setComment] = useState("")

    const render = (markdown: string): any => {
        return marked(markdown)
    }


    const update = (c: Chapter, a: Archivement) => {
        if (a.code === "") {
            setCode(c.exampleCode)
        } else {
            setCode(a.code)
        }
        setComment(a.comment)
        setOutputDetails({
            result: a.result,
            isCompileError: a.isCompileError,
            isUnsuccess: a.status !== "2",
        })
        setChapter(c)
        setArchivement(a)
    }

    useEffect(() => {
        if (props.selected) {
            Promise.all([
                callChapterGetApi(props.selected.chapterId),
                callArchivementGetApi(props.selected.chapterId),
            ]).then(([chapterRes, archivementRes]) => {
                const chapter = {
                    mainCode: chapterRes.data.chapter.main_code,
                    exampleCode: chapterRes.data.chapter.example_code,
                    expected: chapterRes.data.chapter.expected,
                    bestPracticeCode: chapterRes.data.chapter.best_practice_code,
                    level: chapterRes.data.chapter.level,
                    exercise: chapterRes.data.chapter.exercise,
                }

                const archivement = {
                    archivementId: archivementRes.data.archivement.archivement_id,
                    status: archivementRes.data.archivement.status,
                    version: archivementRes.data.archivement.version,
                    code: archivementRes.data.archivement.code,
                    comment: archivementRes.data.archivement.comment,
                    result: archivementRes.data.archivement.result,
                    isCompileError: archivementRes.data.archivement.is_compile_error,
                }

                update(chapter, archivement)
            }).catch(([chapterErr, archivementErr]) => {

            });

        }
    }, [props.selected])

    const onChange = (action: string, data: any) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };

    const [outputDetails, setOutputDetails] = useState<OutputDetails | null>(null);
    const [processing, setProcessing] = useState(false);

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

        ${code}

        ${chapter?.mainCode}
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
                // still processing
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            }

            if (statusId === 3) {
                setProcessing(false);

                if (response.data.stdout === chapter!.expected) {
                    setOutputDetails({
                        result: atob(response.data.stdout),
                        isCompileError: false,
                        isUnsuccess: false,
                    });
                    showSuccessToast(`Successfully!`);
                } else {
                    setOutputDetails({
                        result: atob(response.data.stdout),
                        isCompileError: false,
                        isUnsuccess: true,
                    });
                    showErrorToast("Unsuccessfully!", 3000);
                }
            } else if (statusId === 5) {
                setProcessing(false);
                setOutputDetails({
                    result: "Time Limit Exceeded",
                    isCompileError: true,
                    isUnsuccess: false,
                });
                showErrorToast("Unsuccessfully!", 3000);
            } else if (statusId === 6) {
                setProcessing(false);
                setOutputDetails({
                    result: atob(response.data.compile_output),
                    isCompileError: true,
                    isUnsuccess: false,
                });
                showErrorToast("Unsuccessfully!", 3000);
            } else {
                setProcessing(false);
                setOutputDetails({
                    result: atob(response.data.stderr),
                    isCompileError: true,
                    isUnsuccess: false,
                });
                showErrorToast("Unsuccessfully!", 3000);
            }
        } catch (err) {
            console.error("err", err);
            setProcessing(false);
            showErrorToast(
                `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
                2000
            );
        }
    };

    const handleSave = () => {
        const saveArchivement = {
            archivementId: archivement!.archivementId,
            status: outputDetails?.isUnsuccess ? "1" : "2",
            version: archivement!.version,
            code: code,
            comment: comment,
            result: outputDetails!.result,
            isCompileError: outputDetails!.isCompileError,
        }

        callArchivementPostApi(saveArchivement).then((response) => {
            setArchivement(saveArchivement)
            showSuccessToast(`Save Successfully!`);
        }).catch((err: any) => {
            showErrorToast("Save Failed!", 2000);
            console.error(err)
        })
    }

    const handleRevisionSave = () => {
        const saveArchivement = {
            archivementId: archivement!.archivementId,
            status: outputDetails?.isUnsuccess ? "1" : "2",
            version: archivement!.version + 1,
            code: code,
            comment: comment,
            result: outputDetails!.result,
            isCompileError: outputDetails!.isCompileError,
        }

        callArchivementPostApi(saveArchivement).then((response) => {
            setArchivement(saveArchivement)
            showSuccessToast(`Save Successfully!`);
        }).catch((err) => {
            showErrorToast("Save Failed!", 2000);
        })
    }

    useEffect(() => {
        defineTheme("oceanic-next").then((_) =>
            setTheme("oceanic-next")
        );
    }, []);

    const showSuccessToast = (msg: any) => {
        toast.success(msg || `Compiled Successfully!`, {
            position: "top-right",
            autoClose: 3000,
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
                    <Grid xs={6} >    </Grid>
                    <Grid xs={8} >
                        {chapter ?
                            (
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="Detail" {...a11yProps(0)} />
                                        <Tab label="Example" {...a11yProps(1)} />
                                    </Tabs>
                                    <TabPanel value={value} index={0}>
                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(render(chapter.exercise)) }}></div>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <CodeEditor props={{
                                            code: code,
                                            onChange: onChange,
                                            language: language?.value,
                                            theme: theme,
                                            height: "75vh"
                                        }}
                                        />
                                    </TabPanel>
                                </Box>) : (<></>)
                        }
                    </Grid>
                    <Grid xs={4} >
                        <Stack spacing={2} >
                            <OutputWindow props={{
                                outputDetails: outputDetails,
                            }} />
                            <Button variant="contained" onClick={handleCompile} disabled={!code}>
                                {processing ? "Processing..." : "Compile and Execute"}
                            </Button>
                            <TextField label="Comment" multiline rows={2} value={comment} onChange={(e) => setComment(e.target.value)} />
                            <Button variant="contained" onClick={() => { handleSave() }} disabled={!chapter}>
                                Save
                            </Button>
                            <Button variant="contained" onClick={() => { handleRevisionSave() }} disabled={!chapter}>
                                Update Revision
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
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

export default Landing;