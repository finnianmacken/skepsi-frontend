// https://codesandbox.io/s/dynamic-size-of-react-window-list-items-64o9p

import React, {useState} from "react"
import {AnnotationType} from "logic/annotation"
import {ContentNodeType} from "logic/contentNode"
import SelectionManager from "../SelectionManager/SelectionManager"
import {List} from "immutable"
import TopLevelContentBlock from "../TopLevelContentBlock/TopLevelContentBlock"

type ContentViewerType = {
    root: ContentNodeType
    setActiveNode: (activeNode: ContentNodeType | null) => void
    setActiveNodeRef: (activeNodeRef: React.RefObject<HTMLDivElement> | null) => void
    setUserSelection: (selection: AnnotationType | null) => void
    setActiveAnnotationId: (val: number | ((id: number) => number)) => void
}

/*
Right now, this carries selection state and does its own annotation weaving. Presumably we will need to move state up
here when there is something up to move it to.
 */
const ContentViewer: React.FC<ContentViewerType> = (props) => {

    // which node is active is tracked locally using it's index
    const [activeIndex, setActiveIndex] = useState(NaN)

    let topLevelContentNodes = List<ContentNodeType>()
    if (typeof props.root.content === "string" || props.root.content === undefined){
        return <div>{props.root.content}</div>
    } else if (List.isList(props.root.content)) {
        topLevelContentNodes = props.root.content
    } else {
        topLevelContentNodes = List.of(props.root.content)
    }

    const setActiveNode = (index: number, r: React.RefObject<HTMLDivElement>) => {
        // lots of stuff happens when we switch active node
        setActiveIndex(index)
        props.setActiveNode(topLevelContentNodes.get(index, null))
        props.setActiveNodeRef(r)
    }

    return (
        <div className={"ContentViewer"} id={"ContentViewer"} style={{position: "relative"}}>
            <SelectionManager selectionCallback={props.setUserSelection}>
                {topLevelContentNodes.map((node, index) => (
                    <TopLevelContentBlock
                        key={node._id}
                        node={node}
                        active={activeIndex === index}
                        setActiveNodeRef={(r: React.RefObject<HTMLDivElement>) => setActiveNode(index, r)}
                        setActiveAnnotationId={props.setActiveAnnotationId}/>
                ))}
            </SelectionManager>
        </div>
    )
}

export default ContentViewer
