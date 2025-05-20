import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import appRouter from './Router.jsx'
import { Provider } from 'react-redux'
import AppStore from './redux/store/AppStore.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={AppStore}>
  <RouterProvider router={appRouter} />
  </Provider>
  </StrictMode>,
)
