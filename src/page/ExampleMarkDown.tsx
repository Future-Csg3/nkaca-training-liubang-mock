import React, { useState } from "react";


import { styled } from '@mui/material/styles';
import MarkDownWriter from "../components/MarkDownWriter";

const ExampleMarkDown: React.FC = () => {
    const [markdown, setMarkdown] = useState("");
    return (
        <MarkDownWriter props={{ markdown: markdown, handleMarkDownChange: setMarkdown }} />
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

export default ExampleMarkDown;