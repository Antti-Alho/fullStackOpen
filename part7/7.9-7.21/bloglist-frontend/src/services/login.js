import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { userName: username, password: password })
  return response.data
}

export default { login }