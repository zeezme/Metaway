import { combineReducers } from 'redux'
import globalReducer from './globalReducer.tsx'
import loginStore from '../views/login/store/loginStore.tsx'

const rootReducer = combineReducers({
  globalReducer,
  loginStore
})

export default rootReducer
