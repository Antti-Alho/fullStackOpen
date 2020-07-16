import React from 'react'
import { login } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/field'
import { useHistory } from "react-router-dom"

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


const LoginForm = () => {

  const history = useHistory()
  const username = useField('text')
  const password = useField('text')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(login(username.value, password.value))
    username.onReset()
    password.onReset()
    history.push('/blogs')
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card bg={'dark'} text={'light'} className="justify-content-md-center" style={{ marginTop: '25%' }}>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Form id="login-form" onSubmit={handleSubmit}>
                <Card.Text>
                  <Row>
                    <Form.Label>Username</Form.Label>
                    <Form.Control {...username}/>
                  </Row>
                  <Row>
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...password}/>
                  </Row>
                </Card.Text>
                <Button id="login-button" variant="primary" type="submit">  login</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginForm
