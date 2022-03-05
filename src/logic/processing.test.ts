// import {Annotation, AnnotationType, ContentNode, ContentNodeType} from "./types"
// import {
//     assignAnnotations,
//     doMarkFirst,
//     getAnnotationText,
//     mdToNode,
//     nodeMap,
//     nodesInNode,
//     translateAnnotation,
//     trickleUpAnnotations,
//     weaveMDAnnotations,
// } from "./processing"
// import {List, Set} from "immutable"
//
// it("can translateAnnotation", () => {
//     const a = Annotation({start: 5, stop: 15})
//     expect(translateAnnotation(5, 6, a))
//         .toEqual(a.merge({start: 0, stop: 1}))
//     expect(translateAnnotation(4, 6, a))
//         .toEqual(a.merge({start: 1, stop: 2}))
//     expect(translateAnnotation(10, 20, a))
//         .toEqual(a.merge({start: 0, stop: 5}))
// })
//
// it("knows when to throw when doing translateAnnotation", () => {
//     expect(() => translateAnnotation(0, 1, Annotation({start: 2, stop: 3})))
//         .toThrow()
//
//     const a = Annotation({_id: 0, start: 0, stop: 0})
//     expect(translateAnnotation(0, 1, a)).toEqual(a)
// })
//
// const doc = List([
//     ContentNode({type: "Text", content: "hi im a header"}),  // len = 14
//     ContentNode({type: "hr"}),
//     ContentNode({type: "Text", content: "hello world"})        // len = 11
// ])
//
// const [a0, a1, a2] = [
//     Annotation({_id: 0, start: 0, stop: 14}),
//     Annotation({_id: 1, start: 5, stop: 17}),
//     Annotation({_id: 2, start: 15, stop: 16})
// ]
// const A = Set([a0, a1, a2])
//
// it("can doMarkFirst", () => {
//
//     const asFirst = (thing: any) => (thing as AnnotationType).merge({_first: true})
//     const asNotFirst = (thing: any) => (thing as AnnotationType).merge({_first: false})
//
//     const thing = List([
//         ["hi", Set([a0, a1])],
//         ["bro", Set([a0, a2])]
//     ]) as List<[string, Set<AnnotationType>]>
//
//     expect(
//         doMarkFirst(thing, (a) => a._id + "")
//             .map(([_, x]) => Set(x))) // unordered, annotations only
//         .toEqual(
//             List([
//                 Set([asFirst(a0), asFirst(a1)]),
//                 Set([asNotFirst(a0), asFirst(a2)])
//             ])
//         )
// })
//
// it("can assignAnnotations", () => {
//     const calcLength = (b: ContentNodeType) => typeof b.content === "string"? b.content.length: 0
//     const assigned = assignAnnotations(calcLength, A, doc)
//
//     // assigns to the first piece of content and marks them as first
//     expect(Set((assigned.get(0) as [ContentNodeType, Set<AnnotationType>])[1]))
//         .toEqual(Set([
//             a0.merge({start: 0, stop: 14}),
//             a1.merge({start: 5, stop: 14})
//         ]))
//
//     // assigns to empty intermediate annotations
//     expect(Set((assigned.get(1) as [ContentNodeType, Set<AnnotationType>])[1]))
//         .toEqual(Set([a1.merge({start: 0, stop: 0})]))
//
//     // assigns to second nonempty, translating and not marking first
//     expect(Set((assigned.get(2) as [ContentNodeType, Set<AnnotationType>])[1]))
//         .toEqual(Set([
//             a1.merge({start: 0, stop: 3}),
//             a2.merge({start: 1, stop: 2})
//         ]))
// })
//
// it("can parse mdToNode", () => {
//     expect(mdToNode("hello world").type).toEqual("div")
//     expect(((mdToNode("hello world")
//         .content as List<ContentNodeType>)
//         .get(0) as ContentNodeType).type)
//         .toEqual("paragraph")
//
//     expect(((((mdToNode("hello *world*")
//         .content as List<ContentNodeType>)
//         .get(0) as ContentNodeType)
//         .content as List<ContentNodeType>)
//         .get(1) as ContentNodeType).type)
//         .toEqual("em")
// })
//
// it("can traverse nodesInNode", () => {
//     const n = mdToNode("hello *world*")
//     expect(Set(nodesInNode(n).map(n => n.type)))
//         .toEqual(Set(["div", "paragraph", "text", "em"]))
//     expect(nodesInNode(n).size).toEqual(5)
// })
//
// it("can nodeMap", () => {
//     expect(
//         Set(nodesInNode(
//             nodeMap(mdToNode("hello *world*"), x => x.merge({type: "bro"}))
//         ).map(x => x.type)))
//         .toEqual(Set(["bro"]))
// })
//
// it("can trickle up Annotations", () => {
//     const a = Annotation()
//     const b = Annotation()
//
//     // from single child node
//     expect(trickleUpAnnotations(
//         ContentNode({
//             content: ContentNode({
//                 props: {annotations: Set.of(a)}
//             })
//         })
//     ).props.annotations).toEqual(Set.of(a))
//
//     // from list of child nodes
//     expect(Set(
//         trickleUpAnnotations(
//             ContentNode({
//                 content: List([
//                     ContentNode({props: {annotations: Set.of(a)}}),
//                     ContentNode({props: {annotations: Set.of(b)}})
//                 ])
//             })
//         ).props.annotations || [])).toEqual(Set([a, b]))
// })
//
// const text = "hello *world*"
// const annotations = Set([
//     Annotation({
//         _id: 0,
//         start: 0,
//         stop: 5,
//         data: {m: "uno"}
//     }),
//     Annotation({
//         _id: 1,
//         start: 5,
//         stop: 7,
//         data: {m: "dos"}
//     })
// ])
//
// it("can getAnnotationText", () => {
//     expect(getAnnotationText(mdToNode(text), annotations).map(a => a._text))
//         .toEqual(Set.of("hello", " w"))
// })
//
// it("can weaveMDAnnotations", () => {
//     const [t, a] = weaveMDAnnotations(text, annotations)
//     // expect(nodesInNode(t).map(n => {
//     //     console.log(n)
//     //     return n.props.annotations ?
//     //         n.props.annotations.map((a: AnnotationType) => a.data.m).toJS().sort() :
//     //         null
//     // })).toEqual(
//     //     List([
//     //         ["uno", "dos"],   // top level div
//     //         ["uno", "dos"],   // paragraph
//     //         ["uno", "dos"],   // text
//     //         ["dos"],          // em
//     //         ["dos"]           // text
//     //     ])
//     // )
//     expect(a.map(a => a._text)).toEqual(Set(["hello", " w"]))
// })
