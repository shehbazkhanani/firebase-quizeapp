import { Box, Button, Card, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import app from "../../config/firebaseconfig";
import { getDatabase, push, ref, } from "firebase/database";


function Information() {


const weak = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] 

const date = new Date()
const month = date.getMonth(months);
const RegistrationMonth = months[month]
const day = date.getDay();
const RegistrationDay = weak[day]
const year = date.getFullYear();


const [course, setCourse] = useState('');
const [section, setSection] = useState('');
const [dob, setDob] = useState('')
const [age, setAge] = useState("")
const [data, setData] = useState ({
  firstName : "",
  lastName : "",
  cours : "",
  section : "",
  contact : "",
  cnic : "",
  dateOfBirth : "",
  age : "",
  fatherName : "",
  fatherContact : "",
  emergencyContact : "",
  fatherCnic : "",
})

const DathofBirth = `${dob.$M}-${dob.$D}-${dob.$y}`
data.dateOfBirth = DathofBirth;

useEffect(()=>{
  setAge(dob?year - dob.$y:"")
  data.age = year - dob.$y
},[dob])

  
const database = getDatabase(app)

const submited = () => {
const reference = ref(database, `information`)
push(reference, data)
}





          const CourseChange = (event) => {
          setCourse(event.target.value);
          setData((parm)=> ({...parm, cours : event.target.value}))
        }

          

          const SectionChange = (event) => {
            setSection(event.target.value);
            setData((parm)=> ({...parm, section : event.target.value}))
          }
  
      
    const courses = [
        {name : 'General Knowledge'},
        {name : 'Science'},
        {name : "History"}
    ]

    const sections = [
        {name : 'A'},
        {name : 'B'},
        {name : "C"}
    ]

    return (
        <>
       <Box sx={{marginTop : '15vh'}}>
        <Grid container sx={{display : "flex", justifyContent : "center"}}>
       <Grid item md={6} sm={12} xs={12} sx={{ width: "30%" }}>
                    <Card sx={{ alignItem: "center" }}>
                        <Box sx={{ textAlign: "center", marginTop: 5 }}>  </Box>
                       
                        <Box sx={{ textAlign: "center", marginTop: 2 }}> 
                        
                        <Typography variant="p" sx={{fontFamily : 'roboto', fontWeight : "bold", fontSize : "1.6rem"}} > REGISTER FORM </Typography>
                         </Box>
                       
                       
                        <Box sx={{ textAlign: "center" }}>
                            <Box
                                sx={{

                                    marginTop: 4, textAlign: "center", display : 'flex'
                                }}
                            >
                                <TextField onChange={(e)=> setData((parm)=> ({...parm, firstName : e.target.value}))} sx={{ m: 1, width: "90%" }} type="text" label="First Name*" variant="standard" id="fullWidth" />
                                <TextField onChange={(e)=> setData((parm)=> ({...parm, lastName : e.target.value}))} sx={{m : 1, width: "90%" }} type="text" label="Last Name*" variant="standard" id="fullWidth" />
                            </Box>
                        </Box>
                        <Box sx={{
                            marginTop: 1, textAlign: "center", display : "flex"
                        }}
                        >
                            <TextField
       select
          label="Select your Course"
          value={course}
          onChange={CourseChange}
          helperText="Please select your course"
          variant="standard"
          fullWidth
        >
          {courses.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
      select
          label="Select Your Section"
          value={section}
          onChange={SectionChange}
          helperText="Please select your course"
          variant="standard"
          fullWidth
        >
          {sections.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
                        </Box>

                        <Box sx={{
                            marginTop: 1, textAlign: "center", display : "flex"
                        }}
                        >
                            <TextField onChange={(e)=> setData((parm)=> ({...parm, contact : e.target.value}))} sx={{ m: 1, width: "90%" }} type="number" label="Contact*" variant="standard" id="fullWidth" />
                            <TextField onChange={(e)=> setData((parm)=> ({...parm, cnic : e.target.value}))} sx={{ m: 1, width: "90%" }} type="cnic" label="CNIC*" variant="standard" id="fullWidth" />
                        </Box>



                        <Box sx={{
                            marginTop: 1, textAlign: "center", display : "flex"
                        }}
                        >
                   
              <LocalizationProvider variant="standard" dateAdapter={AdapterDayjs}> 
        <DatePicker
          label="Date of Birth"
          value={dob}
          onChange={(newValue) => {
            setDob(newValue);
          }}
        renderInput={(params) => <TextField {...params} />}
        />
</LocalizationProvider>
          <TextField sx={{ m: 1, width: "50%" }} type="text" label="Age*" value={age} variant="standard" />
</Box>
<Box
                                sx={{

                                     textAlign: "center", display : 'flex'
                                }}
                            >
                                <TextField onChange={(e)=> setData((parm)=> ({...parm, fatherName : e.target.value}))} sx={{ m: 1, width: "90%" }} type="text" label="Father Name*" variant="standard"  />
                            </Box>
                            <Box
                                sx={{

                                     textAlign: "center", display : 'flex'
                                }}
                            >
                                <TextField onChange={(e)=> setData((parm)=> ({...parm, fatherCnic : e.target.value}))} sx={{ m: 1, width: "90%" }} type="cnic" label="First CNIC*" variant="standard"  />
                            </Box><Box
                                sx={{

                                     textAlign: "center", display : 'flex'
                                }}
                            >
                                <TextField onChange={(e)=> setData((parm)=> ({...parm, fatherContact : e.target.value}))} sx={{ m: 1, width: "90%" }} type="number" label="Father Contact*" variant="standard"  />
                            </Box>
                            <Box
                                sx={{

                                     textAlign: "center", display : 'flex'
                                }}
                            >
                                <TextField onChange={(e)=> setData((parm)=> ({...parm, emergencyContact : e.target.value}))} sx={{ m: 1, width: "90%" }} type="number" label="Emergency Number*" variant="standard"  />
                            </Box>

                        <Box sx={{ marginTop: 1, textAlign: "center" }}>
                          <Button onClick={submited} sx={{m : 1, width: "90%" }} variant="contained" color="warning"> Submited </Button> 
                        </Box>
                       
                    </Card>
                </Grid>
                </Grid>
      
       </Box>
        </>
    )
}

export default Information;