import Navigation from './Navigation'
import BookmarkTable from './BookmarkTable'
import {createMuiTheme,makeStyles,ThemeProvider} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React from 'react';
import { yellow } from '@material-ui/core/colors';

import Register from './Register'
import Category from './Category'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar:theme.mixins.toolbar
}));


const theme = createMuiTheme({
    palette:{
        primary:{
          main:'#6c5ce7'
        },
        secondary:{
          main: yellow[600]
        }
    }
})
function App() {

  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <div className={classes.toolbar}></div>
        <Switch>
          <Route path="/add/:urlId" component={Register} >
          </Route>
          <Route path="/add" component={Register} >
          </Route>
          <Route path="/categories" component={Category}>
          </Route>
          <Route path="/" exact component={BookmarkTable}>
            
          </Route>
          <Route path="/bookmark/:order" component={BookmarkTable}>
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
    
  );
}

export default App;
