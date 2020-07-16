import userService from '../services/user'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_USER':
      return action.data
    case 'INIT_USERS':
      return action.data
    case 'DELETE_USER':
      return action.data
    default: return state
  }
}

export const createUser = (content) => {
  return async dispatch => {
    await userService.create({ ...content })
    const users = await userService.getAll()
    dispatch({
      type: 'NEW_USER',
      data: users,
    })
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await userService.deleteBlog(id)
    const users = await userService.getAll()
    dispatch({
      type: 'DELETE_USER',
      data: users,
    })
  }
}

export default reducer