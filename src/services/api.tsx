import axios from 'axios'
import Cookies from 'universal-cookie'

export const api = {
  post: async (url: string, data: any) => {
    const cookies = new Cookies()
    const token = cookies.get('token')
    const api_url = import.meta.env.VITE_API_URL
    const api_port = import.meta.env.VITE_API_PORT

    const tokenModifier = token && `Bearer ${token.accessToken}`

    const options = {
      method: 'POST',
      data,
      url: `${api_url}:${api_port}/api${url}/`,
      headers: {
        'Content-Type': 'application/json',
        Authentication: tokenModifier
      }
    }
    const response = await axios.request(options)

    return response
  }
}
