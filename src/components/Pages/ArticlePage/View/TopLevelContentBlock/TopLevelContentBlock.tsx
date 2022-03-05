import React, {useRef} from "react"
import {Set} from "immutable"
import {ContentNodeType} from "logic/contentNode"
import ContentBlock from "../ContentBlock/ContentBlock"
import {nodePrettyId, nodesInNode} from "logic/functions"

import styles from "./TopLevelContentBlock.module.css"

export const TOP_LEVEL_CONTENT_CLASS = "TOP_LEVEL_CONTENT"
export const TOP_LEVEL_OFFSET_ATTRIBUTE_NAME = "data-index"

type TopLevelContentBlockType = {
    // index: number
    node: ContentNodeType
    active: boolean
    setActiveNodeRef: (r: React.RefObject<HTMLDivElement>) => void
    setActiveAnnotationId: (val: number | ((id: number) => number)) => void
}

// kinds of nodes which cannot become the active node/dont have anchors
const excludedContentTypes = Set([
    "newline"
])

const TopLevelContentBlock: React.FC<TopLevelContentBlockType> = (props) => {

    const id = nodePrettyId(props.node)
    const excluded = excludedContentTypes.has(props.node.type)
    const ref = useRef<HTMLDivElement>(null)

    // this is used to figure out how big of a dot to put on the "annotation heatmap"
    const numAnnotationsInKids = nodesInNode(props.node).reduce(
        (c, n) => c.concat(n.props.annotations?
            n.props.annotations.filter(a => !a._activeHighlight).map(a => a._id) : Set()),
        Set()
    ).size

    const selectMe = () => {
        if (!excluded) {
            props.setActiveNodeRef(ref)
        }
    }

    // when the user clicks the little dot on the side, we update the url to be a link to this position
    const onClickAnchor = () => {
        try {
            // only newer browsers have the pushState function, on older ones, we just give up
            if (window.history.pushState){
                window.history.pushState(null, "", "#" + id)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div
            id={id}
            className={styles.main + " " + TOP_LEVEL_CONTENT_CLASS}
            ref={ref}
            onMouseUp={selectMe}
            data-index={props.node.startIndex}
        >
            <div className={styles.anchorContainer}>
                {!excluded &&
                    <div onMouseDown={onClickAnchor} className={styles.anchor}/>
                }
            </div>

            <div className={styles.ContentBlockContainer}>
                <ContentBlock node={props.node} setActiveAnnotationId={props.setActiveAnnotationId} />
            </div>

            <div onClick={selectMe} className={styles.dotTarget}>
                {
                    numAnnotationsInKids === 0? <></> :
                        numAnnotationsInKids === 1? <div className={`${styles.dot} ${styles.dotSmall}`} /> :
                            [2, 3, 4].includes(numAnnotationsInKids)? <div className={`${styles.dot} ${styles.dotMed}`} /> :
                                <div className={`${styles.dot} ${styles.dotBig}`} />
                }
            </div>
        </div>
    )
}

export default TopLevelContentBlock
