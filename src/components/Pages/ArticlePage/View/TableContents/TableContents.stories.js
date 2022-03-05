import React from "react"
import TableContents from "./TableContents"
import {mdToNode} from "../../logic/processing"

import "../../App.css"

export default {
    title: "Tooltip/TableContents",
    component: TableContents,
}

const md = `

# hi im a header

## im a header 2

# im another header

`

export const Example = () => (
    <TableContents content={mdToNode(md)} />
)
