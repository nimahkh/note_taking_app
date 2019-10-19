import React from "react"
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LocalStorage from "../../Utils/localStorage"
import {useStateValue} from '../../statemanagement'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2) * 2,
    color: theme.palette.text.secondary,
    marginBottom: 10
  },
  button: {
    margin: theme.spacing(1),
    float: 'right'
  }
}));

function Note(props) {
  const {item, id} = props;
  const classes = useStyles();
  const [{notes},dispatch] = useStateValue();

  function deleteNote() {
    let allNotes = notes.filter((note, index) => index !== id);

    LocalStorage.rmNotes();
    LocalStorage.setNotes(JSON.stringify(allNotes));

    dispatch({
      type:'newNote',
      notes : allNotes
    })
  }

  function updateNote(){
    dispatch({
      type:'openModal',
      modal: true,
      edit: id
    })
  }

  function showNote(){
    dispatch({
      type:'showMessage',
      showModal: true,
      show: id
    })
  }

  return (<Paper className={classes.paper}>
    {id + 1}
    - {item.title}({item.category})
    <Button variant="outlined" color="secondary" className={classes.button} onClick={deleteNote}>
      Delete
    </Button>
    <Button variant="outlined" color="primary" className={classes.button} onClick={updateNote}>
      Update
    </Button>
    <Button variant="outlined" color="primary" className={classes.button} onClick={showNote}>
      Show
    </Button>
  </Paper>)
}

export default Note;
