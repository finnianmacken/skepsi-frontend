import React, {useState} from "react"
import Tooltip from "./Tooltip"

import "../../App.css"

export default {
    title: "Tooltip/Tooltip",
    component: Tooltip,
}

export const Example = () => (
    <Tooltip />
)

export const Interactive = () => {
    const [boxTop, setBoxTop] = useState(0)
    const [top, setTop] = useState(0)

    return (
        <div style={{margin: 50}}>
            <input value={boxTop} onChange={(e) => setBoxTop(e.target.value || "0")}/>
            <button onClick={() => setTop(parseInt(boxTop))}>set height</button>
            <Tooltip top={top} />
        </div>
    )
}
