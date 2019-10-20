import React from "react"
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LocalStorage from "../../Utils/localStorage"
import {useStateValue} from '../../statemanagement'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2) * 2,
    color: theme.palette.text.secondary,
    marginBottom: 10
  },
  button: {
    position: 'relative',
    top: '10px',
  },
  title: {
    wordBreak: 'break-all',
    paddingBottom:10
  }
}));

function Note(props) {
  const {item, id} = props;
  const classes = useStyles();
  const [
    {
      notes
    }, dispatch] = useStateValue();

  function deleteNote() {
    let allNotes = notes.filter((note, index) => index !== id);

    LocalStorage.rmNotes();
    LocalStorage.setNotes(JSON.stringify(allNotes));

    dispatch({type: 'newNote', notes: allNotes})
  }

  function updateNote() {
    dispatch({type: 'openModal', modal: true, edit: id})
  }

  function showNote() {
    dispatch({type: 'showMessage', showModal: true, show: id})
  }

  return (<Paper className={classes.paper}>
    <Grid container>
      <div className={classes.title}>{id + 1}- {(item.title)}({item.category})</div>
    </Grid>
    <Divider variant="middle"/>
    <Grid container>
      <ButtonGroup color="primary" aria-label="outlined primary button group" className={classes.button}>
        <Button variant="outlined" color="secondary" onClick={deleteNote}>
          Delete
        </Button>
        <Button variant="outlined" color="primary" onClick={updateNote}>
          Update
        </Button>
        <Button variant="outlined" color="primary" onClick={showNote}>
          Show
        </Button>
      </ButtonGroup>
    </Grid>
  </Paper>)
}

export default Note;
