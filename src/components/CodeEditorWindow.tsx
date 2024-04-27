import React, { useState } from "react";

import Editor from "@monaco-editor/react";

interface CodeEditorWindowProps {
    props: {
        onChange: any;
        language: string;
        code: string;
        theme: string;
    }
}

const CodeEditorWindow: React.FC<CodeEditorWindowProps> = ({ props }) => {
    const [value, setValue] = useState(props.code || "");

    const handleEditorChange = (value: any) => {
        setValue(value);
        props.onChange("code", value);
    };

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <Editor
                height="85vh"
                width={`100%`}
                language={props.language || "javascript"}
                value={value}
                theme={props.theme}
                defaultValue="// some comment"
                onChange={handleEditorChange}
            />
        </div>
    );
};
export default CodeEditorWindow;