import React from "react"
import MathJax from "react-mathjax"

const Tex = (props) => {
    return (
        <span className={"Tex"}>
            <MathJax.Node {...props} />
        </span>
    )
}

export default Tex
