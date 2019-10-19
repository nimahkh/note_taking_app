import React from "react"
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LocalStorage from "../../Utils/localStorage"

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)*2,
    color: theme.palette.text.secondary,
    marginBottom:10
  },
  button: {
    margin: theme.spacing(1),
    float:'right'
  },
}));

function Note(props){
  const {item,id}=props;
  const classes = useStyles();

  return(
    <Paper className={classes.paper}>
      {id+1} - {item.title}({item.category})
      <Button variant="outlined" color="secondary" className={classes.button} onClick={()=> {LocalStorage.setNotes("some")}}>
        Delete
      </Button>
      <Button variant="outlined" color="primary" className={classes.button}>
        Update
      </Button>
    </Paper>
  )
}

export default Note;
