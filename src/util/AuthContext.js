import React, { createContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOtpRequested, setIsOtpRequested] = useState(false)

  const login = () => {
    setIsLoggedIn(true)
    setIsOtpRequested(false)
  }

  const requestOtp = () => {
    setIsOtpRequested(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setIsOtpRequested(false)
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, isOtpRequested, requestOtp }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
