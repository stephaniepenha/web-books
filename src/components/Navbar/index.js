import React from 'react'
import BookIcon from '@material-ui/icons/Book'
import PropTypes from 'prop-types'
import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}))

const Navbar = ({ title }) => {
  const classes = useStyles()

  return (
    <AppBar position="relative">
      <Toolbar>
        <BookIcon className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

Navbar.propTypes = {
  title: PropTypes.string,
}

Navbar.defaultProps = {
  title: '',
}

export default Navbar
