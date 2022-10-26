import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInUser } from "../config/firebasemethod";
import CircularProgress from '@mui/material/CircularProgress';


function login (){
    


  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setLoading] = useState(false)

  const loginUser = () => {
      setLoading(true)
    logInUser({email, password}).then((succ)=> {
        setLoading(false)
        navigate("dashboard", {
            state : {succ},
        })
    }).catch((err)=>{
        setLoading(false)
        console.log(err);
    })
  }
    

    return (
        <>
        <Box>
            <Grid container sx={{display : "flex", justifyContent : "center", alignItem : "center", marginTop : 10}}>
                <Grid item md={4} sm={6} xs={12}>
                    <Box sx={{ width: 400 }}>
                        <Box sx={{marginTop : 5}}>
                        <Typography variant="p" sx={{fontSize : "2.5rem"}}> Welcome! </Typography>
                        </Box>
                        <Box>
                        <Typography variant="p" sx={{color : "grey"}}> Sign in to continue. </Typography>
                        </Box>
                        <Box sx={{marginTop : 5}}>
                        <TextField onChange={(e) => setEmail(e.target.value)} id="standard-basic" fullWidth label="Email" variant="standard" />
                        </Box>
                        <Box sx={{marginTop : 3}}>
                        <TextField onChange={(e) => setPassword(e.target.value)} id="standard-basic" fullWidth label="Password" variant="standard" />
                        </Box>
                        <Box sx={{marginTop : 5}}>
                            <Button onClick={loginUser} disabled={isLoading} variant="outlined" color="primary" fullWidth> {isLoading ? <CircularProgress /> : "Login"} </Button>
                        </Box>
                        <Box sx={{marginTop : 3}}>
                        <Link style={{textDecoration : "none"}} to="/signup" >  <Button variant="outlined" color="primary" fullWidth> signup </Button> </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default login;