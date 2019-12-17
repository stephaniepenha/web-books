import React from 'react'
import {
  makeStyles,
  Container,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Card,
  Button,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
    backgroundSize: 'contain', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}))

const CardList = ({ items, addText, onClick }) => {
  const classes = useStyles()

  const handleOnClick = (e) => onClick(e.currentTarget.value)

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia className={classes.cardMedia} image={item.image} title={item.title} />
              <CardContent className={classes.cardContent}>
                <Typography>{item.title}</Typography>
              </CardContent>

              <Button size="small" color="primary" value={item.id} onClick={handleOnClick}>
                {addText}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
export default CardList
