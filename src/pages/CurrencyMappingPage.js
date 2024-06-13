import React, { useEffect, useState } from 'react'

const currencyAbbreviations = {
  1: 'AUD',
  2: 'RSD',
  3: 'CHF',
  4: 'JPY',
  5: 'EUR',
  6: 'USD',
  7: 'DZD',
  8: 'ARS',
  9: 'AZN',
  10: 'BRL',
  11: 'CNY',
  12: 'GEL',
  13: 'INR',
  14: 'LVL',
  15: 'OMR',
  16: 'CUP',
  17: 'ZAR',
  18: 'ZWD',
  19: 'QAR',
  20: 'PLN',
  21: 'GBP',
  22: 'CAD',
  23: 'SEK',
  24: 'PHP',
  25: 'IDR'
}

const CurrencyMappingPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currencies, setCurrencies] = useState([])
  const [error, setError] = useState(null)
  const [notFoundData, setNotFoundData] = useState([])
  const [notFoundError, setNotFoundError] = useState(null)

  const fetchCurrencies = async () => {
    setIsLoading(true)
    setError(false)
    try {
      const response = await fetch(
        'https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/currencies'
      )
      if (!response.ok) {
        throw new Error('Failed to fetch balances.')
      }
      const data = await response.json()
      setCurrencies(data)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }

  const fetchNotFoundData = async () => {
    try {
      const response = await fetch(
        'https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1/not-found'
      )
      if (!response.ok) {
        throw new Error('Failed to fetch not-found data.')
      }
      const data = await response.json()
      setNotFoundData(data)
    } catch (error) {
      setNotFoundError(error.message)
    }
  }

  useEffect(() => {
    fetchCurrencies()
    fetchNotFoundData()
  }, [])

  return (
    <div>
      <h1>Balances</h1>
      {error ? (
        <p>{error}</p>
      ) : !isLoading ? (
        <div className="currency-grid">
          {currencies.map(currency => (
            <div className="currency-item" key={currency.currencyId}>
              <div>
                {currencyAbbreviations[currency.currencyId] ||
                  currency.currencyId}
              </div>
              <div>{currency.amount}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h1>Not Found Data</h1>
      {notFoundError ? (
        <p>{notFoundError}</p>
      ) : (
        <div className="not-found-grid">
          {notFoundData.length > 0 ? (
            notFoundData.map((item, index) => (
              <div className="not-found-item" key={index}>
                {item.name}
              </div>
            ))
          ) : (
            <div>No data available</div>
          )}
        </div>
      )}
    </div>
  )
}

export default CurrencyMappingPage
