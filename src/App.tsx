import { Router } from './router/router'
import { createTheme } from 'react-data-table-component'
import axios from 'axios'
import { show } from './@core/components/modals/utils'
import 'cleave.js/dist/addons/cleave-phone.br'

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error)
    show.error(error.response.data.message)
    if (error.response) {
      if (error.response.status === 401) {
        show.toastError('Erro 401: Sessão expirada')
      } else if (error.response.status === 404) {
        show.toastError('Erro 404: Endereço não encontrado')
      }
    } else if (error.request) {
      console.error('Erro de requisição:', error.request)
    } else {
      console.error('Erro:', error.message)
    }

    return Promise.reject(error)
  }
)

createTheme(
  'metawayDark',
  {
    text: {
      primary: 'rgba(255,255,255)',
      secondary: 'rgba(255,255,255)',
      disabled: 'rgba(255,255,255)'
    },
    background: {
      default: ''
    },
    context: {
      background: '#FFFFFF',
      text: '#FFFFFF'
    },
    divider: {
      default: '#FFFFFF'
    },
    action: {
      button: 'rgba(250,250,250)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)'
    }
  },
  'light'
)
createTheme(
  'metawayLight',
  {
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
    background: {
      default: ''
    },
    context: {
      background: '#e3f2fd',
      text: 'rgba(0, 0, 0, 0.87)'
    },
    divider: {
      default: 'rgba(0,0,0,.12)'
    },
    button: {
      default: 'rgba(0,0,0,.54)',
      focus: 'rgba(0,0,0,.12)',
      hover: 'rgba(0,0,0,.12)',
      disabled: 'rgba(0, 0, 0, .18)'
    },
    selected: {
      default: '#e3f2fd',
      text: 'rgba(0, 0, 0, 0.87)'
    },
    highlightOnHover: {
      default: '#EEEEEE',
      text: 'rgba(0, 0, 0, 0.87)'
    },
    striped: {
      default: '#FAFAFA',
      text: 'rgba(0, 0, 0, 0.87)'
    }
  },
  'light'
)
function App() {
  return <Router />
}

export default App
