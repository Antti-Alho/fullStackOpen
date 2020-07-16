import React from 'react'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import { useHistory } from "react-router-dom"

const Users = () => {

  const history = useHistory()
  let users = useSelector( state => state.users )

  return(
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>User</th>
          <th># Blogs</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
        <tr key={user.id} onClick={ () => history.push(`/users/${user.id}`) }>
          <td key={user.id+'name'}>{user.name}</td>
          <td key={user.id+'length'}>{user.blogs.length}</td>
        </tr>
        )}
      </tbody>
    </Table>
  )

}

export default Users