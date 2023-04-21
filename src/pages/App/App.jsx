import { useState } from 'react'
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage'
import SearchPage from '../SearchPage/SearchPage'
import './App.css'
import FavLocations from '../FavLocations/FavLocations'
import NavBar from '../../components/NavBar/NavBar'

function App() {

  const [user, setUser] = useState(getUser())

  function updateUser (userData) {
    setUser(userData)
  }



  return (
    <main className="App" >
      { user ?
        <>
        <NavBar user={user} setUser={updateUser}/>
          <Routes>
              <Route path="/search" element={<SearchPage user={user} setUser={setUser} />} />
              <Route path="/favorites" element={<FavLocations user={user}/>}/>
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
