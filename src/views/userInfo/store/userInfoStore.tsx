import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../../services/api'
import { RootState } from '../../../redux/store'
import { show } from '../../../@core/components/modals/utils'
import { logout } from '../../../redux/globalReducer'

export interface userInterface {
  id?: number
  nome: string
  username: string
  cpf: string
  dataNascimento: string
  email: string
  telefone: string
  password?: string
}

export interface passwordChangeInterface {
  password: string
  newPassword: string
}

interface State {
  fields: userInterface
  passwordChange: passwordChangeInterface
}

export const getLoggedUser = createAsyncThunk('peopleReducer/getPeople', async (_, thunkAPI) => {
  const globalState: RootState = thunkAPI.getState() as RootState

  const loggedUserId = globalState.globalReducer.user.id

  const response = await api.get(`/usuario/buscar/${loggedUserId}`)
  if (response.status === 200) {
    return response.data
  }
})

export const modifyLoggedUser = createAsyncThunk(
  'peopleReducer/modifyPeople',
  async (data: userInterface, thunkAPI) => {
    const response = await api.put('/usuario/atualizar', data)
    if (response.status === 200) {
      thunkAPI.dispatch(getLoggedUser())
      show.toast('Cadastro alterado com sucesso')
      return response.data
    }
  }
)

export const changePassword = createAsyncThunk(
  'peopleReducer/changePassword',
  async (data: passwordChangeInterface, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const loggedUser = state.globalReducer.user.username

    const modifiedData = {
      username: loggedUser,
      ...data
    }
    const response = await api.post('/usuario/alterarSenha', modifiedData)
    if (response.status === 200) {
      thunkAPI.dispatch(logout())
      show.toast('Senha alterada com sucesso')
      return response.data
    }
  }
)

const initialState: State = {
  fields: {
    id: 0,
    nome: '',
    cpf: '',
    username: '',
    dataNascimento: '',
    email: '',
    telefone: ''
  },
  passwordChange: {
    password: '',
    newPassword: ''
  }
}

export const userInfoSlice = createSlice({
  name: 'userInfoReducer',
  initialState,
  reducers: {
    setFieldsValues: (state, action: PayloadAction<{ field: keyof userInterface; value: any }>) => {
      const { field, value } = action.payload

      state.fields[field] = value as never
    },
    setPasswordFields: (
      state,
      action: PayloadAction<{ field: keyof passwordChangeInterface; value: any }>
    ) => {
      const { field, value } = action.payload
      state.passwordChange[field] = value as never
    },
    resetFields: () => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedUser.fulfilled, (state, action) => {
      state.fields = action.payload.object.usuario
    })
  }
})

export const { setFieldsValues, setPasswordFields, resetFields } = userInfoSlice.actions

export default userInfoSlice.reducer
