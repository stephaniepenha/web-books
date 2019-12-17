import React, { useState, initialValue, useEffect } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { getStorageItem } from './utils/storage-handler'
import App from './components/App'
import Home from './pages/Home'
import Login from './pages/Login'
import EditBook from './pages/BookDetail'
import { isNull } from 'util'
import BookContext from './contexts/bookContext'
import books from './utils/books'
import normalize from './utils/normalize'
import Checkout from './pages/Checkout'

const PrivateRoute = ({ component: Component, reverseCondition, redirectTo, path, ...rest }) => {
  const user = getStorageItem('user') || {}
  let isAllowed = !(isNull(user) || Object.keys(user).length === 0) || path === '/login'
  if (reverseCondition) {
    isAllowed = !isAllowed
  }
  return (
    <Route
      {...rest}
      path={path}
      render={(props) => (isAllowed ? <Component {...props} /> : <Redirect to={redirectTo} />)}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  reverseCondition: PropTypes.bool,
  redirectTo: PropTypes.string,
}

PrivateRoute.defaultProps = {
  reverseCondition: false,
  redirectTo: `/login`,
}

export default function Routes() {
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState(initialValue)
  const [cart, setCart] = useState([])

  useEffect(() => {
    setValue(normalize(books))
    setIsLoading(false)
  }, [])

  return (
    <Router>
      <App>
        <Switch>
          <PrivateRoute exact path="/login" component={Login} />
          <BookContext.Provider
            value={{
              values: value,
              isLoading: isLoading,
              getValue: (id) => {
                return value.find((e) => e.id === id)
              },
              cart: cart,
              addToCart: (val) => {
                setCart([...cart, val])
              },
              cleanCart: () => {
                setCart([])
              },
            }}
          >
            <PrivateRoute exact component={Home} redirectTo="/login" path="/" />
            <PrivateRoute exact component={EditBook} redirectTo="/login" path="/livro/:id" />
            <PrivateRoute exact component={Checkout} redirectTo="/login" path="/checkout" />
          </BookContext.Provider>
        </Switch>
      </App>
    </Router>
  )
}
