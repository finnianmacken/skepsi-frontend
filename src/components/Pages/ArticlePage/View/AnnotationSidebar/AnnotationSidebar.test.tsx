import {Set, List} from "immutable"
import {annotationsToTreesOfAnnotationCards} from "./AnnotationSidebar"
import Annotation from "logic/annotation"

// it("can build the tree", () => {
//     const trees = annotationsToTreesOfAnnotationCards(Set([
//         {_id: 1, data: {children: [2, 3]}},
//         {_id: 2, data: {children: []}},
//         {_id: 3, data: {children: [4]}},
//         {_id: 4, data: {children: []}},
//     ].map(Annotation)))
//
//     expect(trees.size).toEqual(1)
//     expect(trees.get(0)?.id).toEqual(1)
//     expect(trees.get(0)?.replies?.length).toEqual(2)
//     expect(trees.get(0)?.replies?.map(a => a.id).sort()).toEqual([2, 3])
// })
//
// it("can build the tree with a user thing present", () => {
//     const trees = annotationsToTreesOfAnnotationCards(Set([
//         {_id: 0, _user: true},
//         {_id: 1, data: {children: [2, 3]}},
//         {_id: 2, data: {children: []}},
//         {_id: 3, data: {children: [4]}},
//         {_id: 4, data: {children: []}},
//     ].map(Annotation)))
//
//     expect(trees.size).toEqual(2)
//     expect(trees.map(t => t.id).sort()).toEqual(List.of(0, 1))
//     expect(trees.get(1)?.replies?.length).toEqual(2)
//     expect(trees.get(1)?.replies?.map(a => a.id).sort()).toEqual([2, 3])
// })
