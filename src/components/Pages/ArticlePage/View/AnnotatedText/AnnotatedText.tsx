import React from "react"
import {List, Set} from "immutable"
import {assignAnnotations} from "logic/processing"
import {AnnotationType} from "logic/annotation"
import Section from "./Section"

const breakUpString = (content: string, annotations: Set<AnnotationType>) => {
    const breakpoints = List(Set(               // kills duplicates
        (annotations
            .map(a => List.of(a.start, a.stop))
            .flatten() as List<number>)             // one list of start and stop positions for every annotation
            .concat([0, content.length])
    )).sort()

    return breakpoints
        .pop().zip(breakpoints.shift()) // zip with offset self
        .map(([start, stop]) => content.substring(start, stop))
}

type AnnotatedTextType = {
    children: string
    annotations?: Set<AnnotationType>
    withProps?: object
    setActiveAnnotationId?: (val: number | ((id: number) => number)) => void
}

const AnnotatedText: React.FC<AnnotatedTextType> = (props) => {
    const annotations: Set<AnnotationType> = props.annotations || Set()
    return (
        <span {...(props.withProps || {})} className={"AnnotatedText"}>
            {assignAnnotations(x => x.length, annotations, breakUpString(props.children, annotations))
                .map(([substring, substringAnnotations], i) =>
                    <Section key={i} annotations={substringAnnotations} setActiveAnnotationId={props.setActiveAnnotationId}>
                        {substring}
                    </Section>)}
        </span>
    )
}

export default AnnotatedText
