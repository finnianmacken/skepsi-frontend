import { useQuery, useMutation, gql } from '@apollo/client'

// Creating annotations
const CREATE_ANNOTATION = gql`
  mutation CreateAnnotation($author: String, $quote: String, $content:String, $id: ID){
    createAnnotation(annotationData:{author:$author, quote:$quote, content:$content, id:$id}){
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
[createAnnotation, { data, loading, error }] = useMutation(CREATE_ANNOTATION)

// Reading annotations
const GET_ALL_ANNOTATIONS = gql`
  query GetAllAnnotations{
    allAnnotations{
      id
      author{
        id
        username
        email
      }
    }
  }
`

{ data, loading, error } = useQuery(GET_ALL_ANNOTATIONS)

const GET_ANNOTATIONS_BY_AUTHOR = gql`
  query AnnotationsByAuthor($username:String!){
    annotationsByAuthor(username:$username){
      id
      author{
        username
      }
    }
  }
`
{ data, loading, error } = useQuery(GET_ANNOTATIONS_BY_AUTHOR)

const GET_ANNOTATIONS_BY_ID = gql`
query AnnotationsById($id:ID!){
  annotationsById(id:$id){
    id
    author{
      username
    }
    content
    quote
  }
}
`
{ data, loading, error } = useQuery(GET_ANNOTATIONS_BY_ID)


// Updating annotations
const UPDATE_ANNOTATION = gql`
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

[updateAnnotation, { data, loading, error }] = useMutation(UPDATE_ANNOTATION)

// Deleting annotations
const DELETE_ANNOTATION = gql`
  mutation DeleteAnnotation($id: ID){
    deleteAnnotation(id:$id){
    	annotation{
      	id
      }
    }
  }
`

const SOFT_DELETE_ANNOTATION = gql`
  mutation SoftDeleteAnnotation($id: ID!){
    softDeleteAnnotation(id:$id){
      annotation{
        id
        content
      }
    }
  }
`

[deleteAnnotation, { data, loading, error}] = useMutation(DELETE_ANNOTATION)
