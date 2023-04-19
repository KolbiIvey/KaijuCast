import { useState } from 'react'
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import AuthPage from '../AuthPage/AuthPage'
import SearchPage from '../SearchPage/SearchPage'
import UserLogOut from '../../components/UserLogOut/UserLogOut'
import './App.css'
import FavLocations from '../FavLocations/FavLocations'

function App() {

  const [user, setUser] = useState(getUser())

  const navigate = useNavigate();

  function handleClick() {
    navigate('/favorites')
  }


  return (
    <main className="App">
      <button onClick={handleClick}>Fav Locations</button>
      <UserLogOut user={user} setUser={setUser} />
      { user ?
        <>
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
