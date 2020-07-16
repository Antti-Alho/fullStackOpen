import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { logout } from '../reducers/loginReducer'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'

const NavBar = () => {
  const dispatch = useDispatch()
  let user = useSelector( state => state.user )

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="/blogs">Blogs</Nav.Link>
        <Nav.Link href="/users">Users</Nav.Link>
      </Nav>
      <Nav className="justify-content-end">
      {user 
        ? <Navbar.Text>logged in as {user.name} <Button variant="outline-light" onClick={handleLogout}>logout</Button> </Navbar.Text>
        : <Nav.Link href="/login">login</Nav.Link>
      }
      </Nav>
    </Navbar>
  )
}

export default NavBar