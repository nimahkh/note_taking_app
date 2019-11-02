import { makeStyles } from "@material-ui/core/styles";

export const useListStyles = makeStyles(theme => ({
  noteBooksContainer: {
    backgroundColor: "#f6f6f6",
    minHeight: "100%"
  },
  noteBookList: {
    cursor: "pointer"
  },
  active: {
    backgroundColor: "#ccc"
  }
}));
