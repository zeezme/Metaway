import Cookies from 'universal-cookie'
import { store } from '../redux/store'
import { logout } from '../redux/globalReducer'
export const verifyJwtExp = () => {
  const cookies = new Cookies()
  const user = cookies.get('token')
  const sessionExpiration = cookies.get('sessionExpiration')

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }

  if (sessionExpiration) {
    const endDate = new Date(sessionExpiration)

    if (endDate.getTime() < Date.now()) {
      store.dispatch(logout())
    }
  }

  if (user) {
    const decodedJwt = parseJwt(user?.accessToken)
    if (decodedJwt.exp * 1000 < Date.now()) {
      cookies.remove('token')
      store.dispatch(logout())
      return 'expired'
    } else {
      return 'valid'
    }
  }
}
