import axios from 'axios'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
const token = cookies.get('token')
const api_url = import.meta.env.VITE_API_URL
const api_port = import.meta.env.VITE_API_PORT

const tokenModifier = token && `Bearer ${token.accessToken}`
export const api = {
  post: async (url: string, data: any) => {
    const options = {
      method: 'POST',
      data,
      url: `${api_url}:${api_port}/api${url}/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokenModifier
      }
    }
    const response = await axios.request(options)

    return response
  },
  get: async (url: string, data?: string) => {
    const options = {
      method: 'GET',
      url: `${api_url}:${api_port}/api${url}${data ? `/${data}` : ''}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokenModifier
      }
    }
    const response = await axios.request(options)

    return response
  },
  delete: async (url: string, data?: string) => {
    const options = {
      method: 'DELETE',
      url: `${api_url}:${api_port}/api${url}${data ? `/${data}` : ''}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokenModifier
      }
    }
    const response = await axios.request(options)

    return response
  },
  put: async (url: string, data: any) => {
    const options = {
      method: 'PUT',
      data,
      url: `${api_url}:${api_port}/api${url}/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokenModifier
      }
    }
    const response = await axios.request(options)
    return response
  },
  cep: async (cep: string) => {
    const options = {
      method: 'GET',
      url: `https://viacep.com.br/ws/${cep}/json/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: tokenModifier
      }
    }
    const response = await axios.request(options)
    return response
  },
  image: async (url: string, data: any) => {
    const formData = new FormData()

    formData.append('foto', data)

    const response = await axios.post(`${api_url}:${api_port}/api${url}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: tokenModifier }
    })

    return response
  },
  imageDownload: async (url: string) => {
    try {
      const response = await fetch(`${api_url}:${api_port}/api${url}/`, {
        headers: { Authorization: tokenModifier }
      })

      if (!response.ok) {
        throw new Error('Erro na solicitação')
      }

      const imagemArrayBuffer = await response.arrayBuffer()

      const blob = new Blob([imagemArrayBuffer], { type: 'image/jpeg' })
      const urlDoBlob = URL.createObjectURL(blob)

      return urlDoBlob
    } catch (error) {
      console.error('Erro:', error)
      throw error
    }
  }
}
