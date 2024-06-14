import { NavLink } from 'react-router-dom'

function MainNavigation() {
  return (
    <header className="p-8">
      <nav>
        <ul className="list flex gap-4 justify-end">
          <li>
            <NavLink className="link-nav" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="link-nav" to="currency-mapping">
              Balance
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
