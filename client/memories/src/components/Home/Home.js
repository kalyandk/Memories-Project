import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../_actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from '../../styles';

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch(); // gets hold of dispatch function from redux store

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch]);

  // console.log('home')
  return (
    <Grow in>
      <Container>
        <Grid container className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={7}>
          <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
