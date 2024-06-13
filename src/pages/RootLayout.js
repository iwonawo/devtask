import React from 'react'
import { Outlet } from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'

const RootLayout = () => {
  return (
    <>
      <div className="wrapper">
        <MainNavigation />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default RootLayout
