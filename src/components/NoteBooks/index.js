import React, {useState} from "react";
import Typography from '@material-ui/core/Typography';
import {useStateValue} from '../../statemanagement'
import {useListStyles as useStyles} from "./styles"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import LocalStorage from "../../Utils/localStorage";

function NoteBooks() {
    const classes = useStyles();
    const [
        {
            notes
        }
    ] = useStateValue();
    const [, dispatch] = useStateValue()

    function showNotesOf(Notebook){
        let NoteNextMonth = LocalStorage.getNotebooks('Next Month');
        let University = LocalStorage.getNotebooks('University');
        let Home = LocalStorage.getNotebooks('Home');
        let Notes = LocalStorage.getNotebooks('notes');

        if(Notebook==="all"){
            let All;
            NoteNextMonth=NoteNextMonth!==null?JSON.parse(NoteNextMonth):[];
            University=University!==null?JSON.parse(University):[];
            Home=Home!==null?JSON.parse(Home):[];
            Notes=Notes!==null?JSON.parse(Notes):[];
            All=[...NoteNextMonth,...University,...Home,...Notes]
            if (All.length>0) {
                dispatch({type: 'newNote', notes: All})
            }
        }
        else{
            let Notes;
            if(Notebook==="Next Month"){
                Notes=NoteNextMonth;
            }
            if(Notebook==="University"){
                Notes=University;
            }
            if(Notebook==="Home"){
                Notes=Home;
            }

            Notes=Notes!==null?JSON.parse(Notes): [];
            dispatch({type: 'newNote', notes: Notes})
        }
    }

    return (<React.Fragment>
        <Typography variant="h5" align="center" color="primary" gutterBottom noWrap>Note Books</Typography>

      <div className={classes.noteBooksContainer}>
        <div className={classes.demo}>
            <List dense={false}>
                <ListItem
                    className={classes.noteBookList}
                    onClick={()=>showNotesOf('all')}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="All"
                    secondary={'Counts : (5)'}
                  />
                </ListItem>

                <ListItem
                    className={classes.noteBookList}
                    onClick={()=>showNotesOf('Next Month')}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Next Month"
                    secondary={'Counts : (10)'}
                  />
                </ListItem>

                <ListItem
                    className={classes.noteBookList}
                    onClick={()=>showNotesOf('University')}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="University"
                    secondary={'Counts : (15)'}
                  />
                </ListItem>

                <ListItem
                    className={classes.noteBookList}
                    onClick={()=>showNotesOf('Home')}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Home"
                    secondary={'Counts : (23)'}
                  />
                </ListItem>
            </List>
          </div>
      </div>
    </React.Fragment>)
}

export default NoteBooks
