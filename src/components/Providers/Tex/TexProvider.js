import React from "react"
import MathJax from "react-mathjax"

const TexProvider = (props) => {

    // const outputFormat = "SVG"
    const outputFormat = "CHTML"

    return (
        <MathJax.Provider
            script={`https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_${outputFormat}`}
            options={{
                SVG: {scale: 100},
            }}>
            {props.children}
        </MathJax.Provider>
    )
}

export default TexProvider
