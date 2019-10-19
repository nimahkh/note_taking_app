import React from "react"
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  const [state, setState] = React.useState({category: '', name: 'hai'});
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [values, setValues] = React.useState({name: 'Cat in the Hat', age: '', multiline: 'Controlled', currency: 'EUR'});

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange(name,event) {
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  return (<React.Fragment>
    <TextField id="outlined-textarea" label="Title" placeholder="Write your title" className={classes.textField} margin="normal" variant="outlined" fullWidth="fullWidth"/>

    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
        Category
      </InputLabel>
      <Select native="native" value={state.category} onChange={(e)=>handleChange('category',e)} labelWidth={labelWidth} inputProps={{
          name: 'age',
          id: 'outlined-age-native-simple'
        }}>
        <option value=""/>
        <option value={10}>Family</option>
        <option value={20}>Work</option>
        <option value={30}>Friends</option>
      </Select>
    </FormControl>

    <TextField id="outlined-textarea" label="Multiline Placeholder" placeholder="Write your note" multiline="multiline" className={classes.textField} margin="normal" variant="outlined" rows={10} fullWidth="fullWidth"/>
    <Button variant="outlined" color="primary" className={classes.button}>
      Add Note
    </Button>
  </React.Fragment>)
}

export default CreateNote
