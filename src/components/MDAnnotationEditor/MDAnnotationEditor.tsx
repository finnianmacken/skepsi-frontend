import React, {useState} from "react"
import MDAnnotationEditorCore from "./MDAnnotationEditorCore"
import {ContentNodeType} from "skepsi-frontend/src/utility/types.ts"

export type MDAnnotationEditorType = {
    value?: string
    onMDChange?: (md: string | null) => void
    onNodeChange?: (node: ContentNodeType | null) => void
    [key: string]: any
}

const MDAnnotationEditor: React.FC<MDAnnotationEditorType> = (props) => {
    const {onMDChange, onNodeChange, ...rest} = props
    const [md, setMD]: [string, any] = useState(props.value || "")

    return (
        <MDAnnotationEditorCore
            {...rest}
            value={md}
            onMDChange={(md) => {
                setMD(md)
                if(onMDChange){
                    onMDChange(md)
                }
            }}
            onNodeChange={(node) => {
                if (onNodeChange){
                    onNodeChange(node)
                }
            }} />
    )
}

export default MDAnnotationEditor
