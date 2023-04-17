import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import AuthPage from '../AuthPage/AuthPage'
import './App.css'

function App() {

  const [user, setUser] = useState()


  return (
    <main className="App">
      <AuthPage setUser={setUser} />
    </main>
  )
}

export default App
