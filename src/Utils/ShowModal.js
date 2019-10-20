import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useStateValue} from '../statemanagement'
import {makeStyles} from '@material-ui/core/styles';
import LocalStorage from "../Utils/localStorage"
import ReactMarkdown from "react-markdown/with-html"
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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

export default function ShowModal() {
  const [open, setOpen] = React.useState(false);
  const [{showModal,show}, dispatch] = useStateValue();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const classes = useStyles();
  const [state, setState] = React.useState({category: '', message: '', title: ''});

  const handleClose = () => {
    dispatch({type: 'showMessage', showModal: false})
  };

  React.useEffect(() => {
    if (show !== null) {
      const itemToEdit = LocalStorage.note(show)
      setState(itemToEdit)
    }
  }, [show])

  React.useEffect(() => {
    console.log(show);
    return() => {
      setState({category: '', message: '', title: ''})
    }
  }, [])

  return (<React.Fragment>
    {
      state !== undefined && <Dialog fullWidth open={showModal} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{state.title}</DialogTitle>
          <DialogContent>
            <Typography color={"primary"} variant="caption">category : {state.category}</Typography>
            <Divider/>
            <DialogContentText>
              <ReactMarkdown source={state.message} escapeHtml={false}/>
            </DialogContentText>
          </DialogContent>
        </Dialog>
    }
  </React.Fragment>);
}
