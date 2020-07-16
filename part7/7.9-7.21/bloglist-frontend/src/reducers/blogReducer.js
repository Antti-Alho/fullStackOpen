import blogService from '../services/blogs'
import commentService from '../services/comment'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE_BLOG':
      return action.data.sort((a, b) => b.likes - a.likes)
    case 'NEW_BLOG':
      return action.data
    case 'INIT_BLOGS': 
      return action.data
    case 'COMMENT_BLOG': 
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
    delete blog.user
    delete blog.comments
    await blogService.update(id, blog)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'LIKE_BLOG',
      data: blogs,
    })
  }
}

export const commentBlog = (id, comment) => {
  return async dispatch => {
    await commentService.newComment(id, {comment: comment})
    const blogs = await blogService.getAll()
    dispatch({
      type: 'COMMENT_BLOG',
      data: blogs,
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    await blogService.create({...content, votes: 0})
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