import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation.js'

import Input from './Input.js'

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  })

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  })

  const [errorMessage, setErrorMessage] = useState('')

  // redirection to the otp form after submittion with valid form inputs
  const navigate = useNavigate()

  // validation
  const emailIsInvalid =
    didEdit.email &&
    (!isEmail(enteredValues.email) || !isNotEmpty(enteredValues.email))

  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6)

  function handleSubmit(event) {
    event.preventDefault()

    // Check if any field is invalid
    if (
      !isNotEmpty(enteredValues.email) ||
      !isNotEmpty(enteredValues.password) ||
      emailIsInvalid ||
      passwordIsInvalid
    ) {
      setDidEdit({ email: true, password: true })
      setErrorMessage('Incorrect email or password.')
      return
    }

    // Mocking incorrect email and password check
    if (
      enteredValues.email === 'incorrect@email.com' &&
      enteredValues.password === 'incorrect-password'
    ) {
      setErrorMessage('Incorrect email and password.')
      return
    }
    if (enteredValues.email === 'incorrect@email.com') {
      setErrorMessage('Email is incorrect.')
      return
    }
    if (enteredValues.password === 'incorrect-password') {
      setErrorMessage('Password is incorrect.')
      return
    }

    console.log('Form submitted with values:', enteredValues)

    // Reset form inputs
    setEnteredValues({
      email: '',
      password: ''
    })
    setDidEdit({
      email: false,
      password: false
    })
    // Clear any previous error messages
    setErrorMessage('')

    // Simulate server request delay before redirection to the OTP page
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/otp')
    }, 3000)
  }

  function handleInputChange(identifier, value) {
    setEnteredValues(prevState => ({
      ...prevState,
      [identifier]: value
    }))
    setDidEdit(prevState => ({
      ...prevState,
      [identifier]: false
    }))
    setErrorMessage('') // Clear error message when user starts typing
  }

  function handleInputBlur(identifier) {
    setDidEdit(prevState => ({
      ...prevState,
      [identifier]: true
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <Input
          label="Email"
          id="login-email"
          error={emailIsInvalid && 'Please enter a valid email address.'}
          type="email"
          name="email"
          onBlur={() => handleInputBlur('email')}
          onChange={event => handleInputChange('email', event.target.value)}
          value={enteredValues.email}
        />
        <Input
          label="Password"
          id="login-password"
          error={passwordIsInvalid && 'Password is too short.'}
          type="password"
          name="password"
          onBlur={() => handleInputBlur('password')}
          onChange={event => handleInputChange('password', event.target.value)}
          value={enteredValues.password}
        />
      </div>

      <p className="form-actions">
        {isLoading ? (
          <span>Sending OTP number...</span>
        ) : (
          <button className="button">Login</button>
        )}
      </p>
    </form>
  )
}

export default LoginForm
