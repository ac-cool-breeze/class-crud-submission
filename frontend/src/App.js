import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';

import { 
  makeStyles, 
  AppBar, 
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  Link
} from '@material-ui/core'

import { lightBlue, orange } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import AddRecord from './Components/AddRecord';
import AllRecords from './Components/AllRecords';
import NeedsInventory from './Components/NeedsInventory';
import ManageBuildings from './Components/ManageBuildings';

/*
    Style:
    #0F0C24     #202020
    #A350A3     #b4deff   #ffc23e
    #C1436D     #18f3ff
*/
const drawerWidth = 175;

const useStyles = makeStyles((theme)=>({
  root: {
    border: 0,
    borderRadius: 3,
    color: '#202020',
    padding: '0 20px',
    display: 'flex'
  },
  pretty: {
    background: 'linear-gradient(45deg, #b4deff 30%, #18f3ff 90%)',
    boxShadow: '0 1px 1px 1px rgba(255, 105, 135, .3)'
  },
  aPaper: {
    backgroundColor: '#202020',
    color: '#18f3ff',
    padding: '20px'
  },
  appBar: {
    backgroundColor: '#18f3ff',
    borderBottom: '1px solid #202020',
    color: '#202020',
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#202020',
    color: '#18f3ff'
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  divider:{
    backgroundColor: '#18f3ff',
  },
  link:{
    color: '#18f3ff',
    "&:visited":{
    },
    "&:hover":{
      textDecoration: 'none',
      color: '#d6fdff'
    }
  },
  img :{
    height: '20px',
    width: 'auto',
    margin: '5px'
  },
  toolBar:{
    minHeight:'10px'
  },
  drawerToolBar:{
    minHeight:'20px'
  }
}));

const theme = createMuiTheme({
  palette: {
  primary: lightBlue,
    secondary: orange
  }
})

export default function App() {

  const classes = useStyles();

    return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <img alt="wind logo" src="logo.png" className={classes.img}/>
          <Typography variant="subtitle1" noWrap>(WIND)Wares-InstrumeNtality-Direction</Typography>
          <Typography noWrap>...an inventory management system.</Typography>
        </Toolbar>
      </AppBar>
      <Router>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        >
      <Toolbar className={classes.drawerToolBar} />
      <div className={classes.drawerContainer}>
          <List>
            <Link component={RouterLink} to="/allrecords" className={classes.link} >
              <ListItem button key='AllRecords' id="allrecordslink"><ListItemText primary="All Records"/></ListItem>
            </Link>
            <Divider className={classes.divider}/>
            <Link component={RouterLink} to="/addrecord" className={classes.link}>
              <ListItem button key='AddRecord'><ListItemText primary="Add a record"/></ListItem>
            </Link>
            <Divider className={classes.divider}/>
            <Link component={RouterLink} to="/needsinventory" className={classes.link}>
              <ListItem button key='NeedsInventory'><ListItemText primary="Needs Inventory"/></ListItem>
            </Link>
            <Divider className={classes.divider}/>
          </List>
        </div>
      </Drawer>


      <main className={classes.content} >
        <Toolbar className={classes.toolBar}/>
        <Route path="/allrecords" component={ AllRecords } className={classes.content}/>
        <Route path="/addrecord" component={ AddRecord } className={classes.content}/>
        <Route path="/needsinventory" component={ NeedsInventory } className={classes.content}/>
        <Route path="/ManageBuildings" component={ ManageBuildings }/>
      </main>
      </Router>
      </ThemeProvider>
    </div>
  )} 