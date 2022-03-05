import React from "react"
import {List, Set, Map} from "immutable"
import {AnnotationType} from "logic/annotation"

const highlightStyle = (annotations: Set<AnnotationType>): object => {
    const depth = annotations.size

    const colors = ["transparent", "#e2bc92", "#bd997e", "#9b7768", "#725a57", "#523b3d"]
    const bottomColors = ["transparent", "#e2bc92", "#bd997e", "#9b7768", "#725a57", "#523b3d"]

    return {
        backgroundColor: colors[Math.min(depth, colors.length)],
        borderBottom: depth > 0 ? "2px solid " + bottomColors[Math.min(depth, bottomColors.length)]: "",
    }
}

type SectionType = {
    annotations: Set<AnnotationType>
    children: string
    setActiveAnnotationId?: (val: number | ((id: number) => number)) => void
}

const Section: React.FC<SectionType> = (props) => {
    const annotationProps = props.annotations
        .map(a => {
            try {
                return a.data.sectionProps
            } catch (e) {
                return {}
            }
        })
        .reduce((a, b) => ({...a, ...b}), {style: {}})

    const ids = List(props.annotations.map(a => a._id)).sort()
    const idMap = Map(ids.zip(ids.shift().push(ids.first())))

    const onClick = () => {
        if (props.setActiveAnnotationId){
            props.setActiveAnnotationId((id: number) => idMap.get(id, ids.get(0, NaN)))
        }
    }

    return (
        <span
            {...annotationProps}
            onMouseDown={onClick} // for some reason onclick isn't working
            style={{
                ...annotationProps.style,
                ...highlightStyle(props.annotations),
                position: "relative",
            }}
            className={"Section"}>
            {props.children}
        </span>
    )
}

export default Section
