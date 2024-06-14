import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  isEqualsToOtherValue
} from '../util/validation.js'

import Input from './Input.js'

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
    confirmPassword: false
  })

  const [errorMessage, setErrorMessage] = useState('')

  // redirection to the homepage with login form after submittion with valid registration form
  const navigate = useNavigate()

  // Validation logic
  const emailIsInvalid =
    didEdit.email &&
    (!isEmail(enteredValues.email) || !isNotEmpty(enteredValues.email))

  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6)

  const confirmPasswordIsInvalid =
    didEdit.confirmPassword &&
    (!hasMinLength(enteredValues.confirmPassword, 6) ||
      !isEqualsToOtherValue(
        enteredValues.password,
        enteredValues.confirmPassword
      ))

  function handleSubmit(event) {
    event.preventDefault()

    // Check if any field is invalid
    const emailInvalid =
      !isEmail(enteredValues.email) || !isNotEmpty(enteredValues.email)
    const passwordInvalid = !hasMinLength(enteredValues.password, 6)
    const confirmPasswordInvalid =
      !hasMinLength(enteredValues.confirmPassword, 6) ||
      !isEqualsToOtherValue(
        enteredValues.password,
        enteredValues.confirmPassword
      )

    if (emailInvalid || passwordInvalid || confirmPasswordInvalid) {
      setDidEdit({ email: true, password: true, confirmPassword: true })
      setErrorMessage('Invalid email or password.')
      return
    }

    console.log('Form submitted with values:', enteredValues)

    // Reset form inputs
    setEnteredValues({
      email: '',
      password: '',
      confirmPassword: ''
    })
    setDidEdit({
      email: false,
      password: false,
      confirmPassword: false
    })
    // Clear any previous error messages
    setErrorMessage('')

    // Simulate server request delay before redirection to the Login page
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/', { state: { showLogin: true } })
    }, 2500)
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
      {isLoading ? (
        <p className="text-center success-text">
          You're account has been created! You can now log in...
        </p>
      ) : (
        <>
          <h2>Sign Up</h2>
          <p className="form-subtitle">It's quick & simple</p>
          <div className="py-2">
            {errorMessage && <p className="error">{errorMessage}</p>}
            <Input
              label="Email"
              id="email"
              error={emailIsInvalid && 'Please enter a valid email address.'}
              type="email"
              name="email"
              placeholder="jane.doe@email.com"
              onBlur={() => handleInputBlur('email')}
              onChange={event => handleInputChange('email', event.target.value)}
              value={enteredValues.email}
            />
            <Input
              label="Password"
              id="password"
              error={passwordIsInvalid && 'Password is too short.'}
              type="password"
              name="password"
              placeholder="password"
              onBlur={() => handleInputBlur('password')}
              onChange={event =>
                handleInputChange('password', event.target.value)
              }
              value={enteredValues.password}
            />
            <Input
              label="Confirm Password"
              id="confirm-password"
              error={confirmPasswordIsInvalid && 'Passwords do not match.'}
              type="password"
              name="confirm-password"
              placeholder="confirm password"
              onBlur={() => handleInputBlur('confirmPassword')}
              onChange={event =>
                handleInputChange('confirmPassword', event.target.value)
              }
              value={enteredValues.confirmPassword}
            />
          </div>

          <p className="form-actions">
            <button className="button">Register</button>
          </p>
        </>
      )}
    </form>
  )
}

export default RegisterForm
