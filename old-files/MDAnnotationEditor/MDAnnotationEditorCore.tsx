import React from "react"
import {mdToNode} from "logic/processing"
import {MDAnnotationEditorType} from "./MDAnnotationEditor"
import styles from './MDAnnotationEditorCore.module.css'
// import TextareaAutosize from 'react-textarea-autosize'

const MDAnnotationEditorCore: React.FC<MDAnnotationEditorType> = (props) => {
    const {value, onMDChange, onNodeChange, ...rest} = props

    const onChange: React.ChangeEventHandler = (e) => {
        // @ts-ignore
        const md = e.target.value as string

        if (onMDChange){
            onMDChange(md)
        }
        if (onNodeChange){
            onNodeChange(mdToNode(md))
        }
    }

    return (
        <textarea {...rest} value={value} onChange={onChange}
          className={styles.inputBox}
        />
    )
}

export default MDAnnotationEditorCore
