import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NavBar from './components/NavBar'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/User'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import { setUserFromStorage } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const App = () => {
  const dispatch = useDispatch()
  //const blogToggleRef = React.createRef()
  //const loginToggleRef = React.createRef()
  let blogs = useSelector( state => state.blogs )
  let user = useSelector( state => state.user )

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(setUserFromStorage())
    dispatch(initUsers())
  }, [dispatch])

  return (
    <Router>
      <NavBar />
      <Notification />
      <Container >
        <Row className="justify-content-md-center">
          <Col md="auto" style={{minWidth: '800px'}}>
            <Switch>
              <Route path="/users/:id">
                <Card bg={'dark'} text={'light'} className="justify-content-md-center" style={{ marginTop: '25%' }} body>
                  <User/>
                </Card>
              </Route>
              <Route path="/users">
                <Card bg={'dark'} text={'light'} className="justify-content-md-center" style={{ marginTop: '25%' }} body>
                <Users/>
                </Card>
              </Route>
              <Route path="/blogs/:id">
                <Card bg={'dark'} text={'light'} className="justify-content-md-center" style={{ marginTop: '25%' }} body>
                <BlogView/>
                </Card>
              </Route>
              <Route path="/blogs">
                <Card bg={'dark'} text={'light'} className="justify-content-md-center" style={{ marginTop: '25%' }} body>
                {!user
                  ? null
                  : <Togglable buttonLabel="new blog" default={false}>
                      <BlogForm/>
                    </Togglable>
                }
                <div id='blog-list'>
                <h2>blogs</h2>
                {blogs.map(blog =>
                  <Link key={blog.id+'link'} to={`/blogs/${blog.id}`}>
                    <Blog 
                      key={blog.id}
                      blog={blog} />
                  </Link>
                )}
                </div>
                </Card>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/">
                <Login/>
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  )
}

export default App
