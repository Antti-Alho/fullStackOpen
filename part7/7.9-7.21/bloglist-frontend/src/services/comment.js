import axios from 'axios'
const baseUrl = '/api/comments'

const newComment = async (blogID, comment) => {
  const response = await axios.post(`${baseUrl}/${blogID}`, comment)
  return response.data
}

export default {
  newComment
}
