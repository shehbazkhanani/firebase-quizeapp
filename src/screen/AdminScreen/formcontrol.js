import { Box, Button, Card, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import BasicDatePicker from "../../component/datepicker";
import MultipleSelect from "../../component/multipleselect";
import app from "../../config/firebaseconfig";

function FormControl () {
const initialData = {
    course : "",
    isFormOpen : "",
    countryName : "",
    cityName : [],
    admissionStart : "",
    admissionEnd : ""
}
 const [data, setData] = useState(initialData)
 const [isCourse, setIsCourse] = useState("")
 const [course, setCourse] = useState("")
 const [isCourseStatus, setIsCourseStatus] = useState("")
 const [isCountry, setIsCountry] = useState("")
 const [isCity, setIsCity] = useState("")
 const [isFilteredCountry, setIsFilteredCountry] = useState("")
 const [filteredCity, setFilteredCity] = useState("")

 const database = getDatabase(app)
 const getData = () => {
    const reference = ref(database, `course`)
    onValue(reference, (e) => {
        const val = e.val()
        const value = Object.values(val)
        const key = Object.keys(val)
        const status = e.exists()
        if(status){
            let courseName = value.map((e) => {
                return e.courseName
            })
            let course = new Set(courseName)
            setIsCourse([...course])
        }
    })
 }

 const getCountry = () => {
    const reference = ref(database, `City`)
    onValue(reference, (e) => {
        const val = e.val()
        const value = Object.values(val)
        const key = Object.keys(val)
        const status = e.exists()
        if(status){
            let country = value.map((e) => {
                return e.country
            })
            let countryName = new Set(country)
            setIsCountry([...countryName])
            key.map((x)=> setIsCity(value.map((e)=> {
                return {
                    ...e,
                    uid : x
                }

            })))
        }
    })
 }
 
 useEffect(() => {
    getData()
    getCountry()
 }, [])

 const courseEvent = (e) => {
    setCourse(e.target.value)
    setData({...data, isFormOpen : e.target.value})
 }

 const CourseStatus = [
    { status: "Open" },
    { status: "CLose" },
  ];

  const statusEvent = (e) => {
    setIsCourseStatus(e.target.value)
    setData({...data, course : e.target.value})
  }

  const countryEvent = (e) => {
    setIsFilteredCountry(e.target.value)
    setData({...data, countryName : e.target.value})

  }


  const getCity = () => {
    isFilteredCountry.length>0&&
    setFilteredCity(isCity.filter((e) => {
        return isFilteredCountry == e.country
    }).map((x) => {
        return x.city
    }))
  }
 
  useEffect(()=> {
    getCity()
  }, [isFilteredCountry])

  const submitHandler = () => {
   const reference = ref(database, `formControl`)
   push(reference, data).then((succ) => {
    console.log(succ);
   }).then((err)=> {
    console.log(err);
   })
    setFilteredCity("")
    setIsFilteredCountry("")
    setIsCourseStatus("")
    setCourse("")
    setData(initialData)
  }

    return ( 
    <>
         <Box sx={{backgroundColor : "#ff9671", minHeight : '90vh', height:"fit-Content", padding : 'none', margin : 'none'}}>
 <Grid
        container
        sx={{ display: "flex", justifyContent: "center", height : '80vh', alignItems : 'center'}}
      >
        <Grid item md={6} sm={12} xs={12}>
          <Card
            sx={{
              width: { md: "50vw" },
              display: "flex",
              justifyContent: "center",
            }}
          >
         <Box sx={{ width: "100%" }}>
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <Typography variant="h4"> Form Control </Typography>
              </Box>
              <Box sx={{display : 'flex', justifyContent: 'space-evenly', width : '100%', marginTop : 4}}>
              <Box sx={{width : '40%'}}>
              <TextField
              sx={{ margin: 1}}
              fullWidth
                    select
                    label="Select your Course"
                    value={isCourseStatus}
                    onChange={statusEvent}
                    helperText="Please select your course"
                    variant="standard"
                  >
                    {!!isCourse.length > 0 &&
                      isCourse.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                  </TextField>
                  </Box>
                  <Box sx={{width : '40%'}}>
              <TextField
              sx={{ margin: 1}}
              fullWidth
                    select
                    label="Select your Course"
                    value={isCourseStatus}
                    onChange={courseEvent}
                    helperText="Open / Close"
                    variant="standard"
                  >
                    {!!CourseStatus.length > 0 &&
                      CourseStatus.map((option) => (
                        <MenuItem key={option.status} value={option.status}>
                          {option.status}
                        </MenuItem>
                      ))}
                  </TextField>
                  </Box>
                  </Box>
                  <Box sx={{display : 'flex', justifyContent: 'space-evenly', width : '100%', marginTop : 4}}>
                  <Box sx={{width : '40%'}}>
              <TextField
              sx={{ margin: 1}}
              fullWidth
                    select
                    label="Select Country"
                    value={isFilteredCountry}
                    onChange={countryEvent}
                    helperText="Please select your country"
                    variant="standard"
                  >
                    {!!isCountry.length > 0 &&
                      isCountry.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                  </TextField>
                  </Box>
                  <Box sx={{width : '40%'}}>
                    <MultipleSelect value={filteredCity} name="Select City" onChange={(e) => setData({...data, cityName : e})} />
                  </Box>
                  </Box>
                  <Box sx={{display : 'flex', justifyContent: 'space-evenly', width : '100%', marginTop : 4}}>
                  <Box sx={{width : '40%'}}>
                <BasicDatePicker name="Admission Start" values={data.admissionStart} onChange={(e) => setData({...data, admissionStart : e})}/>
                  </Box>
                  <Box sx={{width : '40%'}}>
                  <BasicDatePicker name="Admission End" values={data.admissionEnd} onChange={(e) => setData({...data, admissionEnd : e})}/>
                  </Box>
                  </Box>
                  <Box sx={{width : '100%', textAlign : 'center', marginTop : 4}}>
                  <Button color="warning"
                  variant="contained"
                  sx={{ m: 1, width: "30%", height: "4vh", marginBottom: 2 }} onClick={submitHandler}> Submite </Button>
             </Box>
              </Box>
            </Card>
            </Grid>
            </Grid>
            </Box>
    </>
    )
}

export default FormControl;