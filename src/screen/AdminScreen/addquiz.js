import { Box, Button, Card, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import { getDatabase, push, ref } from "firebase/database";
import app from "../../config/firebaseconfig";


function AddQuiz () {
    const [categories, setCategories] = useState("")
    const [data, setData] = useState({
        category : "",
        question : "",
        optionOne : "",
        optionTwo : "",
        optionThree : "",
        optionFour : "",
        correctAnswer : ""
    })
    
    const database = getDatabase(app)
    const submited = () => {
        const reference = ref(database, `Quiz`)
        push(reference, data);
    }

    const categoryChange = (event) => {
        setCategories(event.target.value)
        setData((parm)=> ({...parm, category : event.target.value}))
    }

    const category = [
        {name : 'General Knowledge'},
        {name : 'Science'},
        {name : "History"}
    ]
    return (
        <>
        <Box> <Link to='/dashboard'> <ArrowBackIcon/> </Link> </Box>
        <Grid container sx={{display: 'flex', justifyContent : 'center',}}>
            <Grid item md="5" sm="12" xs="12" >
          <Card> 
          <Box>
          <Typography variant="h5"> Add Quiz Data </Typography> 
          <Box>
          <TextField
       select
          label="Select your Course"
          value={categories}
          onChange={categoryChange}
          helperText="Please select your course"
          variant="standard"
          fullWidth
        >
          {category.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        </Box>
        {categories ? 
        <Box>
        <Box> 
            <TextField onChange={(e)=> setData((parm)=> ({...parm, question : e.target.value}))}  variant="standard" label="Add Questions" fullWidth/> 
        </Box> 
        <Box>
        <TextField onChange={(e)=> setData((parm)=> ({...parm, optionOne : e.target.value}))}  variant="standard" label="Option One" fullWidth/>
        </Box>
        <Box>
        <TextField onChange={(e)=> setData((parm)=> ({...parm, optionTwo : e.target.value}))}  variant="standard" label="Option Two" fullWidth/>
        </Box>
        <Box>
        <TextField onChange={(e)=> setData((parm)=> ({...parm, optionThree : e.target.value}))}  variant="standard" label="Option Three" fullWidth/>
        </Box>
        <Box>
        <TextField onChange={(e)=> setData((parm)=> ({...parm, optionFour : e.target.value}))}  variant="standard" label="Option Four" fullWidth/>
        </Box>
        <Box>
        <TextField onChange={(e)=> setData((parm)=> ({...parm, correctAnswer : e.target.value}))}  variant="standard" label="Correct Answer" fullWidth/>
        </Box>
        <Box onClick={submited} sx={{marginTop : 5}}> <Button variant="contained" color="success"> Submite </Button> </Box>
        </Box>
        : "" }
          
          

          </Box>
          </Card>
         </Grid>
         </Grid>
      
        </>
    )
}

export default AddQuiz;