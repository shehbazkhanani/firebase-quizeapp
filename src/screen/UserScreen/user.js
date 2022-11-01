import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import Information from "./information";
import Home from "./home";
import Quiz from "./quiz";

function User () {
 return (
    <>
  <AppBar sx={{backgroundColor : "black", minHeight: "8vh"}}>
   <Box sx={{display : "flex", justifyContent: "space-between", alignItems : "center", margin : 3}}>
  <Box>
  <Typography variant="h5"> USER </Typography>
  </Box>
  <Box sx={{display : {sm: "none", xs : "none", md : "flex"}}}>
   <Link to="/user" style={{textDecoration: "none", color: "white", fontSize : '1.5rem', margin : 10}}> Home </Link>
   <Link to="quiz" style={{textDecoration: "none", color: "white", fontSize : '1.5rem', margin : 10}}> Quiz </Link>
   <Link to="information" style={{textDecoration: "none", color: "white", fontSize : '1.5rem', margin : 10}}> Information </Link>
  </Box>
  <Box sx={{display : {sm: "none", xs : "none", md : "flex"}}}>
   <Link to="/"> <ExitToAppIcon/> </Link>
  </Box>
  <Box sx={{display : {sm: "flex", xs : "flex", md : "none"}}}>
  <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
    </Toolbar>
  </Box>
  </Box>
  </AppBar>
  <Box>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="information" element={<Information />} />
      <Route path="quiz" element={<Quiz />} />

   </Routes>
  </Box>
    </>
 )
}

export default User;