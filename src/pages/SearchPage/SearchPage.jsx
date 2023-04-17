import React from 'react'
import UserLogOut from '../../components/UserLogOut/UserLogOut'

export default function SearchPage({user, setUser}) {
  return (
    <>
        <h1>SearchPage</h1>
        <UserLogOut user={user} setUser={setUser} />
    </>
  )
}
