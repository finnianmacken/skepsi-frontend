import React, {useMemo} from "react"
import {List} from "immutable"
import ContentNode, {ContentNodeType} from "logic/contentNode"

import * as _ContentComponents from "./ContentComponents"
import {astToNode} from "logic/mdParser"
import {SingleASTNode} from "simple-markdown"
import {nodeIdToPrettyId} from "logic/functions"

const ContentComponents = Object.freeze(Object.create(_ContentComponents))

type ContentBlockType = {
    node: ContentNodeType
    setActiveAnnotationId?: (val: number | ((id: number) => number)) => void
}

/*
Recursive component to render rich text from a `ContentNode`
 */
const ContentBlock: React.FC<ContentBlockType> = (props) => {

    return useMemo(() => {
        let type = ContentComponents[props.node.type] || props.node.type
        if (props.node.type === "list"){
            type = props.node.props.ordered? "ol": "ul"
        }

        const content = props.node.type === "list"?
            List(props.node.props.items.flat() as SingleASTNode[])
                .map(astToNode)
                .map(node => ContentNode({type: "li", content: node, props: {start: node.props.start || 1}})) :
            props.node.content

        let children: JSX.Element | List<JSX.Element> | string | undefined
        if (content === undefined || typeof content === "string"){
            children = content
        } else if (List.isList(content)){
            children = content.map((n, i) => <ContentBlock key={i} node={n} setActiveAnnotationId={props.setActiveAnnotationId} />)
        } else {
            children = <ContentBlock node={content} setActiveAnnotationId={props.setActiveAnnotationId} />
        }

        return (
            <span
                id={!isNaN(props.node._id)? nodeIdToPrettyId(props.node._id): undefined}
                ref={props.node.nodeRef}>
            {React.createElement(
                type,
                {
                    ...props.node.props,
                    className: (props.node.props.className || "") + " ContentBlock",
                    node: props.node,
                    setActiveAnnotationId: props.setActiveAnnotationId,
                },
                children
            )}
        </span>
        )
    }, [props.node, props.setActiveAnnotationId])
}

export default ContentBlock
