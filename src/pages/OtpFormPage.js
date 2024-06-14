import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { isNotEmpty, hasOtpLength } from '../util/validation'
import { AuthContext } from '../util/AuthContext'
import Input from '../components/Input'

const OtpFormPage = () => {
  const [enteredValue, setEnteredValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { isOtpRequested, login } = useContext(AuthContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isOtpRequested) {
      navigate('/')
    }
  }, [isOtpRequested, navigate])

  function handleSubmit(event) {
    event.preventDefault()

    if (!isNotEmpty(enteredValue) || !hasOtpLength(enteredValue)) {
      setErrorMessage('Incorrect OTP. Please enter a 6-digit number.')
      return
    }

    // Reset form inputs
    setEnteredValue('')
    setErrorMessage('')
    login()
    navigate('/currency-mapping')
  }

  function handleInputChange(event) {
    setEnteredValue(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Enter OTP number</h2>
        <div className="py-2">
          {errorMessage && <p className="error">{errorMessage}</p>}
          <Input
            label="OTP"
            id="otp-number"
            type="number"
            name="otp"
            placeholder="321456"
            onChange={handleInputChange}
            value={enteredValue}
          />
        </div>
        <p className="form-actions">
          <button className="button">Submit</button>
        </p>
      </form>
    </div>
  )
}

export default OtpFormPage
