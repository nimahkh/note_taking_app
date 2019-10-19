import React from "react"
import NotesList from "../NotesList"
import CreateNote from "../CreateNote"
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {StateProvider} from "../../statemanagement"
import ModalBase from "../../Utils/Modal"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: '70%',
    margin: '0 auto',
    marginTop: 100
  }
}));

const initialState = {
  notes: [],
  modal:false,
  edit:0
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'newNote':
      return {
        ...state,
        notes: action.notes
      };
    case 'openModal':
      return {
        ...state,
        modal: action.modal,
        edit: action.edit
      };

    default:
      return state;
  }
};

function MainComponent() {
  const classes = useStyles();

  return (<React.Fragment>
    <Paper className={classes.root}>
      <Grid container="container" spacing={3}>
        <StateProvider initialState={initialState} reducer={reducer}>
          <React.Fragment>
            <ModalBase/>
            <Grid item="item" xs={6}>
              <NotesList/>
            </Grid>
            <Grid item="item" xs={6}>
              <CreateNote/>
            </Grid>
          </React.Fragment>
        </StateProvider>
      </Grid>
    </Paper>
  </React.Fragment>)
}

export default MainComponent
