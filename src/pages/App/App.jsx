import { useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage'
import SearchPage from '../SearchPage/SearchPage'
import './App.css'

function App() {

  const [user, setUser] = useState(getUser())


  return (
    <main className="App">
      { user ?
        <>
          <Routes>
            <Route path="/search" element={<SearchPage user={user} setUser={setUser} />} />
            <Route path="/*" element={<Navigate to="/search" />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  )
}

export default App
