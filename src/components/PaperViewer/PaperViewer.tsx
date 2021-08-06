import React, {useMemo, useRef, useState} from "react"
import {DraggableCore} from "react-draggable"
import {Set, Map} from "immutable"

import {Annotation, AnnotationType, ContentNodeType} from "../types"
import {mdToNode, nodeMap, nodesInNode, weaveNodeAnnotations} from "../processing"
import {KNOB_DRAG_HANDLE_CLASS} from "../Tooltip/Tooltip"

import ContentViewer from "../ContentViewer/ContentViewer"
import TooltipRefRelative from "../Tooltip/TooltipRefRelative"
import AnnotationSidebar from "../AnnotationSidebar/AnnotationSidebar"

import styles from './PaperViewer.module.css'

type PaperViewerType = {
    document: {
        md: string
    }
    annotations: {
        start: string
        stop: string
        id: string
    }[]
}

/*
takes document, an object with a md property carrying a string, and annotations, a JSON of annotations with start, stop
and id, which are all integers or strings
 */
const PaperViewer: React.FC<PaperViewerType> = (props) => {
    const [userSelection, _setUserSelection] = useState<null | AnnotationType>(null)

    const setUserSelection = (val: (null | AnnotationType) | ((val: null | AnnotationType) => null | AnnotationType)) => {
        const userSelectionId = -1
        if (val && "_user" in val && val?._user){
            val = val.merge({_id: userSelectionId})
        }
        _setUserSelection(val)
        setActiveAnnotationId(userSelectionId)
    }

    const [activeNode, setActiveNode] = useState<null | ContentNodeType>(null)
    const [activeNodeRef, setActiveNodeRef] = useState<null | React.RefObject<HTMLDivElement>>(null)
    const [activeAnnotationId, _setActiveAnnotationId] = useState(NaN)

    const setActiveAnnotationId = (val: number | ((val: number) => number)) => {
        _setActiveAnnotationId(val)
        if (val !== -1){
            _setUserSelection(null)
        }
    }

    const [activeResize, setActiveResize] = useState(false)
    const [featureBarWidth, setFeatureBarWidth] = useState<string | number>("35%")

    const {md, ...paperMetadata} = props.document

    const [relatedToText, notRelatedToText] = useMemo(() => {
        const parsedAnnotations = Set(props.annotations.map((annotation) => {
            const {start, stop, id, ...rest} = annotation
            return Annotation({
                start: parseInt(start),
                stop: parseInt(stop),
                _id: parseInt(id),
                data: Object.freeze(rest)
            })
        }))
        return [
            parsedAnnotations.filter(a => !isNaN(a.start) && !isNaN(a.stop)),
            parsedAnnotations.filter(a => isNaN(a.start) || isNaN(a.stop))
        ]
    }, [props.annotations])

    const parsedMD = useMemo(() => mdToNode(md), [md])

    // memoize so it doesn't run on resize
    const [root, annotations, nodeIdToRef] = useMemo(() => {

        const [root, annotationsWovenRelated] = weaveNodeAnnotations(
            parsedMD,
            userSelection ? relatedToText.add(userSelection) : relatedToText
        )
        const annotations = annotationsWovenRelated.concat(notRelatedToText)

        // maps from node id to a ref to that node
        const nodeIdToRef = Map(nodesInNode(root).map((node) => [node._id, React.createRef<HTMLElement>()]))
        const rootWithRefs = nodeMap(root, node => node.merge({nodeRef: nodeIdToRef.get(node._id)}))

        return [rootWithRefs, annotations, nodeIdToRef]
    }, [userSelection, notRelatedToText, relatedToText, parsedMD])

    const draggableRef = useRef(null)

    // ContentViewer declares this as a dependency, so whenever it changes (i.e. whenever featureBarWidth changes by
    // more that a factor of n) ContentViewer knows it has to rerender and resize everything
    const contentViewerRenderSentinel = typeof featureBarWidth === "number"
        ? Math.round(featureBarWidth/30)
        : 0

    return (
        <div className={styles.main}>

            <div className={styles.mainContainer}>

                <div className={styles.paperContainer} style={{position: 'relative'}}>
                    {
                        // again, avoid rendering on resize
                        useMemo(
                            () => (
                                <ContentViewer
                                    root={root}
                                    setActiveNode={setActiveNode}
                                    setActiveNodeRef={setActiveNodeRef}
                                    setUserSelection={setUserSelection}
                                    setActiveAnnotationId={setActiveAnnotationId}
                                />
                            ),
                            [
                                root,
                                setActiveNode,
                                setActiveNodeRef,
                                setUserSelection,
                                setActiveAnnotationId,
                                contentViewerRenderSentinel,
                                activeResize,
                            ]
                        )
                    }
                </div>

                <DraggableCore
                    // @ts-ignore TODO(Leo): ts thinks axis is irrelevant?
                    axis={"x"}
                    handle={"." + KNOB_DRAG_HANDLE_CLASS}
                    // adjustment of half the width of the slider = 21px TODO(Leo): this doesn't work!
                    onDrag={e => setFeatureBarWidth("clientX" in e ? window.innerWidth - e.clientX : + 21)}
                    onStart={() => setActiveResize(true)}
                    onStop={() => setActiveResize(false)}
                    nodeRef={draggableRef}>
                    <div
                        ref={draggableRef}
                        className={styles.tooltipContainer}
                        style={{flexBasis: featureBarWidth}}>

                        <div className={styles.tooltipVertical}/>

                        <TooltipRefRelative
                            root={root}
                            annotations={annotations}
                            paperMetadata={paperMetadata}
                            activeNode={activeNode}
                            activeNodeRef={activeNodeRef}
                            width={featureBarWidth}
                            freeze={activeResize}>
                        </TooltipRefRelative>

                        {/* what is this for? did i put this here? --Leo */}
                        <div style={{
                            width: '80%',
                            position: 'relative',
                            left: '50px'
                        }}/>

                        <div className={styles.annotationSidebarContainer}>
                            <AnnotationSidebar
                                annotations={annotations}
                                activeAnnotationId={activeAnnotationId}
                                setActiveAnnotationId={setActiveAnnotationId}
                                nodeIdToRef={nodeIdToRef}
                                killActiveSelection={() => setUserSelection(null)}/>
                        </div>
                    </div>
                </DraggableCore>
            </div>
        </div>
    )
}

export default PaperViewer
