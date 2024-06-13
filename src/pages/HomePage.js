import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const HomePage = () => {
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistered, setIsRegistered] = useState(
    location.state?.showLogin || true
  )

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn')
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true)
    }
    if (location.state?.showLogin) {
      setIsRegistered(true)
    }
  }, [location.state])

  const onSwitchForms = () => {
    setIsRegistered(!isRegistered)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', 'true')
  }

  const onLogout = () => {
    setIsLoggedIn(false)
    localStorage.setItem('isLoggedIn', null)
  }

  return (
    <div>
      <h1>Welcome!</h1>
      {isRegistered ? (
        <>
          <div>
            {isLoggedIn ? (
              <p>
                You are logged in. <button onClick={onLogout}>Log Out</button>
              </p>
            ) : (
              <>
                <LoginForm onLogin={handleLogin} />
                <p>
                  If you're not registered{' '}
                  <button onClick={onSwitchForms}>Sign Up</button>
                </p>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div>
            <RegisterForm />
          </div>
          <p>
            If you already have an account{' '}
            <button onClick={onSwitchForms}>Sign In</button>
          </p>
        </>
      )}
    </div>
  )
}

export default HomePage
