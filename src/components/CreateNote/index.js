import React from "react"
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LocalStorage from "../../Utils/localStorage"
import {useStateValue} from '../../statemanagement'

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

function CreateNote() {
  const classes = useStyles();
  const [state, setState] = React.useState({category: '', message: '', title:''});
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [,dispatch]=useStateValue()

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange(name,event) {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  /**
  * Add notes inside of localStorage and context api
  **/
  function addToNotes(){
    const allNodes=LocalStorage.getNotes();
    let allNodesObject=allNodes!==null ?JSON.parse(allNodes): [];

    if(allNodesObject.length===0){
      allNodesObject = [state];
    }
    else{
      allNodesObject.push(state);
    }

    LocalStorage.setNotes(JSON.stringify(allNodesObject));
    dispatch({
      type:'newNote',
      notes:allNodesObject
    })
  }

  /**
  * On component Did mount , send data from localStorage into context api
  **/
  React.useEffect(()=>{
    const Notes=LocalStorage.getNotes();
    if(Notes!==null){
      const NoteList=JSON.parse(Notes);
      dispatch({
        type:'newNote',
        notes:NoteList
      })
    }
  },[dispatch])

  return (<React.Fragment>
    <Typography variant="h5" align="center" color="primary" gutterBottom noWrap>Add a new Note</Typography>

    <TextField
      id="outlined-textarea"
      label="Title"
      placeholder="Write your title"
      className={classes.textField}
      margin="normal"
      variant="outlined"
      fullWidth
      onChange={(e)=>handleChange('title',e)}/>

    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
        Category
      </InputLabel>
      <Select native value={state.category} onChange={(e)=>handleChange('category',e)} labelWidth={labelWidth} inputProps={{
          name: 'age',
          id: 'outlined-age-native-simple'
        }}>
        <option value=""/>
        <option value={"Family"}>Family</option>
        <option value={"Work"}>Work</option>
        <option value={"Friends"}>Friends</option>
      </Select>
    </FormControl>

    <TextField
      id="outlined-textarea"
      label="Multiline Placeholder"
      placeholder="Write your note"
      multiline
      className={classes.textField}
      margin="normal"
      variant="outlined"
      onChange={(e)=>handleChange('message',e)}
      rows={10}
      fullWidth/>
    <Button variant="outlined" color="primary" className={classes.button} onClick={addToNotes}>
      Add Note
    </Button>
  </React.Fragment>)
}

export default CreateNote
