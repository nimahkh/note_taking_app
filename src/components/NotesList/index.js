import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Note from "./Note";
import { useStateValue } from "../../statemanagement";
import LocalStorage from "../../Utils/localStorage";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useListStyles as useStyles } from "./styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function NotesList() {
  const classes = useStyles();
  const [{ notes }, dispatch] = useStateValue();
  const [mainData, setMainData] = useState([]);
  const [state, setState] = useState("");
  const [notebookDropDown, setNotebookDropDown] = useState("");
  const [stateCategory, setStateCategory] = useState("");
  const [checkboxes, setCheckboxes] = useState([]);

  /**
   * Find the object with complexicity O(n2)
   **/
  function searchFor(keyword, key, array) {
    const toSearch = keyword.toLowerCase();
    return array.filter(data => {
      return data[key]!==undefined && data[key].toLowerCase().includes(toSearch)
    });
  }

  /**
   * Handle Search in titles
   **/
  function search(event) {
    const value = event.target.value;
    setState(value);
    setStateCategory("");
    const searched = searchFor(value, "title", notes);
    if (searched.length > 0) {
      setMainData(searched);
    }
    if (value.length === 0) {
      setMainData(notes);
    }
  }

  /**
   * Handle Search in categories
   **/
  function searchCategory(param) {
    const target = param.target;
    const value = target !== undefined ? target.value : param;
    setState("");
    setStateCategory(value);
    const searched = searchFor(value, "category", notes);
    if (searched.length > 0) {
      setMainData(searched);
    }
    if (searched.length === 0) {
      setMainData([]);
    }
  }

  /**
   * handle check boxes to move into note books
   **/
  function handleCheckbox(state, id) {
    if (state) {
      setCheckboxes([...checkboxes, id]);
    } else {
      const index = checkboxes.indexOf(id);
      checkboxes.splice(index, 1);
      if (checkboxes.length === 0) {
        setCheckboxes([]);
      } else {
        setCheckboxes(checkboxes);
      }
    }
  }

  /**
   * Handle Move notes to another notebook
   **/
  function handleMoveNotes(e) {
    const NoteBookName = e.target.value;

    //step 1- remove Notes from current NoteBook
    checkboxes.map(item => {
      //push items before remove and create a clone
      const Note = LocalStorage.findId(item)[0];
      const NoteBookOfTheNote = Note.notebook;
      const getObjectsOfTheNoteBook = JSON.parse(
        LocalStorage.getNotebooks(
          NoteBookOfTheNote === "" ? "notes" : NoteBookOfTheNote
        )
      );

      let removeNote = getObjectsOfTheNoteBook.filter(
        note => note.id !== Note.id
      );
      LocalStorage.rmNoteBook(
        NoteBookOfTheNote === "" ? "notes" : NoteBookOfTheNote
      );
      LocalStorage.set(
        NoteBookOfTheNote === "" ? "notes" : NoteBookOfTheNote,
        JSON.stringify(removeNote)
      );

      //step 2- move to new NoteBook
      let allNodesObject = [];
      const allNodes = LocalStorage.getNotebooks(NoteBookName);
      allNodesObject = allNodes !== null ? JSON.parse(allNodes) : [];
      Note.notebook = NoteBookName;
      //if Notebook is empty , we have to initial firs object
      if (allNodesObject.length === 0) {
        allNodesObject = [Note];
      } else {
        //so push into it
        allNodesObject.push(Note);
      }

      LocalStorage.set(NoteBookName, JSON.stringify(allNodesObject));

      //step 3- res dispatch current NoteBook witn nre Note list and disable Move
      setCheckboxes([]);
      setNotebookDropDown("");
      dispatch({
        type: "newNote",
        notes: allNodesObject
      });

      //  Notes.push(Note);
      return true;
    });
  }

  React.useEffect(() => {
    setMainData(notes);
  }, [notes]);

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        align="center"
        color="primary"
        gutterBottom
        noWrap
      >
        Notes
      </Typography>

      <TextField
        value={state}
        id="outlined-textarea"
        label="search"
        placeholder="search title of note"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        fullWidth
        onChange={e => search(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <TextField
        value={stateCategory}
        id="outlined-textarea"
        label="search category"
        placeholder="search for category"
        className={[classes.textField, classes.margin].join(" ")}
        margin="normal"
        variant="outlined"
        fullWidth
        onChange={searchCategory}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-Notebook-native-simple">
          Move to
        </InputLabel>
        <Select
          classes={{ disabled: classes.moveToSelect }}
          disabled={checkboxes.length === 0}
          native
          onChange={handleMoveNotes}
          value={notebookDropDown}
          labelWidth={60}
          inputProps={{
            name: "Notebook",
            id: "outlined-Notebook-native-simple"
          }}
        >
          <option value="" />
          <option value={"Next Month"}>Next Month</option>
          <option value={"University"}>University</option>
          <option value={"Home"}>Home</option>
        </Select>
      </FormControl>

      <ButtonGroup
        fullWidth
        variant="text"
        color="secondary"
        size="large"
        aria-label="large contained secondary button group"
      >
        <Button
          color={stateCategory === "" ? "secondary" : "primary"}
          onClick={() => searchCategory("")}
        >
          All
        </Button>
        <Button
          color={stateCategory === "Family" ? "secondary" : "primary"}
          onClick={() => searchCategory("Family")}
        >
          Family
        </Button>
        <Button
          color={stateCategory === "Work" ? "secondary" : "primary"}
          onClick={() => searchCategory("Work")}
        >
          Work
        </Button>
        <Button
          color={stateCategory === "Friends" ? "secondary" : "primary"}
          onClick={() => searchCategory("Friends")}
        >
          Friends
        </Button>
      </ButtonGroup>
      <div className={classes.margin}>
        {mainData.length > 0 &&
          mainData.map((item, index) => (
            <Note
              setCheckbox={handleCheckbox}
              row={index}
              item={item}
              key={item.id}
            />
          ))}
      </div>
    </React.Fragment>
  );
}

export default NotesList;
