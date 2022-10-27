import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../config/firebasemethod";


function Signup (){

    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [cAdmin, setCAdmin] = React.useState(false); 
   const navigate = useNavigate()
const signUp = () => {
    signUpUser({email, password, name, cAdmin}).then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("/")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      })
}
    return (
        <>
        <Box>
            <Grid container sx={{display : "flex", justifyContent : "center", alignItem : "center", marginTop : 2}}>
                <Grid item md={4} sm={6} xs={12}>
                    <Box sx={{ width: 400 }}>
                        <Box sx={{marginTop : 5}}>
                        <Typography variant="p" sx={{fontSize : "2rem"}}> Thanks for Register Account! </Typography>
                        </Box>
                        <Box>
                        <Typography variant="p" sx={{color : "grey"}}> Sign up to continue. </Typography>
                        </Box>
                        <Box sx={{marginTop : 4}}>
                        <TextField onChange={(e) => setName(e.target.value)} id="standard-basic" fullWidth type="text" label="fullname" variant="standard" />
                        </Box>
                        <Box sx={{marginTop : 3}}>
                        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
                        </Box>
                        <Box sx={{marginTop : 1}}>
                        <TextField onChange={(e) => setEmail(e.target.value)} id="standard-basic" fullWidth type="email" label="Email" variant="standard" />
                        </Box>
                        <Box sx={{marginTop : 3}}>
                        <TextField onChange={(e) => setPassword(e.target.value)} id="standard-basic" fullWidth type="password" label="Password" variant="standard" />
                        </Box>
                        <Box sx={{marginTop : 5}}>
                            <Button variant="contained" onClick={signUp} color="primary" fullWidth> Signup </Button>
                        </Box>
                        <Box sx={{marginTop : 3}}>
                          <Link style={{textDecoration : "none"}} to="/" >  <Button variant="contained" color="primary" fullWidth> Login </Button> </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default Signup;