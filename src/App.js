import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './pages/RootLayout'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import OtpFormPage from './pages/OtpFormPage'
import CurrencyMappingPage from './pages/CurrencyMappingPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'currency-mapping', element: <CurrencyMappingPage /> },
      { path: 'otp', element: <OtpFormPage /> }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
