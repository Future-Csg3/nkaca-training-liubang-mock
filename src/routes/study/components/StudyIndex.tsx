import React, { useState } from "react";

import DOMPurify from "dompurify";

import { marked } from "marked";

import Container from "@mui/material/Container";

import { callThemeGetApi } from '../../../apis/theme/ThemeApi';

const StudyIndex: React.FC = () => {

    const [description, setDescription] = useState("");

    callThemeGetApi().then(function (response: any) {
        const res = response.data.theme
        setDescription(res.description)
    }).catch((err: any) => {
        console.error(err)
    });

    const render = (markdown: string): any => {
        return marked(markdown)
    }
    return (
        <>
            <Container>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(render(description)) }}></div>
            </Container>
        </>
    );
}

export default StudyIndex;