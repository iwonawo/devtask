import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { isNotEmpty, hasOtpLength } from '../util/validation'
import Input from '../components/Input'

const OtpFormPage = () => {
  const [enteredValue, setEnteredValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // redirection to the currency mapping page
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (!isNotEmpty(enteredValue) || !hasOtpLength(enteredValue)) {
      setErrorMessage('Incorrect OTP. Please enter a 6-digit number.')
      return
    }

    // Reset form inputs
    setEnteredValue('')
    // Clear any previous error messages
    setErrorMessage('')

    // Redirect to the Currency Mapping page
    navigate('/currency-mapping')
  }

  function handleInputChange(event) {
    setEnteredValue(event.target.value)
  }

  return (
    <div>
      <h1>OTP Form</h1>
      <form onSubmit={handleSubmit}>
        <h2>Enter the OTP number</h2>

        {errorMessage && <p>{errorMessage}</p>}
        <div>
          <Input
            label="Otp number"
            id="otp-number"
            type="number"
            name="otp"
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
