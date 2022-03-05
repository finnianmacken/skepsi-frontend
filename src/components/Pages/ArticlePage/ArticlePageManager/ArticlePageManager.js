import React, {useRef} from 'react'
import {gql, useQuery} from '@apollo/client'
import {useLocation} from 'react-router-dom'
import {Fade} from "react-awesome-reveal"

import Navbar from 'components/GlobalComponents/Navbar/Navbar.js'

import ArticlePageView from "../View/ArticlePageView/ArticlePageView"
import ArticlePageCover from "../Cover/ArticlePageCover/ArticlePageCover"

export const GET_PAPER_AND_ANNOTATION_DATA = gql`
    query GetPaperAndAnnotationData($paperId:ID!){
        annotationsByPaperId(paperId: $paperId){
            id
            content
            position
            quote
            childAnnotationCount
            start
            stop
            children{
                id
            }
            scores{
                id
                scoreNumber
                field
                explanation
            }
            author {
                username
            }
            parent{
                id
            }
        }
        papersById(paperId: $paperId){
            id
            title
            authors
            createdDate
            abstract
            citationAPA
            doi
            citationMLA
            figures{
                image
                figureNumber
                name
                caption
            }
            tables{
                image
                tableNumber
                name
                caption
            }
            citationChicago
            md
            topic{
                header
                slug
            }
            references{
                id
                authors
                title
                citation
                paperOrder
            }
        }
        scoresByPaperId(paperId:$paperId){
            field
            scoreNumber
        }
    }
`

const ArticlePageManager = () => {

    const location = useLocation()
    const paperId = location.pathname.replace('/', '')
    const {data, error, loading} = useQuery(GET_PAPER_AND_ANNOTATION_DATA, {variables: {"paperId": paperId}})

    const ref = useRef(null)

    const scrollToTop = () => {
        if (ref.current) {
            ref.current.scroll({top: 0, behavior: "smooth"})
        }
    }

    if (error){
        console.log(error)
        alert("An error occurred. Please reload the page, or check the console for details.")
    }

    return (
        <div ref={ref}>
            <div style={{height: "60px"}}>
                <Navbar/>
            </div>
            {(loading || error)
                ? ""
                : <Fade triggerOnce>
                    <ArticlePageCover
                        paperMetadata={data.papersById}
                        annotations={data.annotationsByPaperId}
                        scores={data.scoresByPaperId}/>

                    <ArticlePageView
                        document={data.papersById}
                        annotations={data.annotationsByPaperId}
                        scrollToTop={scrollToTop}/>
                </Fade>
            }
        </div>
    )
}

export default ArticlePageManager
