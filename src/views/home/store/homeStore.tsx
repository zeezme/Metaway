import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../../services/api'
import { show } from '../../../@core/components/modals/utils'
import { RootState } from '../../../redux/store'
export interface personTypeInterface {
  id: number
  nome?: string
  cpf?: string
  endereco?: {
    id: number
    logradouro: string
    numero: number
    cep: string
    bairro: string
    cidade: string
    estado: string
    pais: string
  }
}
export interface contactsTypeInterface {
  id?: number

  tag: string
  email: string
  telefone: string
  tipoContato: string
  privado: boolean

  termo?: string

  pessoa: personTypeInterface

  usuario?: Array<any>
}

interface State {
  contactList: Array<contactsTypeInterface>
  favoritesList: Array<contactsTypeInterface>
  contactInFocus: Array<contactsTypeInterface>
  fields: contactsTypeInterface
}

export const getContactsList = createAsyncThunk(
  'contactsReducer/getUsersList',
  async ({ loggedUserId }: { loggedUserId: string }) => {
    const response = await api.get('/contato/listar', loggedUserId)
    if (response.status === 200) {
      return response.data
    }

    return response
  }
)

export const getFilteredContactsList = createAsyncThunk(
  'contactsReducer/getFilteredContactsList',
  async ({ data }: { data?: string | undefined }, thunkAPI) => {
    const globalState: RootState = thunkAPI.getState() as RootState

    const response = await api.post('/contato/pesquisar', data ? { termo: data } : { termo: '' })

    if (response.status === 200) {
      show.toast('Contatos pesquisados com sucesso!')
      const filteredContacts = response.data.filter((contact: any) => {
        return contact.usuario.id === globalState.globalReducer.user.id
      })
      return filteredContacts
    }
  }
)

export const getFavoritesList = createAsyncThunk('contactsReducer/getFavoritesList', async () => {
  const response = await api.get('/favorito/pesquisar')
  if (response.status === 200) {
    return response.data
  }
})

export const setContactFavorite = createAsyncThunk(
  'contactsReducer/setContactFavorite',
  async ({ contact }: { contact: contactsTypeInterface }, thunkApi) => {
    const response = await api.post('/favorito/salvar', contact)
    if (response.status === 200) {
      show.toast('Contato Favoritado!')
      thunkApi.dispatch(getFavoritesList())
    }
  }
)

export const deleteContact = createAsyncThunk(
  'contactsReducer/deleteContact',
  async ({ contactId }: { contactId: string }, thunkAPI) => {
    const globalState: RootState = thunkAPI.getState() as RootState
    const userId = globalState.globalReducer.user.id
    if (userId !== undefined) {
      const response = await api.delete('/contato/remover', contactId)
      if (response.status === 200) {
        show.toast('Contato Removido!')
        thunkAPI.dispatch(getFilteredContactsList({}))
      }
    }
  }
)

export const deleteFavorite = createAsyncThunk(
  'contactsReducer/deleteFavorite',
  async ({ contactId }: { contactId: string }, thunkApi) => {
    const response = await api.delete('/favorito/remover', contactId)
    if (response.status === 200) {
      show.toast('Favorito Removido!')
      thunkApi.dispatch(getFavoritesList())
    }
  }
)

export const updateContact = createAsyncThunk(
  'contactsReducer/createOrUpdateContact',
  async ({ contact }: { contact: contactsTypeInterface }, thunkAPI) => {
    const globalState: RootState = thunkAPI.getState() as RootState
    const userId = globalState.globalReducer.user.id
    if (userId !== undefined) {
      const response = await api.post('/contato/salvar', contact)
      if (response.status === 200) {
        show.toast('Sucesso!')
        thunkAPI.dispatch(getFilteredContactsList({}))
        return response.data
      }
    }
  }
)

export const createContact = createAsyncThunk(
  'contactsReducer/createContact',
  async ({ data, callback }: { data: contactsTypeInterface; callback?: () => void }, thunkAPI) => {
    const globalState: RootState = thunkAPI.getState() as RootState
    const userId = globalState.globalReducer.user.id
    if (userId !== undefined) {
      const response = await api.post('/contato/salvar', data)
      if (response.status === 200) {
        show.toast('Sucesso!')
        if (callback) {
          callback()
        }
        thunkAPI.dispatch(getFilteredContactsList({}))
        return response.data
      }
    }
  }
)

const initialState: State = {
  contactList: [],
  favoritesList: [],
  contactInFocus: [],
  fields: {
    id: 0,
    termo: '',

    tag: '',
    email: '',
    telefone: '',
    tipoContato: '',
    privado: false,

    pessoa: {
      id: 0,
      nome: '',
      cpf: '',
      endereco: {
        id: 0,
        logradouro: '',
        numero: 0,
        cep: '',
        bairro: '',
        cidade: '',
        estado: '',
        pais: ''
      }
    },
    usuario: []
  }
}

export const homeSlice = createSlice({
  name: 'homeReducer',
  initialState,
  reducers: {
    setFieldsValues: (
      state,
      action: PayloadAction<{ field: keyof contactsTypeInterface; value: any }>
    ) => {
      const { field, value } = action.payload

      state.fields[field] = value as never
    },
    setContactInFocus: (state, action: PayloadAction<contactsTypeInterface>) => {
      state.fields = action.payload
      state.contactInFocus = [action.payload]
    },
    setPerson: (state, action: PayloadAction<personTypeInterface>) => {
      state.fields.pessoa = action.payload
    },
    resetFields: (state) => {
      state.fields = initialState.fields
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getContactsList.fulfilled, (state, action) => {
      state.contactList = action.payload
    })
    builder.addCase(getFilteredContactsList.fulfilled, (state, action) => {
      state.contactList = action.payload
    })
    builder.addCase(getFavoritesList.fulfilled, (state, action) => {
      state.favoritesList = action.payload
    })
  }
})

export const { setFieldsValues, setContactInFocus, setPerson, resetFields } = homeSlice.actions

export default homeSlice.reducer
