import { store } from '../../../redux/store'

export const themeColors = () => {
  if (store.getState().globalReducer.theme === 'light') {
    return {
      bg: 'bg-dark',
      bgReverse: 'bg-light',
      text: 'text-white'
    }
  } else {
    return {
      bg: 'bg-light',
      bgReverse: 'bg-dark',
      text: 'text-dark'
    }
  }
}
