import React from 'react'
import Annotation, {AnnotationType} from "logic/annotation"
import './SelectionManager.css'
import {TOP_LEVEL_CONTENT_CLASS, TOP_LEVEL_OFFSET_ATTRIBUTE_NAME} from "../TopLevelContentBlock/TopLevelContentBlock"

// class for elements which should not be selectable
export const NO_SELECT_CLASS = "SelectionManager-no-select"

/*
finds the length of the text in the range not counting any elements which match selector
 */
const rangeTrueLen = (node: DocumentFragment | Element, selector: string): number => {
    if (node.children.length){
        return Array.from(node.children)
            .filter(el => !el.matches(selector))
            .map(el => rangeTrueLen(el, selector))
            .reduce((current, next) => current + next, 0)
    } else {
        return node.textContent?.length || 0
    }
}

/*
uses window.getSelection() to get the user's current selection and generates a corresponding annotation, deleting the
selection when done
 */
const getSelectionRelativePosition = () => {
    let selectionRange
    try {
        selectionRange = window.getSelection()?.getRangeAt(0)
    } catch (err){
        console.log(err)
        return null
    }

    if (selectionRange && !selectionRange.collapsed){

        // the length of the actual things the user has selected
        const selectionLen = rangeTrueLen(selectionRange.cloneContents(), "." + NO_SELECT_CLASS)

        // complicated operations to measure the distance between an element and the start of the document
        selectionRange.setEnd(selectionRange.startContainer, selectionRange.startOffset)

        const enclosingTopLevelContentNode =
            selectionRange.startContainer
            && selectionRange.startContainer.parentElement
            && selectionRange.startContainer.parentElement.closest("." + TOP_LEVEL_CONTENT_CLASS)

        if (!enclosingTopLevelContentNode){
            return null
        }

        const ecos = enclosingTopLevelContentNode.getAttribute(TOP_LEVEL_OFFSET_ATTRIBUTE_NAME)
        const enclosingElementOffset = parseInt(ecos || "")

        selectionRange.setStartBefore(enclosingTopLevelContentNode)

        const offset = rangeTrueLen(selectionRange.cloneContents(), "." + NO_SELECT_CLASS) + enclosingElementOffset

        selectionRange.collapse()
        selectionRange.detach()

        if (selectionLen !== 0 && !isNaN(offset) && !isNaN(selectionLen)){
            return Annotation({start: offset, stop: offset + selectionLen, _activeHighlight: true})
        }
    }

    return null
}

type SelectionManagerType = {
    selectionCallback: (annotation: AnnotationType | null) => void
}

/*
Wraps some text. When the text is selected, it creates an `Annotation` and feeds it to `selectionCallback`.
 */
const SelectionManager: React.FC<SelectionManagerType> = (props) => {
    const onMouseUp = () => {
        props.selectionCallback(getSelectionRelativePosition())
    }
    const onMouseDown = () => props.selectionCallback(null)

    return (
        <div
            className={"SelectionManager"}
            id={"SelectionManager-reference"}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}>
            {props.children}
        </div>
    )
}

export default SelectionManager
