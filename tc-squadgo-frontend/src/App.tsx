import { BrowserRouter } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'

import {theme} from './styles/chakra-colors'

import Routes from './routes'
import Jwt from './components/Jwt'
import Global from './styles/global'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Global />
          <Routes />
          <Jwt />
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  )
}

