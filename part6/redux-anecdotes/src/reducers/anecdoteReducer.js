import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state
        .map( a => a.id !== action.data.id ? a : action.data)
        .sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES': 
      return action.data
    default: return state
  }
}

export const vote = id => {
  return async dispatch => {
    let anecdote = await anecdoteService.getOne(id)
    anecdote.votes += 1
    await anecdoteService.update(id, anecdote)
    dispatch({
      type: 'VOTE',
      data: anecdote,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.create({content: content, votes: 0})
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote,
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer