import React from "react";

import DOMPurify from "dompurify";
import { marked } from "marked";

interface MarkDownViewerProps {
    props: {
        raw: string;
    }
}

const MarkDownViewer: React.FC<MarkDownViewerProps> = ({ props }) => {

    const render = (markdown: string): any => {
        return marked(markdown)
    }

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(render(props.raw)) }}></div>
        </>
    );
};

export default MarkDownViewer;