import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Note from "./Note"
import {useStateValue} from '../../statemanagement'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2)*2,
    color: theme.palette.text.secondary,
    marginBottom:10
  },
  margin:{
    marginTop:16
  }
}));

function NotesList() {
  const classes = useStyles();
  const [{notes},]=useStateValue();

  return (<React.Fragment>
    <Typography variant="h5" align="center" color="primary" gutterBottom noWrap>Notes </Typography>
    <div className={classes.margin}>
      {notes.length > 0 && notes.map((item,index)=>(
        <Note id={index} item={item} key={item} />
      ))}
    </div>
  </React.Fragment>)
}

export default NotesList
