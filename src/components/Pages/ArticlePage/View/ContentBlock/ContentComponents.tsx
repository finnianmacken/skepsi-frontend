import React from "react"
import AnnotatedText from "../AnnotatedText/AnnotatedText"
import {Set} from "immutable"
import {AnnotationType} from "logic/annotation"
import {ContentNodeType} from "logic/contentNode"
import Tex from "components/Providers/Tex/Tex"
import NoSelectWrapper from "../SelectionManager/NoSelectWrapper"

/*

ContentBlock uses named exports from the file to figure out how to render the different types of things it gets when
it parses the markdown.

Unfortunately, simple-markdown uses weird names for a lot of stuff, so there are a lot of dumb renames here. Also,
this aspect appears to be undocumented. So yeah. If ContentBlock doesn't recognize something that comes out of the
parse, you can run defaultBlockParse on the same input to see it's schema, and then you can come here and build a
component that takes that schema as input.

 */

type ContentComponentType = {
    node: ContentNodeType
    annotations: Set<AnnotationType>
}

export const text = AnnotatedText
export const newline = "br"
export const codeBlock = "pre"
export const inlineCode = "code"
export const paragraph = "div"
export const blockQuote = "blockquote"

export const heading: React.FC<ContentComponentType & {level: number}> = ({level, children}) => (
    React.createElement("h" + level, {}, children)
)

export const link: React.FC<{target: string, content: string}> = (props) => {
    return <a href={props.target}>{props.children}</a>
}

export const image: React.FC<{alt: string, target: string}> = (props) => {
    return (
        <img alt={props.alt} src={props.target} />
    )
}

const equation = (inline: boolean): React.FC<{math: Array<{content: string}>}> => (props) => {
    const formula = props.math.reduce((current, next) => current + next.content, "")
    return (
        <NoSelectWrapper>
            <Tex inline={inline} formula={formula}/>
        </NoSelectWrapper>
    )
}

export const inlineEquation = equation(true)
export const blockEquation = equation(false)
