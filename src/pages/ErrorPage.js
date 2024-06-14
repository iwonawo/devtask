import { useRouteError } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'

function ErrorPage() {
  const error = useRouteError()

  let title = 'An error occurred!'
  let subtitle = ''
  let message = 'Something went wrong!'

  if (error.status === 500) {
    message = error.data.message
  }

  if (error.status === 404) {
    title = '404'
    subtitle = 'Not found!'
    message = 'Could not find resource or page.'
  }

  return (
    <>
      <div className="wrapper">
        <MainNavigation />
        <div>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <p className="text-center">{message}</p>
        </div>
      </div>
    </>
  )
}

export default ErrorPage
