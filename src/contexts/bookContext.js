import React from 'react'

export default React.createContext({
  values: [],
  isLoading: true,
  cart: [],
  addToCart: () => {},
  cleanCart: () => {},
  getValue: () => {},
  getCartDetail: () => {},
})
