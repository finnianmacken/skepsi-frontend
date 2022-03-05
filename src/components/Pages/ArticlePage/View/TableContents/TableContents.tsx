import React from "react"
import {scrollToContentNode, nodesInNode} from "logic/functions"
import ContentBlock from "../ContentBlock/ContentBlock"
import {ContentNodeType} from "logic/contentNode"

type TableContentsType = {
    content: ContentNodeType
}

const TableContents: React.FC<TableContentsType> = (props) => {
    const headings = nodesInNode(props.content).filter(n => n.type === "heading")
    return (
        <div style={{width: 200}}>
            {headings.size
                ? headings.map((n, i) => (
                    <div
                        key={i}
                        onClick={() => scrollToContentNode(n)}>
                        <ContentBlock node={n.merge({type: "p"})} />
                    </div>
                ))
                : <em style={{color: "grey"}}>It appears there are no headings in this document.</em>}
        </div>
    )
}

export default TableContents
