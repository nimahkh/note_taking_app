import React from "react";
import NotesList from "../NotesList";
import NoteBooks from "../NoteBooks";
import CreateNote from "../CreateNote";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { StateProvider, initialState, reducer } from "../../statemanagement";
import ModalBase from "../../Utils/Modal";
import ShowModal from "../../Utils/ShowModal";
import { useStyles } from "./styles";

function MainComponent() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Grid container spacing={3}>
          <StateProvider initialState={initialState} reducer={reducer}>
            <React.Fragment>
              <ModalBase />
              <ShowModal />
              <Grid item xs={2}>
                <NoteBooks />
              </Grid>
              <Grid item xs={5}>
                <NotesList />
              </Grid>
              <Grid item xs={5}>
                <CreateNote />
              </Grid>
            </React.Fragment>
          </StateProvider>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

export default MainComponent;
