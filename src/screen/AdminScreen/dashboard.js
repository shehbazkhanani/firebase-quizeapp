import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Userdata from './userdata';
import MainData from './maindata';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import UserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import UserScore from './userscore';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import QuizData from './quizdata';
import UserInformation from './userinformation';
import AddQuiz from './addquiz';
import AddCource from './addcource';
import CourseData from './coursedata';
import CreateResult from './createresult';
import ShowResult from './showResult';
import AddCountry from './addcountry';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function DashBoard() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const Links = [{
    name: "User Data",
    to: "userdata",
  },
  {
    name: "User Score",
    to: "userscore",
  },
  {
    name: "User Information",
    to: "userinformation",
  },
  {
    name: "Course Data",
    to: "coursedata",
  },
  {
    name: "Result",
    to: "showresult",
  } ]


  const LinksOne = [{
    name: "Add Quiz",
    to: "addquiz",
  },{
    name: "Quiz Data",
    to: "quizdata",
  },{
    name: "Add Cource",
    to: "addcource",
  },{
    name: "Create Result",
    to: "createResult",
  },{
    name: "Add Country",
    to: "addcountry",
  }]

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{backgroundColor : "black"}}>
          <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
             ADMIN <AdminPanelSettingsIcon sx={{color : 'white',}} /> PANNEL 
            </Typography>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}> <Typography sx={{ display: "flex" }} >  <ExitToAppIcon/> </Typography> </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List >
            {Links.map((text, index) => (
              <Link style={{textDecoration : 'none', color : 'black'}} key={index} to={text.to}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                    <UserCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
          {LinksOne.map((text, index) => (
            <Link style={{textDecoration : 'none', color : 'black'}} key={index} to={text.to} >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CoPresentIcon/>
                  </ListItemIcon>
                  <ListItemText primary={text.name} />
                </ListItemButton>
              </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <Main open={open} sx={{padding : 0}}>
          <DrawerHeader />
          <Routes>
          <Route path="/" element={<MainData />} />  
          <Route path="/userdata" element={<Userdata />} />
          <Route path="/userscore" element={<UserScore />} />
          <Route path="/quizdata" element={<QuizData />} />
          <Route path="/userinformation" element={<UserInformation />} />
          <Route path="/addquiz" element={<AddQuiz />} />
          <Route path="/addcource" element={<AddCource />} />
          <Route path="/coursedata" element={<CourseData />} />
          <Route path="/createresult" element={<CreateResult />} />
          <Route path="/showresult" element={<ShowResult />} />
          <Route path="/addcountry" element={<AddCountry />} />
        </Routes>
        </Main>

      </Box>



    </>
  );
}

export default DashBoard;