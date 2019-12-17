import 'date-fns'
import React, { useState, useContext, Fragment } from 'react'
import BookContext from '../contexts/bookContext'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Container,
  Card,
  TextField,
  CssBaseline,
  CircularProgress,
  Button,
} from '@material-ui/core'
import Spacing from '../components/Spacing'
import Alert from '../components/Alert'
import CartResume from '../components/CartResume'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    paddingTop: '40px',
    paddingBottom: '20px',
    paddingRight: '40px',
    paddingLeft: '40px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
  fabProgress: {
    color: 'black',
    position: 'absolute',
    top: 9,
    left: 50,
    zIndex: 1,
  },
}))

export default function AddRegister() {
  const classes = useStyles()
  let { isLoading, cart, cleanCart } = useContext(BookContext)
  let history = useHistory()

  const [isSuccess, setIsSuccess] = useState(false)
  const [value, setValue] = useState({
    nome: '',
    email: '',
    birthday: new Date('2019-08-18T21:11:54'),
  })

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value })
  }

  const handleDateChange = (date) => {
    setValue({ ...value, ['birthday']: date })
  }

  const handleClick = () => {
    cleanCart()
    setIsSuccess(true)
  }

  if (cart.length === 0 && !isSuccess) {
    history.push('/')
  }

  return (
    <div>
      {isLoading && (
        <Container maxWidth="lg">
          <Grid container direction="row" justify="center" alignItems="center">
            <CircularProgress />
          </Grid>
        </Container>
      )}
      {!isLoading && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <CartResume rows={cart} />
            <form className={classes.form} noValidate>
              <Card className={classes.card}>
                {isSuccess && (
                  <Alert
                    variant="success"
                    message="Your order has been successfully completed."
                    onClose={() => setIsSuccess(false)}
                  />
                )}
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  name="nome"
                  type="text"
                  autoComplete="nome"
                  value={value.nome}
                  onChange={handleChange('nome')}
                  {...(isSuccess && { disabled: true })}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={value.email}
                  onChange={handleChange('email')}
                  {...(isSuccess && { disabled: true })}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={value.birthday}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    {...(isSuccess && { disabled: true })}
                  />
                </MuiPickersUtilsProvider>
                <Spacing size={'20px'} />

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleClick}
                  {...(isLoading && { disabled: true })}
                  {...(isSuccess && { disabled: true })}
                >
                  Confirmar pedido
                  {isLoading && <CircularProgress size={20} className={classes.fabProgress} />}
                </Button>
                {isSuccess && (
                  <Fragment>
                    <Spacing size={'10px'}></Spacing>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      className={classes.submit}
                      onClick={() => history.push('/')}
                    >
                      Voltar
                    </Button>
                  </Fragment>
                )}
              </Card>
            </form>
          </div>
        </Container>
      )}
    </div>
  )
}
