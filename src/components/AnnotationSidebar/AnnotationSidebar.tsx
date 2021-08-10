import React, {useContext, useEffect, useState} from "react"
import {List, Set, Map, Seq} from "immutable"

import AnnotationCard, {AnnotationCardType} from "../AnnotationCard/AnnotationCard"
import CardAlignGroup from "../CardAlignGroup/CardAlignGroup"

import {UserContext} from "../../App"
import {formatDate, nodeIdToPrettyId} from "../functions"
import {AnnotationType} from "../types"
import {useStateWithCallbackLazy} from "use-state-with-callback";

const annotationToAnnotationCard = (a: AnnotationType): AnnotationCardType => ({
    id: a._id,
    start: a.start,
    stop: a.stop,
    activeHighlight: a._activeHighlight,
    author: a.data.author ? a.data.author.username: "???",
    date: a.data.date || formatDate(new Date(Date.now())),
    text: a.data.content || "",
    scoreBlocks: a.data.scores
        ? a.data.scores.map(({scoreNumber, explanation, field, id}: {scoreNumber: number, id: number, explanation: string, field: string}) =>
            ({scoreNumber, field: field, id, text: explanation}))
        : [],
    userCouldEdit: true,
    beingEdited: a._activeHighlight,
    annotation: a,
})

// takes a `Set` of `Annotation`s and constructs a `List` of `AnnotationCard` trees
export const annotationsToTreesOfAnnotationCards = (annotations: Set<AnnotationType>) => {

    const annotationsList = List(annotations)
        // .filter(a => a._user)
        .sort((a, b) => (a.start - b.start) || (a._id - b._id))

    const idToAnnotation = Map(annotationsList.map(a => a._id).zip(annotationsList))
    const idsOfAnnotationsWhichAreChildren = annotationsList.reduce((current, next) =>
        current.concat(next.data.children || Set()), Set())
    const annotationCardsNotChildren = annotationsList
        .filter(a => !idsOfAnnotationsWhichAreChildren.has(a._id))
        .map(annotationToAnnotationCard)

    // takes a top level `AnnotationCard` and recursively assembles the tree of replies beneath (returning a new card)
    const attachReplies = (a: AnnotationCardType): AnnotationCardType => {
        const childrenIds = a.id === undefined ? undefined: idToAnnotation.get(a.id)?.data.children
        return {
            ...a,
            replies: Array.isArray(childrenIds)
                ? (childrenIds
                    .map(i => idToAnnotation.get(i), undefined)
                    .filter((a: AnnotationType | undefined) => a !== undefined) as AnnotationType[])
                    .map(annotationToAnnotationCard)
                    .map(attachReplies) // recursive construction of subtrees
                : []
        }
    }

    return annotationCardsNotChildren.map(attachReplies)
}

type ReplyType = {
    parent: number
    card: AnnotationCardType
}

// takes a `List` of replies and a tree of `AnnotationCard`s and attaches the replies to the relevant cards
const overlayReplies = (tree: AnnotationCardType, replies: List<ReplyType>): AnnotationCardType => {

    const parentIdToCards = replies.reduce((current, next) => (
        current.set(next.parent, current.get(next.parent, List<AnnotationCardType>()).push(next.card))
    ), Map<number, List<AnnotationCardType>>())

    const _overlay = (tree: AnnotationCardType): AnnotationCardType => ({
        ...tree,
        replies: [
            ...(tree.replies || []).map(_overlay),
            ...(tree.id === undefined || isNaN(tree.id)? []:
                Array.from(parentIdToCards.get(tree.id, [])))
        ]
    })
    return _overlay(tree)
}

// recursively & immutably sets the `onReply` value of an AnnotationCard tree using the provided `createReply` callback
const overlayReplyCreationCallbacks = (createReply: (id: number) => void, a: AnnotationCardType): AnnotationCardType => ({
    ...a,
    onReply: () => (
        typeof a.id === "number" &&
        !isNaN(a.id) &&
        createReply(a.id)
    ),
    replies: a.replies && a.replies.map(a => overlayReplyCreationCallbacks(createReply, a)),
})

type AnnotationSidebarType = {
    annotations: Set<AnnotationType>
    activeAnnotationId: number
    setActiveAnnotationId: (id: number) => void
    nodeIdToRef: Map<number, React.RefObject<HTMLElement>>
    killActiveSelection: () => void
}

const AnnotationSidebar: React.FC<AnnotationSidebarType> = (props) => {

    const [replies, setReplies] = useStateWithCallbackLazy(List<ReplyType>())

    // sometimes we need to imperatively rerender
    const _setFlushes = useState(0)[1]
    const flush = () => _setFlushes(t => t + 1)

    const user = useContext(UserContext)

    const createReply = (parentId: number) => {
        setReplies(replies => replies.push({
            parent: parentId,
            card: {
                author: user['http://www.skepsi.com/username'],
                date: formatDate(new Date(Date.now())),
                beingEdited: true,
                userCouldEdit: true,
                activeReply: true,
                parentId: parentId,
            }
        }), flush)
    }

    const trees = Seq(annotationsToTreesOfAnnotationCards(props.annotations))
    const treeRefs: List<React.RefObject<HTMLDivElement>> = List(Array(trees.size).map(() => React.createRef()))

    const cardElements = List(trees
        .map(tree => overlayReplies(tree, replies))
        .map(tree => overlayReplyCreationCallbacks(createReply, tree))
        .map((tree, i) => (
            <AnnotationCard
                nodeRef={treeRefs.get(i)}
                key={tree.id}
                active={tree.id === props.activeAnnotationId}
                onClick={() => props.setActiveAnnotationId(tree.id === undefined? NaN: tree.id)}
                onChange={flush}
                killActiveSelection={props.killActiveSelection}
                {...tree} />
            ))
    )

    const cards = List(trees
        .map(tree => tree.id)
        .zip(cardElements)
        .map(([id, card]) => ({key: id || 0, card: card}))
    )

    const alignRefs = List(trees
        .map(tree => tree.annotation?._node_id.get(0, NaN) || NaN)
        .map(id => document.getElementById(nodeIdToPrettyId(id)))
        .map(el => ({current: el}))
    )

    // on first render, we can't see the document yet, so look again every 200 ms until we see it
    const [docRendered, setDocRendered] = useState(false)

    useEffect(() => {
        // if the document has not rendered yet, remind me to check again in 100 ms
        if (!docRendered){
            setTimeout(() => {
                const rendered = Boolean(alignRefs.filter(r => r.current).size)
                setDocRendered(rendered)
                if (!rendered){
                    flush()
                }
            }, 200)
        }
    })

    // const alignRefs = List(trees
    //     .map(tree => tree.annotation?._node_id.get(0, undefined) || undefined)
    //     .map(id => id === undefined? React.createRef<HTMLElement>(): props.nodeIdToRef.get(id, React.createRef<HTMLElement>()))
    // )

    const activeCardIndex = trees
        .map((x, i): [AnnotationCardType, number] => [x, i])
        .filter(([x]) => x.id === props.activeAnnotationId)
        .map(([_, i]) => i)
        .take(1)
        .get(0, NaN)

    return (
        <div>
            <CardAlignGroup
                cards={cards}
                alignRefs={alignRefs}
                activeCardIndex={activeCardIndex}/>
        </div>
    )
}

export default AnnotationSidebar
