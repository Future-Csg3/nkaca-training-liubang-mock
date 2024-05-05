import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'react-simplemde-editor';

import DOMPurify from "dompurify";
import "easymde/dist/easymde.min.css";
import { marked } from "marked";


interface ChapterCreateFormProp {
    props: {
        markdown: any;
        handleMarkDownChange: any;
    }
}

const MarkDownEditor: React.FC<ChapterCreateFormProp> = ({ props }) => {

    const render = (markdown: string): any => {
        return marked(markdown)
    }

    const onChange = (e: string) => {
        props.handleMarkDownChange(e)
    }

    return (
        <>
            <SimpleMDE value={props.markdown} onChange={onChange} />
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(render(props.markdown)) }}></div>
        </>
    )
}

const toolbar: any = [
    {
        name: "save",
        action: function customFunction(editor: any) {
            alert(editor.value())
            // save action
        },
        className: "fa fa-save",
        title: "Save"
    },
    '|',
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
    'undo',
    'redo',
    '|',
    'guide',
]

export default MarkDownEditor;