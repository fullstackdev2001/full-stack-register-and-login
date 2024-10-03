import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Componets/Register'
import Login from './Componets/Login'
import { Toaster } from 'react-hot-toast'
import Home from './Componets/Home'

function App() {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route  path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
