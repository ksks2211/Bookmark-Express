import 'fontsource-roboto';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import AddIcon from '@material-ui/icons/Add'
import Bookmarks from '@material-ui/icons/Bookmarks'
import StarIcon from '@material-ui/icons/StarBorder'
import CategoryIcon from '@material-ui/icons/Category';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, ListSubheader } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import {
  Link
} from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    nested:{
      paddingLeft:theme.spacing(4),
    },
    link:{
      textDecoration:"none",
      color:'#000'
    }
  }));

export default function SideToolBar({handleDrawerToggle}){
    const classes = useStyles();
    const [open,setOpen] = React.useState(true);

    const handleClick = ()=>{
      setOpen(prev=>!prev);
    }
    return (
        <div>
          <Divider />
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Bookmark
              </ListSubheader>
            }>
          <ListItem button key='Bookmarks' onClick={handleClick}>
              <ListItemIcon><Bookmarks/></ListItemIcon>
              <ListItemText primary='Bookmarks' />
              { open ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/"  className={classes.link} onClick={handleDrawerToggle}>
                <ListItem button key='Recent Visit' className={classes.nested}>
                  <ListItemIcon><BookmarkBorderIcon/></ListItemIcon>
                  <ListItemText  primary='Recent Visit'/>
                </ListItem>
              </Link>
              <Link to="/bookmark/visit"  className={classes.link} onClick={handleDrawerToggle}>
              <ListItem button key='Frequent Visit' className={classes.nested}>
                <ListItemIcon><BookmarkBorderIcon/></ListItemIcon>
                <ListItemText primary='Frequent Visit'/>
              </ListItem>
              </Link>


              <Link to="/bookmark/star"  className={classes.link} onClick={handleDrawerToggle}>
              <ListItem button key='Star' className={classes.nested}>
                <ListItemIcon><StarIcon/></ListItemIcon>
                <ListItemText  primary='Star'/>
              </ListItem>
              </Link>
            </List>
          </Collapse>
          </List>
          <Divider />
          <List>
            <Link to="/add"  className={classes.link} onClick={handleDrawerToggle}>
              <ListItem button key='Add Bookmark'>
                  <ListItemIcon><AddIcon/></ListItemIcon>
                  <ListItemText  primary='Add Bookmark'/>
              </ListItem>
            </Link>
            <Link to="/categories"  className={classes.link} onClick={handleDrawerToggle}>
              <ListItem button key='Categories'>
                  <ListItemIcon><CategoryIcon/></ListItemIcon>
                  <ListItemText  primary='Categories' />
              </ListItem>
            </Link>
          </List>
        </div>
      );
}