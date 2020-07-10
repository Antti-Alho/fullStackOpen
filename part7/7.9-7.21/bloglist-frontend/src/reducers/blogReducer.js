import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE_BLOG':
      return state
        .map( a => a.id !== action.data.id ? a : action.data)
        .sort((a, b) => b.votes - a.votes)
    case 'NEW_BLOG':
      return action.data
    case 'INIT_BLOGS': 
      return action.data
    case 'DELETE_BLOG':
      return action.data
    default: return state
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    let blog = await blogService.getOne(id)
    blog.likes += 1
    await blogService.update(id, blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: blog,
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    await blogService.create({content: content, votes: 0})
    const blogs = await blogService.getAll()
    dispatch({
      type: 'NEW_BLOG',
      data: blogs,
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'DELETE_BLOG',
      data: blogs,
    })
  }
}

export default reducer