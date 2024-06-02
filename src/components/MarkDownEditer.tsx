import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'react-simplemde-editor';

import DOMPurify from "dompurify";
import { marked } from "marked";

import "easymde/dist/easymde.min.css";

interface ChapterCreateFormProp {
    props: {
        markdown: any;
        handleMarkDownChange: any;
    }
}

const MarkDownEditor: React.FC<ChapterCreateFormProp> = ({ props }) => {

    const onChange = (e: string) => {
        props.handleMarkDownChange(e)
    }

    const render = (raw: string): any => {
        return marked(raw)
    }

    return (
        <>
            <SimpleMDE value={props.markdown} onChange={onChange} options={{ toolbar: toolbar, autofocus: true, previewRender: render }} />
        </>
    )
}

const toolbar: any = [
    'bold',
    'italic',
    'heading',
    '|',
    'quote',
    'unordered-list',
    'ordered-list',
    '|',
    'link',
    'image',
    '|',
    'preview',
]

export default MarkDownEditor;