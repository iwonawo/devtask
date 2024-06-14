import React, { useEffect, useState } from 'react'
import useWindowSize from '../components/useWindowSize'
import classes from './CurrencyMapping.module.css'

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

  // const renderDesktopLayout = () => (
  //   <div>
  //     <div className={classes.tableHeader}>
  //       <div className={classes.tableCell}>Name</div>
  //       <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
  //         Balance
  //       </div>
  //       <div className={classes.tableCell}>Name</div>
  //       <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
  //         Balance
  //       </div>
  //       <div className={classes.tableCell}>Name</div>
  //       <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
  //         Balance
  //       </div>
  //     </div>
  //     {currencies.map((currency, index) => (
  //       <div className={classes.tableRow} key={currency.currencyId}>
  //         <div className={`${classes.tableCell} ${classes.tableCellCurrency}`}>
  //           {currencyAbbreviations[currency.currencyId] || currency.currencyId}
  //         </div>
  //         <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
  //           {currency.amount}
  //         </div>
  //         {currencies[index + 1] && (
  //           <>
  //             <div
  //               className={`${classes.tableCell} ${classes.tableCellCurrency}`}
  //             >
  //               {currencyAbbreviations[currencies[index + 1].currencyId] ||
  //                 currencies[index + 1].currencyId}
  //             </div>
  //             <div
  //               className={`${classes.tableCell} ${classes.tableCellAmount}`}
  //             >
  //               {currencies[index + 1].amount}
  //             </div>
  //           </>
  //         )}
  //         {currencies[index + 2] && (
  //           <>
  //             <div
  //               className={`${classes.tableCell} ${classes.tableCellCurrency}`}
  //             >
  //               {currencyAbbreviations[currencies[index + 2].currencyId] ||
  //                 currencies[index + 2].currencyId}
  //             </div>
  //             <div
  //               className={`${classes.tableCell} ${classes.tableCellAmount}`}
  //             >
  //               {currencies[index + 2].amount}
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     ))}
  //   </div>
  // )

  // const renderTabletLayout = () => (
  //   <div>
  //     <div className={classes.tableHeader}>
  //       <div className={classes.tableCell}>Name</div>
  //       <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
  //         Balance
  //       </div>
  //       <div className={classes.tableCell}>Name</div>
  //       <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
  //         Balance
  //       </div>
  //     </div>
  //     {currencies.map((currency, index) => (
  //       <div className={classes.tableRow} key={currency.currencyId}>
  //         <div className={`${classes.tableCell} ${classes.tableCellCurrency}`}>
  //           {currencyAbbreviations[currency.currencyId] || currency.currencyId}
  //         </div>
  //         <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
  //           {currency.amount}
  //         </div>
  //         {currencies[index + 1] && (
  //           <>
  //             <div
  //               className={`${classes.tableCell} ${classes.tableCellCurrency}`}
  //             >
  //               {currencyAbbreviations[currencies[index + 1].currencyId] ||
  //                 currencies[index + 1].currencyId}
  //             </div>
  //             <div
  //               className={`${classes.tableCell} ${classes.tableCellAmount}`}
  //             >
  //               {currencies[index + 1].amount}
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     ))}
  //   </div>
  // )

  // const renderMobileLayout = () => (
  //   <div>
  //     <div className={classes.tableHeader}>
  //       <div className={classes.tableCell}>Name</div>
  //       <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
  //         Balance
  //       </div>
  //     </div>
  //     {currencies.map(currency => (
  //       <div className={classes.tableRow} key={currency.currencyId}>
  //         <div className={`${classes.tableCell} ${classes.tableCellCurrency}`}>
  //           {currencyAbbreviations[currency.currencyId] || currency.currencyId}
  //         </div>
  //         <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
  //           {currency.amount}
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // )

  const renderDesktopLayout = () => (
    <div>
      <div className={classes.tableHeader}>
        <div className={classes.tableCell}>Name</div>
        <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
          Balance
        </div>
        <div className={classes.tableCell}>Name</div>
        <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
          Balance
        </div>
        <div className={classes.tableCell}>Name</div>
        <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
          Balance
        </div>
      </div>
      {currencies.map((currency, index) => {
        const nextIndex = index + 1
        const secondNextIndex = index + 2
        return (
          <div className={classes.tableRow} key={currency.currencyId}>
            <div
              className={`${classes.tableCell} ${classes.tableCellCurrency}`}
            >
              {currencyAbbreviations[currency.currencyId] ||
                currency.currencyId}
            </div>
            <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
              {currency.amount}
            </div>
            {currencies[nextIndex] && (
              <>
                <div
                  className={`${classes.tableCell} ${classes.tableCellCurrency}`}
                >
                  {currencyAbbreviations[currencies[nextIndex].currencyId] ||
                    currencies[nextIndex].currencyId}
                </div>
                <div
                  className={`${classes.tableCell} ${classes.tableCellAmount}`}
                >
                  {currencies[nextIndex].amount}
                </div>
              </>
            )}
            {currencies[secondNextIndex] && (
              <>
                <div
                  className={`${classes.tableCell} ${classes.tableCellCurrency}`}
                >
                  {currencyAbbreviations[
                    currencies[secondNextIndex].currencyId
                  ] || currencies[secondNextIndex].currencyId}
                </div>
                <div
                  className={`${classes.tableCell} ${classes.tableCellAmount}`}
                >
                  {currencies[secondNextIndex].amount}
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )

  const renderTabletLayout = () => (
    <div>
      <div className={classes.tableHeader}>
        <div className={classes.tableCell}>Name</div>
        <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
          Balance
        </div>
        <div className={classes.tableCell}>Name</div>
        <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
          Balance
        </div>
      </div>
      {currencies.map((currency, index) => {
        const nextIndex = index + 1
        return (
          <div className={classes.tableRow} key={currency.currencyId}>
            <div
              className={`${classes.tableCell} ${classes.tableCellCurrency}`}
            >
              {currencyAbbreviations[currency.currencyId] ||
                currency.currencyId}
            </div>
            <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
              {currency.amount}
            </div>
            {currencies[nextIndex] && (
              <>
                <div
                  className={`${classes.tableCell} ${classes.tableCellCurrency}`}
                >
                  {currencyAbbreviations[currencies[nextIndex].currencyId] ||
                    currencies[nextIndex].currencyId}
                </div>
                <div
                  className={`${classes.tableCell} ${classes.tableCellAmount}`}
                >
                  {currencies[nextIndex].amount}
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )

  const renderMobileLayout = () => (
    <div>
      <div className={classes.tableHeader}>
        <div className={classes.tableCell}>Name</div>
        <div className={`${classes.tableCell} ${classes.tableCellAmount}`}>
          Balance
        </div>
      </div>
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
          <p className="text-center">Loading...</p>
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
