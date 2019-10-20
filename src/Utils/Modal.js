import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useStateValue} from '../statemanagement'
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import LocalStorage from "../Utils/localStorage"
import DialogContent from '@material-ui/core/DialogContent';

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
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  }
}));

export default function ModalBase() {
  const [
    {
      modal,
      edit
    }, dispatch] = useStateValue();
  const inputLabel = React.useRef(null);
  const [labelWidth,] = React.useState(0);
  const classes = useStyles();
  const [state, setState] = React.useState({category: '', message: '', title: ''});

  const handleClose = () => {
    dispatch({type: 'openModal', modal: false})
  };

  function addToNotes() {
    const allNodes = LocalStorage.getNotes();
    let allNodesObject = allNodes !== null
      ? JSON.parse(allNodes)
      : [];

    allNodesObject = allNodesObject.filter((note, index) => index !== edit);
    allNodesObject.push(state)

    LocalStorage.rmNotes()
    dispatch({
      type:'newNote',
      notes:[]
    })

    LocalStorage.setNotes(JSON.stringify(allNodesObject));
    dispatch({
      type:'newNote',
      notes:allNodesObject
    })
    handleClose()
  }

  function handleChange(name, event) {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  React.useEffect(() => {
    if (edit !== null) {
      const itemToEdit = LocalStorage.note(edit)
      setState(itemToEdit)
    }
  }, [edit])

  React.useEffect(() => {
    return() => {
      setState({category: '', message: '', title: ''})
    }
  }, [])

  return (<React.Fragment>
    <Dialog open={modal} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Note</DialogTitle>
      <DialogContent>
        <TextField value={state !== undefined && state.title} id="outlined-textarea" label="Title" placeholder="Write your title" className={classes.textField} margin="normal" variant="outlined" fullWidth onChange={(e) => handleChange('title', e)}/>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
            Category
          </InputLabel>
          <Select native value={state !== undefined && state.category} onChange={(e) => handleChange('category', e)} labelWidth={labelWidth} inputProps={{
              name: 'age',
              id: 'outlined-age-native-simple'
            }}>
            <option value=""/>
            <option value={"Family"}>Family</option>
            <option value={"Work"}>Work</option>
            <option value={"Friends"}>Friends</option>
          </Select>
        </FormControl>

        <TextField value={state !== undefined && state.message} id="outlined-textarea" label="Multiline Placeholder" placeholder="Write your note" multiline className={classes.textField} margin="normal" variant="outlined" onChange={(e) => handleChange('message', e)} rows={10} fullWidth/>
        <Button variant="outlined" color="primary" className={classes.button} onClick={addToNotes}>
          Edit Note
        </Button>
      </DialogContent>
    </Dialog>
  </React.Fragment>);
}
