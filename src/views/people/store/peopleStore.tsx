import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../../../services/api'
import { show } from '../../../@core/components/modals/utils'
import { RootState } from '../../../redux/store'

export interface enderecoInterface {
  id?: number
  logradouro: string
  numero: number | undefined
  cep: string
  bairro: string
  cidade: string
  estado: string
  pais: string
}

export interface pessoaInterface {
  id?: number
  nome: string
  cpf: string
  endereco: enderecoInterface
  foto: any
  downloaded?: any
}

interface State {
  fields: pessoaInterface
  personInFocus: pessoaInterface
  peopleList: pessoaInterface[]
  searchTerm: string
}

export const getPeople = createAsyncThunk(
  'peopleReducer/getPeople',
  async ({ loggedUserId }: { loggedUserId: string }) => {
    const response = await api.get('/pessoa/buscar/', loggedUserId)
    if (response.status === 200) {
      return response.data
    }
  }
)

export const setImage = createAsyncThunk(
  'peopleReducer/setImage',
  async ({ image }: { image: any }, thunkAPI) => {
    const globalState: RootState = thunkAPI.getState() as RootState
    const id = globalState.globalReducer.user.id
    if (image) {
      try {
        const response = await api.image(`/foto/upload/${id}`, image)
        if (response.status === 200) {
          return response.data
        }
      } catch (error) {
        console.error('Erro ao enviar a imagem:', error)
      }
    }
  }
)

export const downloadImage = createAsyncThunk('peopleReducer/downloadImage', async (id: number) => {
  const response = await api.imageDownload(`/foto/download/${id}`)

  return response
})

export const searchPeople = createAsyncThunk(
  'peopleReducer/searchPeople',
  async (nome: string | undefined) => {
    const response = await api.post('/pessoa/pesquisar', nome ? nome : { nome: '' })

    if (response.status === 200) {
      show.toast('Lista Atualizada!')
      return response.data
    }
  }
)

export const deletePerson = createAsyncThunk(
  'peopleReducer/deletePerson',
  async ({ id }: { id: string }, thunkAPI) => {
    const response = await api.delete('/pessoa/remover', id)
    if (response.status === 200) {
      show.toast('Pessoa deletada')
      thunkAPI.dispatch(searchPeople())
      return response.data
    }
  }
)

export const getFromCep = createAsyncThunk('peopleReducer/getFromCep', async (cep: string) => {
  try {
    const response = await api.cep(cep)
    return response.data
  } catch (error) {
    console.log('Cep Inválido')
  }
})

export const createPerson = createAsyncThunk(
  'peopleReducer/createOrUpdatePerson',
  async ({ data, callback }: { data: pessoaInterface; callback?: () => void }, thunkAPI) => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { id, ...dataWithoutId } = data
    const response = await api.post('/pessoa/salvar', dataWithoutId)
    if (response.status === 200) {
      show.toast('Sucesso')
      if (callback) {
        callback()
      }
      thunkAPI.dispatch(searchPeople())
      // eslint-disable-next-line no-use-before-define
      thunkAPI.dispatch(resetFields())
      return response.data
    }
  }
)

export const modifyPerson = createAsyncThunk(
  'peopleReducer/modifyPerson',
  async ({ data, callback }: { data: pessoaInterface; callback?: () => void }, thunkAPI) => {
    const response = await api.post('/pessoa/salvar', data)
    if (response.status === 200) {
      show.toast('Sucesso')
      if (callback) {
        callback()
      }
      thunkAPI.dispatch(searchPeople())
      // eslint-disable-next-line no-use-before-define
      thunkAPI.dispatch(resetFields())
      return response.data
    }
  }
)

const initialState: State = {
  fields: {
    id: 0,
    nome: '',
    cpf: '',
    foto: undefined,
    endereco: {
      id: 0,
      logradouro: '',
      numero: undefined,
      cep: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: ''
    }
  },
  personInFocus: {
    nome: '',
    cpf: '',
    endereco: {
      logradouro: '',
      numero: undefined,
      cep: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: ''
    },
    foto: undefined,
    downloaded: undefined
  },
  peopleList: [],
  searchTerm: ''
}

export const peopleSlice = createSlice({
  name: 'peopleReducer',
  initialState,
  reducers: {
    setFieldsValues: (
      state,
      action: PayloadAction<{ field: keyof pessoaInterface; value: any }>
    ) => {
      const { field, value } = action.payload

      state.fields[field] = value as never
    },
    setPersonInFocusValues: (
      state,
      action: PayloadAction<{ field: keyof pessoaInterface; value: any }>
    ) => {
      const { field, value } = action.payload

      state.personInFocus[field] = value as never
    },
    setPersonInFocusAddressValues: (
      state,
      action: PayloadAction<{ field: keyof enderecoInterface; value: any }>
    ) => {
      const { field, value } = action.payload

      state.personInFocus.endereco[field] = value as never
    },
    setAddressValues: (
      state,
      action: PayloadAction<{ field: keyof enderecoInterface; value: any }>
    ) => {
      const { field, value } = action.payload

      state.fields.endereco[field] = value as never
    },
    setPersonInFocus: (state, action: PayloadAction<pessoaInterface>) => {
      state.personInFocus = action.payload
      state.fields = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
    },
    resetFields: (state) => {
      state.fields = initialState.fields
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchPeople.fulfilled, (state, action) => {
      state.peopleList = action.payload
    })
    builder.addCase(downloadImage.fulfilled, (state, action) => {
      state.fields.downloaded = action.payload
    })
    builder.addCase(getFromCep.fulfilled, (state, action) => {
      state.fields.endereco.cidade = action.payload.localidade
      state.fields.endereco.estado = action.payload.uf
      state.fields.endereco.bairro = action.payload.bairro
      state.fields.endereco.logradouro = action.payload.logradouro
    })
  }
})

export const {
  setFieldsValues,
  setAddressValues,
  resetFields,
  setSearchTerm,
  setPersonInFocus,
  setPersonInFocusValues,
  setPersonInFocusAddressValues
} = peopleSlice.actions

export default peopleSlice.reducer
