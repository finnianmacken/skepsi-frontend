import React from "react"
import TextareaAutosize from "react-textarea-autosize"
import styles from "./TextEditor.module.css"

type TextEditorType = {
    value: string | undefined
    placeholder?: string
    onChange: (val: string | undefined) => void
    editable?: boolean
}

const TextEditor: React.FC<TextEditorType> = (props) => {
    return (
        <TextareaAutosize
            className={styles.main + " " + (props.editable? styles.editable: styles.locked)}
            readOnly={!props.editable}
            placeholder={props.editable? props.placeholder: ""}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}/>
    )
}

export default TextEditor
