import React, {useState} from "react"
import CardAlignGroupCore from "./CardAlignGroupCore"
import {range} from "../functions"

export default {
    title: "Annotations/CardAlignGroupCore",
    component: CardAlignGroupCore,
}

export const Basic = () => {
    const [active, setActive] = useState(0)
    return (
        <div style={{marginTop: 300, width: 400, display: "flex", flexDirection: "row"}}>
            <input value={active} onChange={e => setActive(parseInt(e.target.value))}/>
            <div style={{borderTop: "1px solid black"}}>
                <CardAlignGroupCore
                    activeCardIndex={active}
                    preferredOffsets={Array(5).fill(0)}
                    cards={range(5).map(i =>
                        <div style={{backgroundColor: "red", width: 50, height: 50,}}>{i}</div>)}/>
            </div>
        </div>
    )
}
