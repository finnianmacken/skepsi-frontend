import React, {useCallback, useMemo, useRef, useState} from "react"
import {DraggableCore} from "react-draggable"
import {Set, Map, List} from "immutable"
import {VscInfo, VscSymbolRuler, VscFileMedia, VscBook} from "react-icons/vsc"
import { Icon } from 'semantic-ui-react'

import Annotation, {AnnotationType} from "../../logic/annotation"
import {ContentNodeType} from "../../logic/contentNode"
import {mdToNode, weaveNodeAnnotations} from "../../logic/processing"
import {nodeMap, nodesInNode} from "../../logic/functions"
import {addSingleAnnotation} from "../../logic/functions"

import ContentViewer from "../ContentViewer/ContentViewer"
import TooltipRefRelative from "../Tooltip/TooltipRefRelative"
import AnnotationSidebar from "../AnnotationSidebar/AnnotationSidebar"
import CitationViewer from "../CitationViewer/CitationViewer"
import TableContents from "../TableContents/TableContents"
import TableAndFigureViewer from "../TableAndFigureViewer/TableAndFigureViewer.js"
import ReferenceViewer from "../ReferenceViewer/ReferenceViewer"

import {KNOB_DRAG_HANDLE_CLASS} from "../Tooltip/Tooltip"
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
    scrollToTop: () => void
}

/*
takes document, an object with a md property carrying a string, and annotations, a JSON of annotations with start, stop
and id, which are all integers or strings
 */
const PaperViewer: React.FC<PaperViewerType> = (props) => {
    const [userSelection, _setUserSelection] = useState<null | AnnotationType>(null)

    const setUserSelection = useCallback((val: (null | AnnotationType) | ((val: null | AnnotationType) => null | AnnotationType)) => {

        // special id so we can identity user annotations later (ids from db are guaranteed to be positive)
        const userSelectionId = -1
        if (val && "_activeHighlight" in val && val?._activeHighlight){
            val = val.merge({_id: userSelectionId})
        }

        // if we are told to set user selection to a nonnull, we want to update the active annotation to be it
        if (typeof val === "function"){
            const oldVal = val
            val = (current) => {
                const derived = oldVal(current)
                if (derived !== null){
                    setActiveAnnotationId(userSelectionId)
                }
                return derived
            }
        } else if (val !== null){
            setActiveAnnotationId(userSelectionId)
        }

        _setUserSelection(val)
    }, [_setUserSelection]) // TODO: possible bug here with missing dependency

    const [activeResize, setActiveResize] = useState(false)
    const [featureBarWidth, setFeatureBarWidth] = useState<number>(450)

    // memo means paperMetadata remains the same, preventing tooltip rendering on resize
    const {md, ...paperMetadata} = useMemo(() => props.document, [props.document])

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
        const related = (a: AnnotationType) => !isNaN(a.start) && !isNaN(a.stop) && a.start !== a.stop
        return [
            parsedAnnotations.filter(related),
            parsedAnnotations.filterNot(related)
        ]
    }, [props.annotations])

    const parsedMD = useMemo(() => mdToNode(md), [md])

    // memoize so it doesn't run on resize
    const [rootNoHighlight, annotationsNoHighlight, nodeIdToRef] = useMemo(() => {

        const [root, annotationsWovenRelated] = weaveNodeAnnotations(parsedMD, relatedToText)
        const annotations = annotationsWovenRelated.concat(notRelatedToText)

        // maps from node id to a ref to that node
        const nodeIdToRef = Map(nodesInNode(root).map((node) => [node._id, React.createRef<HTMLDivElement>()]))
        const rootWithRefs = nodeMap(root, node => node.merge({nodeRef: nodeIdToRef.get(node._id)}))

        return [rootWithRefs, annotations, nodeIdToRef]
    }, [notRelatedToText, relatedToText, parsedMD])

    // add the activeHighlight in if it exists
    const [root, annotations] = useMemo(() => {
        if (!userSelection){
            return [rootNoHighlight, List(annotationsNoHighlight).sort((a, b) => (a.start - b.start) || (a._id - b._id))]
        } else {
            const [root, annotation] = addSingleAnnotation(rootNoHighlight, userSelection)
            const annotationsWithHighlight = annotationsNoHighlight.add(annotation)
            const annotationsSorted = List(annotationsWithHighlight).sort((a, b) => (a.start - b.start) || (a._id - b._id))
            return [root, annotationsSorted]
        }
    }, [rootNoHighlight, annotationsNoHighlight, userSelection])

    const [activeNode, setActiveNode] = useState<null | ContentNodeType>(null)
    const [activeNodeRef, setActiveNodeRef] = useState<null | React.RefObject<HTMLDivElement>>(null)
    const [activeAnnotationId, _setActiveAnnotationId] = useState(NaN)

    const setActiveAnnotationId = useCallback((val: number | ((val: number) => number)) => {
        _setActiveAnnotationId(val)
        if (val !== -1){
            _setUserSelection(null)
        }
    }, [_setActiveAnnotationId, _setUserSelection])

    // logic to handle prev and next buttons on Tooltip
    const annotationIds = annotations.map(a => a._id)
    const annotationsCircleMap = Map(annotationIds.zip(annotationIds.shift().push(annotationIds.first())))
    const annotationsCircleMapPrev = annotationsCircleMap.mapEntries(([a, b]) => [b, a])
    const onNextAnnotation = () => setActiveAnnotationId(aId => annotationsCircleMap.get(aId, annotationIds.first()))
    const onPrevAnnotation = () => setActiveAnnotationId(aId => annotationsCircleMapPrev.get(aId, annotationIds.last()))

    const draggableRef = useRef(null)

    // @ts-ignore
    return (
        <div className={styles.main}>

            <div className={styles.mainContainer}>

                <div className={styles.paperContainer} style={{position: 'relative'}}>
                    {useMemo(() => (
                        // doesn't render on resize
                        <ContentViewer
                            root={root}
                            setActiveNode={setActiveNode}
                            setActiveNodeRef={setActiveNodeRef}
                            setUserSelection={setUserSelection}
                            setActiveAnnotationId={setActiveAnnotationId}
                        />
                        ),[root, setActiveNode, setActiveNodeRef, setUserSelection, setActiveAnnotationId]
                    )}
                </div>

                <DraggableCore
                    handle={"." + KNOB_DRAG_HANDLE_CLASS}
                    onDrag={useCallback(e => setFeatureBarWidth("clientX" in e ? window.innerWidth - e.clientX : + 25), [setFeatureBarWidth])}
                    onStart={useCallback(() => setActiveResize(true), [setActiveResize])}
                    onStop={useCallback(() => setActiveResize(false), [setActiveResize])}
                    nodeRef={draggableRef}>
                    <div
                        ref={draggableRef}
                        className={styles.tooltipContainer}
                        style={{flexBasis: featureBarWidth}}>

                        <div className={styles.tooltipVertical}/>

                        {useMemo(() => (
                            <TooltipRefRelative
                                activeNodeRef={activeNodeRef}
                                options={[
                                    [
                                        <VscInfo style={{color: 'gray'}}/>,
                                        <div>
                                            <button
                                              className={styles.scrollToTopButton}
                                              style={{borderColor: "none"}}
                                              onClick={props.scrollToTop}>
                                              <Icon fitted name="angle double up" color='grey'/>
                                            </button>
                                            <CitationViewer paperMetadata={paperMetadata}/>
                                        </div>
                                    ],
                                    [<VscSymbolRuler style={{color: 'gray'}}/>, <TableContents content={root}/>],
                                    [<VscFileMedia style={{color: 'gray'}}/>, <TableAndFigureViewer paperMetadata={paperMetadata}/>],
                                    [<VscBook style={{color: 'gray'}}/>, <ReferenceViewer paperMetadata={paperMetadata}/>],
                                ]}
                                onNext={onNextAnnotation}
                                onPrevious={onPrevAnnotation}
                                activeResize={activeResize}/>
                        ), [activeNodeRef, activeResize, JSON.stringify(paperMetadata), root])}

                        {useMemo(() => (
                            // doesn't render on resize
                            <div className={styles.annotationSidebarContainer}>
                                <AnnotationSidebar
                                    annotations={annotations}
                                    activeAnnotationId={activeAnnotationId}
                                    setActiveAnnotationId={setActiveAnnotationId}
                                    nodeIdToRef={nodeIdToRef}
                                    killActiveSelection={() => setUserSelection(null)}
                                    width={typeof featureBarWidth === "number"? featureBarWidth - 80 : 350}/>
                            </div>
                            ), [annotations, activeAnnotationId, featureBarWidth, setActiveAnnotationId, nodeIdToRef, setUserSelection]
                        )}
                    </div>
                </DraggableCore>
            </div>
        </div>
    )
}

export default PaperViewer
