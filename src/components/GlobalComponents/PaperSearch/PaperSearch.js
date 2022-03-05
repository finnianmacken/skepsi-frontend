import _ from 'lodash'
import React from 'react'
import {Search} from 'semantic-ui-react'
import PaperSearchCards from './PaperSearchCards.js'
import styles from './PaperSearch.module.css'
import './PaperSearch.css'


const initialState = {
    loading: false,
    results: [],
    value: '',
}

function exampleReducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return {...state, loading: true, value: action.query}
        case 'FINISH_SEARCH':
            return {...state, loading: false, results: action.results}
        case 'UPDATE_SELECTION':
            return {...state, value: action.selection}

        default:
            throw new Error()
    }
}

function PaperSearch(props) {
    const [state, dispatch] = React.useReducer(exampleReducer, initialState)
    const {results, value} = state
    const resultRenderer = (data) => <PaperSearchCards data={data} topicArray={topicArray}/>

    const topicSet = new Set(props.papers ? props.papers.map(paper => paper.topic.header) : null)
    const topicArray = Array.from(topicSet)

    const timeoutRef = React.useRef()
    const handleSearchChange = React.useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({type: 'START_SEARCH', query: data.value})

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({type: 'CLEAN_QUERY'})
                return
            }

            const re = new RegExp(_.escapeRegExp(data.value), 'i')

            const isTitleMatch = result => re.test(result.title)
            const isAuthorMatch = result => re.test(result.authors)
            const isTopicMatch = result => re.test(result.topic.header)
            const isMatch = (result) => isTitleMatch(result) || isAuthorMatch(result) || isTopicMatch(result)

            dispatch({
                type: 'FINISH_SEARCH',
                results: _.filter(props.papers, isMatch),
            })
        }, 0)
    }, [props.papers])

    React.useEffect(() => () => clearTimeout(timeoutRef.current), [])

    // useEffect(()=>{
    //   console.log('this is the topic array:', topicArray)
    // }, [topicArray])

    return (
        <div className={styles.searchWrapper}>
            <Search
                id={styles.searchBar}
                fluid
                onResultSelect={(e, data) =>
                    dispatch({type: 'UPDATE_SELECTION', selection: data.result.title})
                }
                onSearchChange={handleSearchChange}
                results={results}
                value={value}
                resultRenderer={resultRenderer}
                placeholder={"Search by title, author or topic"}
            />
        </div>
    )
}

export default PaperSearch
