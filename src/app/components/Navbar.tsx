'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { STORAGE_KEY } from '../constants'
 
const SocialLogin = dynamic(() => import('./SocialLogin'), {
  ssr: false,
})

export default function Navbar() {
  function signingOut() {
    localStorage.removeItem(STORAGE_KEY)
    checkIsLoggedIn()
  }
  const [isMounted, setIsMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  function checkIsLoggedIn() {
    setIsLoggedIn(typeof localStorage !== 'undefined' && !!localStorage.getItem(STORAGE_KEY))
  }

  useEffect(() => {
    checkIsLoggedIn()
    setIsMounted(true)
  }, [])

  const LoginButton = () => {
    if (!(isMounted && !isLoggedIn)) return null

    return (
      <SocialLogin checkIsLoggedIn={checkIsLoggedIn}>
        <button type="button" className="text-indigo-800 bg-white hover:underline rounded-lg px-4 py-2">Login</button>
      </SocialLogin>
    )
  }

  const LogoutButton = () => {
    if (!(isMounted && isLoggedIn)) return null

    return (
      <button type="button" className="text-red-600 bg-white hover:underline rounded-lg px-4 py-2" onClick={signingOut}>Logout</button>
    )
  }

  return (
    <nav className="flex items-center justify-end flex-wrap bg-indigo-400 p-5">
      <LoginButton />
      <LogoutButton />
    </nav>
  )
}
