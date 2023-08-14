import { combineReducers } from 'redux'
import globalReducer from './globalReducer.tsx'
import loginStore from '../views/login/store/loginStore.tsx'
import usersStore from '../views/users/store/usersStore.tsx'
import homeStore from '../views/home/store/homeStore.tsx'
import peopleStore from '../views/people/store/peopleStore.tsx'
import userInfoStore from '../views/userInfo/store/userInfoStore.tsx'

const rootReducer = combineReducers({
  globalReducer,
  loginStore,
  usersStore,
  homeStore,
  peopleStore,
  userInfoStore
})

export default rootReducer
