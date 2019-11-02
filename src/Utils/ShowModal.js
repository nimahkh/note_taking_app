import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useStateValue } from "../statemanagement";
import LocalStorage from "../Utils/localStorage";
import ReactMarkdown from "react-markdown/with-html";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export default function ShowModal() {
  const [{ showModal, show }, dispatch] = useStateValue();
  const [state, setState] = React.useState({
    category: "",
    message: "",
    title: ""
  });

  const handleClose = () => {
    dispatch({ type: "showMessage", showModal: false });
  };

  React.useEffect(() => {
    const rowExists = LocalStorage.findId(show);
    if (rowExists.length > 0) {
      setState(rowExists[0]);
    }
  }, [show]);

  React.useEffect(() => {
    return () => {
      setState({ category: "", message: "", title: "" });
    };
  }, [show]);

  return (
    <React.Fragment>
      {state !== undefined && (
        <Dialog
          fullWidth
          open={showModal}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{state.title}</DialogTitle>
          <DialogContent>
            <Typography color={"primary"} variant="caption">
              category : {state.category}
            </Typography>
            <Divider />
            <ReactMarkdown source={state.message} escapeHtml={false} />
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
}
