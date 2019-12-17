import React, { useState, useContext } from 'react'
import BookContext from '../contexts/bookContext'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import {
  Grid,
  Container,
  CssBaseline,
  CircularProgress,
  Button,
  Typography,
  Snackbar,
  Slide,
} from '@material-ui/core'
import Spacing from '../components/Spacing'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bookImage: {
    maxWidth: '100%',
  },
}))

export default function EditBook() {
  let { id } = useParams()
  let { isLoading, getValue, cart, addToCart } = useContext(BookContext)
  const classes = useStyles()
  let history = useHistory()

  const [isCheckoutReady, setCheckoutReady] = useState(false)
  const [isSnackOpen, setSnackOpen] = useState(false)

  const handleOnClick = (e) => {
    setSnackOpen(true)
    addToCart(getValue(parseInt(id)))
    setCheckoutReady(true)
  }

  const SlideTransition = (props) => {
    return <Slide {...props} direction="up" />
  }

  const handleCheckout = (e) => {
    history.push('/checkout')
  }

  const handleSnackClose = () => {
    setSnackOpen(false)
  }

  return (
    <div className={classes.root}>
      {isLoading && (
        <Container maxWidth="lg">
          <Grid container direction="row" justify="center" alignItems="center">
            <CircularProgress />
          </Grid>
        </Container>
      )}
      {!isLoading && getValue(parseInt(id)) != null && (
        <Container component="section" maxWidth="md">
          <Grid container spacing={3}>
            <CssBaseline />
            <Typography variant="h3" gutterBottom>
              {getValue(parseInt(id)).title}
            </Typography>
            <Grid item xs={12} md={6}>
              <img className={classes.bookImage} src={getValue(parseInt(id)).image}></img>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Conteudo</Typography>
              <Typography variant="body1">{getValue(parseInt(id)).description}</Typography>
              <Spacing size={'20px'} />
              <Typography variant="h5">Somente {getValue(parseInt(id)).formattedPrice}</Typography>
              <Spacing size={'10px'} />
              {isCheckoutReady && (
                <Button variant="contained" color="secondary" onClick={handleCheckout}>
                  Ir para o pagamento
                </Button>
              )}
              {!isCheckoutReady && (
                <Button variant="contained" color="primary" onClick={handleOnClick}>
                  Adicionar ao Carrinho
                </Button>
              )}
            </Grid>
            <Snackbar
              open={isSnackOpen}
              onClose={handleSnackClose}
              TransitionComponent={SlideTransition}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Livro adicionado ao carrinho com sucesso</span>}
            />
          </Grid>
        </Container>
      )}
    </div>
  )
}
