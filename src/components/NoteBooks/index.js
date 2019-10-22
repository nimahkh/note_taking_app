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

function NoteBooks() {
    const classes = useStyles();
    const [
        {
            notes
        }
    ] = useStateValue();

    return (<React.Fragment>
        <Typography variant="h5" align="center" color="primary" gutterBottom noWrap>Note Books</Typography>

      <div className={classes.noteBooksContainer}>
        <div className={classes.demo}>
            <List dense={false}>
                <ListItem>
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

                <ListItem>
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

                <ListItem>
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

                <ListItem>
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
