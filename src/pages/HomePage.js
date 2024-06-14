import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../util/AuthContext'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const HomePage = () => {
  const location = useLocation()
  const { isLoggedIn, logout } = useContext(AuthContext)
  const [isRegistered, setIsRegistered] = useState(
    location.state?.showLogin || true
  )

  useEffect(() => {
    if (location.state?.showLogin) {
      setIsRegistered(true)
    }
  }, [location.state])

  const onSwitchForms = () => {
    setIsRegistered(!isRegistered)
  }

  const onLogout = () => {
    logout()
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
              <LoginForm />
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
