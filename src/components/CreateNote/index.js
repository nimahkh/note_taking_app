import React from "react"
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
}));

function CreateNote() {
  const classes = useStyles();
  const [values, setValues] = React.useState({name: 'Cat in the Hat', age: '', multiline: 'Controlled', currency: 'EUR'});

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  return (<React.Fragment>
    <TextField
      id="outlined-textarea"
      label="Title"
      placeholder="Write your title"
      className={classes.textField}
      margin="normal"
      variant="outlined"
      fullWidth="fullWidth"/>

    <TextField
      id="outlined-textarea"
      label="Multiline Placeholder"
      placeholder="Write your note"
      multiline="multiline"
      className={classes.textField}
      margin="normal"
      variant="outlined"
      rows={10}
      fullWidth="fullWidth"/>
    <Button variant="outlined" color="primary" className={classes.button}>
      Add Note
    </Button>
  </React.Fragment>)
}

export default CreateNote
