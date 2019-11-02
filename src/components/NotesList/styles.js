import { makeStyles } from "@material-ui/core/styles";

export const useNoteStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2) * 2,
    color: theme.palette.text.secondary,
    marginBottom: 10
  },
  button: {
    position: "relative",
    top: "10px"
  },
  title: {
    wordBreak: "break-all",
    paddingBottom: 10
  }
}));

export const useListStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2) * 2,
    color: theme.palette.text.secondary,
    marginBottom: 10
  },
  margin: {
    marginTop: 8
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  formControl: {
    marginTop: theme.spacing(1) + "px !important",
    marginBottom: theme.spacing(1) + "px !important",
    width: "100% !important"
  },
  moveToSelect: {
    backgroundColor: "#ccc !important",
    color: "#333 !important"
  }
}));
