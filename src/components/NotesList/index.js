import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Note from "./Note"

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

  return (<React.Fragment>
    <Typography variant="h5" align="center" color="primary" gutterBottom noWrap>Notes list</Typography>
    <div className={classes.margin}>
      {[0,1,2,3,4].map(item=>(
        <Note key={item} />
      ))}
    </div>
  </React.Fragment>)
}

export default NotesList
