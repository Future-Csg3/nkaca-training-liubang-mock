import React, { useState } from "react";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
    props: {
        onChange: any;
        language: string;
        code: string;
        theme: string;
        height: string;
        codeType?: string
    }
}

const CodeEditor: React.FC<CodeEditorProps> = ({ props }) => {
    const [value, setValue] = useState(props.code || "");

    const handleEditorChange = (value: any) => {
        setValue(value);
        props.onChange(props.codeType || "code", value);
    };

    return (

        <Editor
            height={props.height || "85vh"}
            width={`100%`}
            language={props.language || "javascript"}
            value={value}
            theme={props.theme}
            defaultValue="// some comment"
            onChange={handleEditorChange}
        />
    );
};
export default CodeEditor;