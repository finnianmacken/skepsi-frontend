import React, {useRef} from "react"
import {List} from "immutable"
import CardAlignGroupCore, {CardEachType} from "./CardAlignGroupCore"

type CardAlignGroupType = {
    cards: List<{
        key: number
        card: JSX.Element
    }>
    alignRefs: List<React.RefObject<HTMLElement>>
    activeCardIndex: number
    margin?: number
    lookAgain?: number
}

const CardAlignGroup: React.FC<CardAlignGroupType> = (props) => {

    const refRef = useRef(useRef<null | HTMLDivElement>(null))
    const ref = refRef.current

    const heights = props.alignRefs.map((r) =>
        r.current === null || ref.current === null? 0:
            r.current.getBoundingClientRect().y - ref.current.getBoundingClientRect().y
    )

    const cards = props.cards.map((card, i): CardEachType => ({
        ...card,
        preferredOffset: heights.get(i, 0),
        active: props.activeCardIndex === i,
    }))

    return (
        <div ref={ref}>
            <CardAlignGroupCore
                cards={cards}
                margin={props.margin}/>
        </div>
    )
}

export default CardAlignGroup
