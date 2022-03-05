import React, {useState} from "react"
import CardAlignGroup from "./CardAlignGroup"
import {range} from "../functions"

export default {
    title: "Annotations/CardAlignGroup",
    component: CardAlignGroup,
}

export const Example = () => {
    const n = 20

    const [activeIndex, setActiveState] = useState(0)
    const [anchorRefs] = useState(range(n).map(() => React.createRef<HTMLDivElement>()))

    return (
        <div>
            <p>active: {activeIndex}</p>
            <div style={{display: "flex", flexDirection: "row", height: 400, width: 400}}>
                <div style={{height: 400, width: 200, overflow: "auto"}}>
                    {
                        range(0, 10).map((x, i) =>
                            <div
                                ref={anchorRefs[i]}
                                onClick={() => setActiveState(x)}
                                style={{height: 25, width: 50, backgroundColor: "lightblue"}}>
                                {x}
                            </div>
                        )
                    }
                    <div style={{height: 100}}/>
                    {
                        range(10, n).map((x) =>
                            <div
                                ref={anchorRefs[x]}
                                onClick={() => setActiveState(x)}
                                style={{height: 25, width: 50, backgroundColor: "lightblue"}}>
                                {x}
                            </div>
                        )
                    }
                </div>
                <div style={{height: 400, width: 200, overflow: "auto"}}>
                    <CardAlignGroup
                        cards={
                            range(n).map(x =>
                                <div
                                    style={{height: 50, width: 50, backgroundColor: "red"}}>
                                    {x}
                                </div>
                            )
                        }
                        alignRefs={anchorRefs}
                        activeCardIndex={activeIndex}/>
                </div>
            </div>
        </div>
    )
}
