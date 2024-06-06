import React, { useState } from "react";


import MarkDownEditor from "../components/MarkDownEditer";

const ExampleMarkDown: React.FC = () => {
    const [markdown, setMarkdown] = useState("");
    return (
        <MarkDownEditor props={{ markdown: markdown, handleMarkDownChange: setMarkdown }} />
    );
};

export default ExampleMarkDown;