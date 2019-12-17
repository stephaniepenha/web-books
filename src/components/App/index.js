import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'
import Navbar from '../Navbar'

const App = ({ children }) => (
  <div>
    <Navbar title={'Livros'}></Navbar>
    <main className={style.content}>{children}</main>
  </div>
)

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
