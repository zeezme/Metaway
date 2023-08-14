import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../../../services/api'
import { RootState } from '../../../redux/store'
import { show } from '../../../@core/components/modals/utils'

export interface usersTypeInterface {
  id?: any
  username: string
  nome: string
  dataNascimento: string
  cpf: string
  email: string
  telefone: string
  password?: string
  tipos?: Array<any>
}

interface State {
  fields: usersTypeInterface
  filters: usersTypeInterface
  usersList: Array<usersTypeInterface>
}

export const getUsersList = createAsyncThunk(
  'usersReducer/getUsersList',
  async ({ username, nome, cpf }: { username?: string; nome?: string; cpf?: string }) => {
    const targetObject =
      username || nome || cpf ? { termo: username || nome || cpf } : { termo: '' }

    const response = await api.post('/usuario/pesquisar', targetObject)
    if (response) {
      show.toast('Usuários pesquisados com sucesso!')
    }
    //Remove as senhas da array
    const usersWithoutPasswords = Object.values(response.data).map((user: any) => {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const { password, ...responseWithoutPassword } = user
      return responseWithoutPassword
    })

    return usersWithoutPasswords
  }
)

export const setUserInFocus = createAsyncThunk(
  'usersReducer/setUserInFocus',
  async (user: usersTypeInterface) => {
    return user
  }
)

export const updateUser = createAsyncThunk(
  'usersReducer/updateUser',
  async (user: usersTypeInterface, thunkAPI) => {
    const { getState } = thunkAPI
    const state = getState() as RootState

    api.post('/usuario/salvar', {
      tipos: state.globalReducer.user.roles,
      usuario: user
    })

    const updatedUsersList = await api.post('/usuario/pesquisar', { termo: '' })
    if (updatedUsersList) {
      show.toast('Usuário criado com sucesso!')
    }
    return updatedUsersList.data
  }
)

export const createUser = createAsyncThunk(
  'usersReducer/createUser',
  async ({ user, callback }: { user: usersTypeInterface; callback?: any }, thunkAPI) => {
    const response = await api.post('/usuario/salvar', {
      tipos: ['ROLE_USER'],
      usuario: user
    })
    if (response) {
      show.toast('Usuário criado com sucesso!')
      thunkAPI.dispatch(getUsersList({}))
      if (callback) {
        callback()
      }
      return response
    }
  }
)

const initialState: State = {
  fields: {
    nome: '',
    dataNascimento: '',
    cpf: '',
    email: '',
    telefone: '',
    username: '',
    password: '',
    tipos: []
  },
  filters: {
    id: 0,
    nome: '',
    dataNascimento: '',
    cpf: '',
    email: '',
    telefone: '',
    username: ''
  },
  usersList: []
}

export const usersSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUsersListValues: (
      state,
      action: PayloadAction<{ field: keyof usersTypeInterface; value: any }>
    ) => {
      const { field, value } = action.payload

      state.fields[field] = value
    },
    setUsersFilterValues: (
      state,
      action: PayloadAction<{ field: keyof usersTypeInterface; value: any }>
    ) => {
      const { field, value } = action.payload

      state.filters[field] = value
    },
    setFieldsValues: (
      state,
      action: PayloadAction<{ field: keyof usersTypeInterface; value: any }>
    ) => {
      const { field, value } = action.payload

      state.fields[field] = value
    },
    resetFields: (state) => {
      state.fields = initialState.fields
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.usersList = action.payload
    })
    builder.addCase(setUserInFocus.fulfilled, (state, action) => {
      state.fields = action.payload
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.usersList = action.payload
    })
  }
})

export const { setUsersListValues, setUsersFilterValues, resetFields, setFieldsValues } =
  usersSlice.actions

export default usersSlice.reducer
