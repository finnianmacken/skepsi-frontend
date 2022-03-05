import React, { useReducer } from 'react';
import { Card, Accordion, Dropdown, Icon } from 'semantic-ui-react'


function ScoreAnnotationCards(){
const accordionData = [
  {
    header: 'Header One',
    content: "Content One",
  },
  {
    header: 'Header Two',
    content: "Content Two",
  },
  {
    header: 'Header Three',
    content: "Content Three",
  },
  {
    header: 'Header Four',
    content: "Content Four",
  },
  {
    header: 'Header Five',
    content: "Content Five",
  }
]

const initialState = {
  activeScores: [false, false, false, false, false],
  activeCard: true
}

function reducer(state, action){
  switch(action.type){
    case 'toggleScore':
      let activeScores = [...state.activeScores]
      activeScores[action.payload] = !state.activeScores[action.payload]
      return {...state, activeScores: activeScores}
    case 'toggleCard':
      return {...state, activeCard: !state.activeCard}
    default:
      console.log("Wrong reducer input")
  }

}

const [state, dispatch] = useReducer(reducer, initialState)

// useEffect(()=>{
//   for(let i in accordionData){
//     state.activeScores.push('false')
//   }
// }, [])

const handleClick = value => () => {
  dispatch({type:'toggleScore', payload: value})
}

function handleHeaderClick(){
  dispatch({type: 'toggleCard'})
}

  return(
    <Card style={{
        zIndex: 2000,
        width: '95%',

      }}>
      <Accordion
        styled
        exclusive={false}
        fluid
      >
      <Accordion.Title
        onClick = {handleHeaderClick}
        active = {state.activeCard}>
      <Card.Header>
        <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            borderBottom: 'rgb(129, 128, 128, 0.5) 1px solid',
            justifyContent: 'flex-end'
          }}>
          <div>
            <p style={{
                fontSize: '20px',
                padding: '0px'
              }}>Finn Macken</p>
            <p style={{
                fontWeight: 'normal',
                position: 'relative',
                bottom: '25px'
              }}>4 hours ago</p>
          </div>
          <div style={{
              flex: 1
            }}>
          </div>
          <div className={"Options Bar"}
            style={{
              paddingTop: '3px',
            }}>
            <Dropdown floating icon="none" style={{paddingTop: '4px'}} trigger={
                <Icon name='ellipsis horizontal' size='large' color='grey' />
              }>
              <Dropdown.Menu>
                  <Dropdown.Item>
                    <Icon  name="edit" />
                    Edit Annotation
                  </Dropdown.Item>
                  <Dropdown.Item>
                      <Icon  name="eraser" />
                    Soft Delete Annotation
                  </Dropdown.Item>
                  <Dropdown.Item>
                      <Icon  name="delete" />
                    Delete Annotation
                  </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

      </Card.Header>
      </Accordion.Title>

      <Accordion.Content
        active = {state.activeCard}>
        <Card.Content>
          <p style={{fontSize:'14px'}}>I think this is really interesting</p>
        </Card.Content>


      {accordionData.map((score, index)=>
      <div>
      <Accordion.Title
        index={index}
        onClick={handleClick(index)}
        active = {state.activeScores[index]}
        >
        <p style={{fontSize: '14px'}}>{score.header}</p>
      </Accordion.Title>
      <Accordion.Content
        active = {state.activeScores[index]}
        >
        <p style={{fontSize: '14px'}}>{score.content}</p>
      </Accordion.Content>
      </div>
      )}
        </Accordion.Content>

      </Accordion>

    </Card>
  )
}

export default ScoreAnnotationCards
