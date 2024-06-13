import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const HomePage = () => {
  const location = useLocation()
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

  return (
    <div>
      <h1>Home Page</h1>
      {isRegistered ? (
        <>
          <div>
            <LoginForm />
          </div>
          <p>
            If you're not registered{' '}
            <button onClick={onSwitchForms}>Sign Up</button>
          </p>
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
