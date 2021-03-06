import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => token = `${newToken}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
    return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, { headers: { Authorization: token } })
  return request.then(response => response.data)
}

export default { 
  setToken,
  getAll,
  getOne,
  create,
  deleteBlog,
  update
}
