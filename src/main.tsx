import ReactDOM from 'react-dom/client'
import './@core/scss/global.scss'
import { persistor, store } from '../src/redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App.tsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <Toaster />
      <App />
    </PersistGate>
  </Provider>
)
