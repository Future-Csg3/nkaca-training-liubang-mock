import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";

import axios from "axios";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguageDropdown";

import { chapterDefs } from "../constants/chapterDefs"

interface LandingProp {
    prop: {
        id: string;
    }
}

interface ChapterDef {
    mainExacute: string;
    initCode: string;
    expected: string;
}

const Landing: React.FC<LandingProp> = ({ prop }) => {
    const def: ChapterDef = chapterDefs[prop.id]

    const [code, setCode] = useState(def.initCode);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(languageOptions[0]);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    const onSelectChange = (sl: any) => {
        setLanguage(sl);
    };

    useEffect(() => {
        if (enterPress && ctrlPress) {
            handleCompile();
        }
    }, [ctrlPress, enterPress]);

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

    const handleCompile = () => {

        const executeCode = `

        ${code}

        ${def.mainExacute}
        `
        console.log(executeCode)
        setProcessing(true);
        const formData = {
            language_id: language.id,
            // encode source code in base64
            source_code: btoa(unescape(encodeURIComponent(executeCode))),
            stdin: btoa(customInput),
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
                // still processing
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            } else {
                setProcessing(false);
                setOutputDetails(response.data);

                if (atob(response.data.stdout) === def.expected) {
                    showSuccessToast(`Compiled Successfully!`);
                } else {
                    showErrorToast(
                        "Cpmpleted Unsuccessfully!",
                        3000
                    );
                }
                return;
            }
        } catch (err) {
            console.error("err", err);
            setProcessing(false);
            showErrorToast(
                `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
                10000
            );
        }
    };

    function handleThemeChange(theme: any) {

        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme.value);
        } else {
            defineTheme(theme.value).then((_) => setTheme(theme.value));
        }
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

            <div className="flex flex-row">
                <div className="px-4 py-2">
                    <LanguagesDropdown props={{ onSelectChange: onSelectChange }} />
                </div>
                <div className="px-4 py-2">
                    <ThemeDropdown props={{ handleThemeChange: handleThemeChange, theme: theme }} />
                </div>
            </div>
            <div className="flex flex-row space-x-4 items-start px-4 py-4">
                <div className="flex flex-col w-full h-full justify-start items-end">
                    <CodeEditorWindow props={{
                        code: code,
                        onChange: onChange,
                        language: language?.value,
                        theme: theme
                    }}
                    />
                </div>

                <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
                    <OutputWindow prop={{ outputDetails: outputDetails }} />
                    <div className="flex flex-col items-end">
                        <button
                            onClick={handleCompile}
                            disabled={!code}
                            className={
                                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
                            }
                        >
                            {processing ? "Processing..." : "Compile and Execute"}
                        </button>
                    </div>
                    {outputDetails && <OutputDetails prop={{ outputDetails: outputDetails }} />}
                </div>
            </div >
        </>
    );
};
export default Landing;