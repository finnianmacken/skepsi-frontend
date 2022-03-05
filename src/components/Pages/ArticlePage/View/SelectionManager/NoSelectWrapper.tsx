import React from "react"
import {NO_SELECT_CLASS} from "./SelectionManager"

const NoSelectWrapper: React.FC = (props) => {
    return (
        <span className={"NoSelectWrapper " + NO_SELECT_CLASS}>
            {props.children}
        </span>
    )
}

export default NoSelectWrapper
