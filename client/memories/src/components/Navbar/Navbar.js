import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'


import memories from '../../images/memories.png'
import useStyles from './styles'

function Navbar() {
  const classes = useStyles()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation(); // The useLocation hook returns the location object that represents the current URL.

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history.push('/');

    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;

    // console.log('navbar use effect')
    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        console.log('token expired')
        logout()
      }
    }
    // var interval = setInterval(() => console.log('interval'), 10000)

    setUser(JSON.parse(localStorage.getItem('profile')))
   
  }, [location]) // trigger useEffect when the URL changes


  return (
    
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant='h2' align='center' >Memo</Typography>
        <img className={classes.image} src={memories} alt='memories'  height='60'/>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
          </div>
        ) : (
            <Button component={Link} to='/auth' variant='contained' color='primary'>Sign in</Button>
        )}
      </Toolbar>
     </AppBar>
  )
}

export default Navbar
