import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Container from './components/PasswordContainer'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
     textAlign: 'center',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <>
    <Typography className={classes.root} variant="h2">React Password Generator</Typography>
      <Container />
      </>
  );
}

export default App;
