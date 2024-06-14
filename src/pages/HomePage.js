import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
        <div>
          {isLoggedIn ? (
            <p className="text-center">
              You are succesfully logged in.{' '}
              <Link className="link-color" onClick={onLogout}>
                Log out
              </Link>
            </p>
          ) : (
            <>
              <LoginForm onLogin={handleLogin} />
              <p className="text-center my-4">
                Don't have an accout?{' '}
                <Link className="link-color" onClick={onSwitchForms}>
                  Sign up
                </Link>
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <RegisterForm />
          <p className="text-center my-4">
            Signed up already?{' '}
            <Link className="link-color" onClick={onSwitchForms}>
              Login here
            </Link>
          </p>
        </>
      )}
    </div>
  )
}

export default HomePage
