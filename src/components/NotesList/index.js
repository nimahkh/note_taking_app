import React, {useState} from "react";
import Typography from '@material-ui/core/Typography';
import Note from "./Note"
import {useStateValue} from '../../statemanagement'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useListStyles as useStyles} from "./styles"

function NotesList() {
  const classes = useStyles();
  const [
    {
      notes
    }
  ] = useStateValue();
  const [mainData, setMainData] = useState([]);
  const [state, setState] = useState("")
  const [stateCategory, setStateCategory] = useState("")

  function searchFor(keyword, key, array) {
    const toSearch = keyword.toLowerCase()
    return array.filter(data => {
      return data[key].toLowerCase().includes(toSearch)
    });
  }

  function search(event) {
    const value = event.target.value
    setState(value)
    setStateCategory("")
    const searched = searchFor(value, 'title', notes);
    if (searched.length > 0) {
      setMainData(searched)
    }
    if (value.length === 0) {
      setMainData(notes)
    }
  }

  function searchCategory(param) {
    const target = param.target
    const value= target!==undefined ? target.value : param
    setState("")
    setStateCategory(value)
    const searched = searchFor(value, 'category', notes);
    if (searched.length > 0) {
      setMainData(searched)
    }
    if (value.length === 0) {
      setMainData(notes)
    }
  }

  React.useEffect(() => {
    setMainData(notes);
  }, [notes])

  return (<React.Fragment>
    <Typography variant="h5" align="center" color="primary" gutterBottom noWrap>Notes</Typography>

    <TextField value={state} id="outlined-textarea" label="search" placeholder="search title of note" className={classes.textField} margin="normal" variant="outlined" fullWidth onChange={(e) => search(e)} InputProps={{
        endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>
      }}/>

    <TextField value={stateCategory} id="outlined-textarea" label="search category" placeholder="search for category" className={[classes.textField, classes.margin].join(" ")} margin="normal" variant="outlined" fullWidth onChange={searchCategory} InputProps={{
        endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>
      }}/>

    <ButtonGroup fullWidth variant="text" color="secondary" size="large" aria-label="large contained secondary button group">
      <Button color="primary" onClick={()=>searchCategory('Family')}>Family</Button>
      <Button onClick={()=>searchCategory('Work')}>Work</Button>
      <Button color="primary" onClick={()=>searchCategory('Friends')}>Friends</Button>
    </ButtonGroup>
    <div className={classes.margin}>
      {mainData.length > 0 && mainData.map((item, index) => (<Note row={index} item={item} key={item.id}/>))}
    </div>
  </React.Fragment>)
}

export default NotesList
