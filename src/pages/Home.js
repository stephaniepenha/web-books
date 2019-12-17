import React, { useContext, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import RegisterContext from '../contexts/bookContext'
import { useHistory } from 'react-router-dom'
import CardList from '../components/CardList'

const Home = () => {
  let history = useHistory()
  let { isLoading, values } = useContext(RegisterContext)

  return (
    <Container maxWidth="lg">
      <Grid container direction="row" justify="center" alignItems="center">
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Fragment>
            <CardList
              items={values}
              addText={'Ver detalhes'}
              onClick={(id) => {
                history.push(`/livro/${id}`)
              }}
            />
          </Fragment>
        )}
      </Grid>
    </Container>
  )
}

export default Home
