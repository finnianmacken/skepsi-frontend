/*

File for all the functions that should have been built into javascript

 */

import React from "react"
import {Collection, List, RecordOf, Set} from "immutable"
import renderer from "react-test-renderer"
import curry from "just-curry-it"

/*
Whether the list is ascending monotonically (a > b)
 */
export const isAscending = (arr: Array<number>) => arr.every(
    (x, i) => i === 0 || x > arr[i - 1]
)

export const convolve = (<ItemType, ReturnType, StateType>(fn: (item: ItemType, state: StateType) => [ReturnType, StateType], initial: StateType, items: List<ItemType>) => {
    let currentState = initial
    return items.map((item: ItemType) => {
        const [r, s] = fn(item, currentState)
        currentState = s
        return r
    })
})

export const printImmutable = (c: Collection<any, any> | RecordOf<any>, multiline?: boolean) => {
    if (multiline) {
        console.log(JSON.stringify(c.toJS(), null, 4))
    } else {
        console.log(JSON.stringify(c.toJS()))
    }
}

/*
Snapshot testing for stories files. Usage:

```
const stories = require("./FooComponent.stories");
testStories(stories);
```
 */
export const testStories = (stories: any) => {
    const sObject = Object.create(stories)
    const toTest = []

    for (let name in stories) {
        if (name !== "default"){
          // @ts-ignore
            toTest.push(sObject[name]) // raises linter warning
        }
    }

    test.each(toTest)(
        "render",
        c => expect(renderer.create(React.createElement(c)).toJSON()).toMatchSnapshot()
    )
}

export const spy = <T>(thing: T): T => {
    console.log(thing);
    return thing
}

export const spyWith = curry((fn: Function, thing: any) => spy(fn(thing)))

export const formatDate = (date: Date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const maxOfIterable = <T>(lst: List<T> | Set<T> | Array<T>, val: (x: T) => number): T | undefined => {
    let best: T | undefined = undefined
    let bestVal = -Infinity

    lst.forEach(item => {
        const v = val(item)
        if (v > bestVal) {
            bestVal = v
            best = item
        }
    })
    return best
}

export const range = (start: number, stop?: number, step?: number) => {
    step = step || 1
    if (stop === undefined){
        stop = start
        start = 0
    }

    if (Math.sign(start - stop) === Math.sign(step)){
        return []
    }

    const arr = []
    while (Math.sign(start - stop) === -Math.sign(step)){
        // @ts-ignore
        arr.push(start)
        start += step
    }
    return arr
}

export const zip = <T, U>(a1: T[], a2: U[]): [T, U][] => (
    range(Math.min(a1.length, a2.length)).map(i => [a1[i], a2[i]])
)

export const pick = <T>(keys: [keyof T], obj: T) => {
    const newObj: Partial<T> = {}
    for (const k of keys){
        newObj[k] = obj[k]
    }
    return newObj
}
