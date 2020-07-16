import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return action.data
    case 'LOGIN':
      return action.data
    case 'SET_FROM_LOCALSTORAGE':
      return action.data
    default: return state
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({
      type: 'LOGOUT',
      data: null,
    })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login(username, password)
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const setUserFromStorage = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    let user = null
    if (loggedUserJSON !== null) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_FROM_LOCALSTORAGE',
        data: user,
      })
    }
  }
}

export default reducer
