import React from 'react';
import { Reveal, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

function SignUpPageView(){

  const roleCards = [
    {
      icon: 'flask',
      role: 'Scientist',
      description: "A scientist, academic or graduate student. Uses ORCID for identification.",
      color: 'green',
      link: '/scientist-signup'
    },
    {
      icon: 'user',
      role: "User",
      description: "A general user, student, or non-academic",
      color: 'teal',
      link: '/user-signup'
    },
    {
      icon: 'book',
      role: "Domain Expert",
      description: "A non-academic with expertise in a specific field (e.g. computer programming)",
      color: 'blue',
      link: '/expert-signup'
    }
  ]


  return(
      <Card.Group centered={true}>
          {roleCards.map((card) =>
              <Link to={card.link}>
              <div>
                <Reveal animated='fade' style={{margin:'10px'}}>
                  <Reveal.Content visible>
                    <Card color={card.color} style={{height:'100px', width:'300px', display: 'flex', justifyContent:'center'}}>
                      <Card.Header style={{textAlign: 'center', fontSize:'20px', fontWeight:'bold', color:'black'}}>
                        <Icon name={card.icon}>
                        </Icon>
                        {card.role}
                      </Card.Header>
                    </Card>
                  </Reveal.Content>
                  <Reveal.Content hidden>
                    <Card color={card.color} style={{height:'100px', width:'300px', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    <Card.Content style={{textAlign: 'center', fontSize:'16px', fontWeight:'bold', color: 'black'}}>
                      {card.description}
                    </Card.Content>
                  </Card>
                </Reveal.Content>
              </Reveal>
              </div>
            </Link>
          )}
      </Card.Group>
  )
}

export default SignUpPageView
