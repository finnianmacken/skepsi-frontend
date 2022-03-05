import React, {useEffect, useRef, useState} from "react"
import {List, Map} from "immutable"
import {range} from "utility/functions"

type CardContainerType = {
    reportHeight: (height: number) => void
    style: any
}

const CardContainer: React.FC<CardContainerType> = (props) => {
    const ref = useRef<HTMLDivElement>(null)
    const height = ref.current
        ? ref.current.getBoundingClientRect().height
        : 0
    useEffect(() => props.reportHeight(height), [height])
    return <div ref={ref} style={props.style}>{props.children}</div>
}

export type CardEachType = {
    key: number
    preferredOffset: number
    card: JSX.Element
    active: boolean
}

type CardAlignGroupCoreType = {
    cards: List<CardEachType>
    margin?: number
}

const CardAlignGroupCore: React.FC<CardAlignGroupCoreType> = (props) => {

    const margin = props.margin || 5
    const cards = props.cards.sort((a, b) => a.preferredOffset - b.preferredOffset)
    const activeIndex = cards
        .map((c, i): [CardEachType, number] => [c, i])
        .filter(([c]) => c.active)
        .get(0, [0, 0])[1]

    const [cardHeightsMap, setCardHeightsMap] = useState(Map<number, number>())
    const cardHeights = cards.map((card) => cardHeightsMap.get(card.key, 0))

    const preferredOffsets = cards.map(c => c.preferredOffset)
    const adjustedOffsets = Array.from(preferredOffsets)

    // expand cards above
    for (const i of range(activeIndex)){
        adjustedOffsets[i] = Math.max(
            (adjustedOffsets[i - 1] || 0) + (i > 0? cardHeights.get(i - 1, 0) + margin : 0),
            preferredOffsets.get(i, 0)
        )
    }

    // set active card height
    adjustedOffsets[activeIndex] = preferredOffsets.get(activeIndex, 0)

    // nudge above cards back up as necessary
    for (const i of range(activeIndex).reverse()){
        adjustedOffsets[i] = Math.min(
            adjustedOffsets[i + 1] - margin - cardHeights.get(i, 0),
            adjustedOffsets[i]
        )
    }

    // expand cards below
    for (const i of range(activeIndex + 1, cards.size)){
        adjustedOffsets[i] = Math.max(
            adjustedOffsets[i - 1] + cardHeights.get(i - 1, 0) + margin,
            preferredOffsets.get(i, 0)
        )
    }

    return (
        <div style={{position: "relative"}}>
            {cards.map((card, i) =>
                <CardContainer
                    key={card.key}
                    reportHeight={(val: number) => setCardHeightsMap(m => m.set(card.key, val))}
                    style={{transition: "top 0.5s", position: "absolute", top: adjustedOffsets[i]}}>
                    {card.card}
                </CardContainer>
            )}
        </div>
    )
}

export default CardAlignGroupCore
