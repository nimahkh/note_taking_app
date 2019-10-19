import React from "react"
import NotesList from "../NotesList"
import CreateNote from "../CreateNote"
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: '70%',
    margin: '0 auto',
    marginTop: 100
  }
}));

function MainComponent() {
  const classes = useStyles();

  return (<React.Fragment>
    <Paper className={classes.root}>
      <Grid container="container" spacing={3}>
        <Grid item="item" xs={6}>
          <NotesList/>
        </Grid>
        <Grid item="item" xs={6}>
          <CreateNote/>
        </Grid>
      </Grid>
    </Paper>
  </React.Fragment>)
}

export default MainComponent
