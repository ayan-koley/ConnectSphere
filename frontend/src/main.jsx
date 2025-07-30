import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { Provider } from 'react-redux'
import store from './store/store.js'

createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey='pk_test_YWRhcHRlZC1zd2FuLTQxLmNsZXJrLmFjY291bnRzLmRldiQ'>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ClerkProvider>
)
