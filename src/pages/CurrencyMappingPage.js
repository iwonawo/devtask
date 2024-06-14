import React, { useEffect, useState } from 'react'
import useWindowSize from '../hooks/useWindowSize'
import classes from './CurrencyMapping.module.css'
import currencyAbbreviations from '../util/currencyAbbreviations'

const CurrencyMappingPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currencies, setCurrencies] = useState([])
  const [error, setError] = useState(null)
  const [notFoundData, setNotFoundData] = useState([])
  const [notFoundError, setNotFoundError] = useState(null)
  const size = useWindowSize()

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
        throw new Error('Failed to fetch data.')
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

  const renderTableHeader = columns => {
    const headers = []
    for (let i = 0; i < columns; i++) {
      headers.push(
        <React.Fragment key={i}>
          <div className={classes.tableCell}>Name</div>
          <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
            Balance
          </div>
        </React.Fragment>
      )
    }
    return <div className={classes.tableHeader}>{headers}</div>
  }

  const renderDesktopLayout = () => {
    const rows = []
    for (let i = 0; i < currencies.length; i += 3) {
      rows.push(
        <div className={classes.tableRow} key={i}>
          {currencies[i] && (
            <>
              <div
                className={`${classes.tableCell} ${classes.tableCellCurrency}`}
              >
                {currencyAbbreviations[currencies[i].currencyId] ||
                  currencies[i].currencyId}
              </div>
              <div
                className={`${classes.tableCell} ${classes.tableCellAmount}`}
              >
                {currencies[i].amount}
              </div>
            </>
          )}
          {currencies[i + 1] && (
            <>
              <div
                className={`${classes.tableCell} ${classes.tableCellCurrency}`}
              >
                {currencyAbbreviations[currencies[i + 1].currencyId] ||
                  currencies[i + 1].currencyId}
              </div>
              <div
                className={`${classes.tableCell} ${classes.tableCellAmount}`}
              >
                {currencies[i + 1].amount}
              </div>
            </>
          )}
          {currencies[i + 2] && (
            <>
              <div
                className={`${classes.tableCell} ${classes.tableCellCurrency}`}
              >
                {currencyAbbreviations[currencies[i + 2].currencyId] ||
                  currencies[i + 2].currencyId}
              </div>
              <div
                className={`${classes.tableCell} ${classes.tableCellAmount}`}
              >
                {currencies[i + 2].amount}
              </div>
            </>
          )}
        </div>
      )
    }
    return (
      <div>
        {renderTableHeader(3)}
        {rows}
      </div>
    )
  }

  const renderTabletLayout = () => {
    const rows = []
    for (let i = 0; i < currencies.length; i += 2) {
      rows.push(
        <div className={classes.tableRow} key={i}>
          {currencies[i] && (
            <>
              <div
                className={`${classes.tableCell} ${classes.tableCellCurrency}`}
              >
                {currencyAbbreviations[currencies[i].currencyId] ||
                  currencies[i].currencyId}
              </div>
              <div
                className={`${classes.tableCell} ${classes.tableCellAmount}`}
              >
                {currencies[i].amount}
              </div>
            </>
          )}
          {currencies[i + 1] && (
            <>
              <div
                className={`${classes.tableCell} ${classes.tableCellCurrency}`}
              >
                {currencyAbbreviations[currencies[i + 1].currencyId] ||
                  currencies[i + 1].currencyId}
              </div>
              <div
                className={`${classes.tableCell} ${classes.tableCellAmount}`}
              >
                {currencies[i + 1].amount}
              </div>
            </>
          )}
        </div>
      )
    }
    return (
      <div>
        {renderTableHeader(2)}
        {rows}
      </div>
    )
  }

  const renderMobileLayout = () => (
    <div>
      {renderTableHeader(1)}
      {currencies.map(currency => (
        <div className={classes.tableRow} key={currency.currencyId}>
          <div className={`${classes.tableCell} ${classes.tableCellCurrency}`}>
            {currencyAbbreviations[currency.currencyId] || currency.currencyId}
          </div>
          <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
            {currency.amount}
          </div>
        </div>
      ))}
    </div>
  )

  const renderContent = () => {
    if (size.width > 1023) {
      return renderDesktopLayout()
    } else if (size.width > 599) {
      return renderTabletLayout()
    } else {
      return renderMobileLayout()
    }
  }

  return (
    <>
      <div className={classes.tableContainer}>
        <h2 className="text-left mb-4">Balances</h2>
        {error ? (
          <p>{error}</p>
        ) : isLoading ? (
          <span className="loader"></span>
        ) : (
          renderContent()
        )}
      </div>
      <div className={classes.tableContainer}>
        <h2 className="text-left mb-4">Not Found Data</h2>
        {notFoundError ? (
          <p>{notFoundError}</p>
        ) : (
          <div>
            {notFoundData.length > 0 ? (
              notFoundData.map((item, index) => (
                <div key={index}>{item.name}</div>
              ))
            ) : (
              <p>No data available.</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default CurrencyMappingPage
