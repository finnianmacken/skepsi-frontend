import {gql} from "@apollo/client"

export const UPDATE_ANNOTATION = gql`
    mutation UpdateAnnotation($author: String, $quote: String, $content:String, $id: ID){
        updateAnnotation(annotationData:{author:$author, quote:$quote, content:$content, id:$id}){
            annotation{
                id
                author{
                    username
                }
                quote
                content
            }
        }
    }
`

export const CREATE_ANNOTATION = gql`
    mutation CreateAnnotation($start: Int!, $stop: Int!, $author: String!, $quote: String, $content: String!, $paperId: ID!, $parentId: ID) {
        createAnnotation(start: $start, stop: $stop, author: $author, quote: $quote, content: $content, paperId: $paperId, parentId: $parentId){
            annotation {
                id
                author {
                    username
                }
                quote
                content
                start
                stop
            }
        }
    }
`

export const DELETE_ANNOTATION = gql`
    mutation DeleteAnnotation($annotationId: ID!){
        deleteAnnotation(annotationId: $annotationId){
            annotation{
                content
            }
        }
    }
`

export const UPDATE_SCORE = gql`
    mutation UpdateScore($scoreId:ID!, $explanation: String, $scoreNumber: Int, $field: String){
        updateScore(scoreId:$scoreId, explanation: $explanation, scoreNumber: $scoreNumber, field: $field){
            score{
                id
                explanation
                scoreNumber
                field
            }
        }
    }
`

export const CREATE_SCORE = gql`
    mutation CreateScore($annotationId: ID!, $scoreNumber: Int!, $explanation: String, $field: String){
        createScore(annotationId: $annotationId, scoreNumber: $scoreNumber, explanation: $explanation, field: $field){
            score{
                id
                explanation
                scoreNumber
                field
            }
        }
    }
`

export const DELETE_SCORE = gql`
    mutation DeleteScore($scoreId:ID!){
        deleteScore(scoreId: $scoreId){
            score{
                explanation
            }
        }
    }
`

export const PLACEHOLDER_MUTATION = gql`
    mutation PlaceholderMutation($placeholderField: String){
        placeholderMutation(placeholderField:$placeholderField){
            score{
                id
            }
        }
    }
`
