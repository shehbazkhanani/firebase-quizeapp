import { Box, Button, Card, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { getDatabase, onValue, push, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../../config/firebaseconfig";


function AddCity() {
    const intintialData = {
        city : "",
        cityCode : "",
        country : ""
    }
    const database = getDatabase(app)
    const [data, setData] = useState(intintialData)
    const [isData, setIsData] = useState([])
    const [isCountryName, setIsCountryName] = useState("")
    const [isCategory, setIsCategory] = useState("")

    const submitEvent = () => {
    const reference = ref(database, `City`)
    push(reference, data)
    setIsCategory("")
    setData(intintialData)
    }

    const getData = () => {
      const reference = ref(database, `City`)
      onValue(reference, (e) =>{
        const value = e.val();
        const key = Object.keys(value)
        const Obj = Object.values(value)
        const status = e.exists()
        if(status){
          key.map((x)=>{
            setIsData(Obj.map((e,i)=>{
              return {
                ...e,
                uid:x
              }
            }))
          })
        }
      })
    }

    useEffect(() => {
        getData()
    }, [data])

useEffect(() => {
    const reference = ref(database, `Country`)
    onValue(reference, (e) =>{
      const value = e.val();
      const status = e.exists()
      if(status){
          const val = Object.values(value)
          const countryName = val.map((e) => {
           return e.country
          })
          const isCountry = new Set(countryName)
          setIsCountryName([...isCountry])
      }
    })
}, [])


const categoryEvent = (event) => {
    setIsCategory(event.target.value);
    setData((e) => ({ ...e, country : event.target.value }))
  };

  const deleteEvent = (event) => {
    let uid = event.uid
    const reference = ref(database, `City/${uid}`)
    remove(reference)
  }

  return (
    <>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      >
        <Grid item md="6" sm="12" xs="12">
          <Card
            sx={{
              width: { md: "50vw" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <Typography variant="h4"> Add City </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
              <TextField
              sx={{ margin: 1, width : "40%" }}
                    select
                    label="Select your Course"
                    value={isCategory}
                    onChange={categoryEvent}
                    helperText="Please select your course"
                    variant="standard"
                  >
                    {!!isCountryName.length > 0 &&
                      isCountryName.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                  </TextField>
                <TextField
                  value={data.city}
                  sx={{ margin: 1, width : "40%" }}
                  onChange={(e) =>
                    setData((event) => ({ ...event, city : e.target.value }))
                  }
                  variant="standard"
                  label="Add City"
                />
                <TextField
                  value={data.cityCode}
                  sx={{ margin: 1,  width : "40%"  }}
                  variant="standard"
                  label="Add City Code"
                  onChange={(e) => 
                    setData((event) => ({...event, cityCode : e.target.value}))}
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                onClick={submitEvent}
                  color="warning"
                  variant="contained"
                  sx={{ m: 1, width: "30%", height: "4vh", marginBottom: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid
            container
            sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
          >
      <Grid item md="6" sm="12" xs="12">
              <Card sx={{ width: { md: "50vw" } }}>
              <table style={{ width: "100%", textAlign: "center" }}>
                  <th>
                    <tr>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                       City Name
                      </td>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                      City Code
                      </td>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                       Country Name
                      </td>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                      Action
                      </td>
                    </tr>
                  </th>
                </table>
              {isData.map((event) => {
                  return (
                    <table style={{ width: "100%", textAlign: "center" }}>
                      <tr>
    <td style={{ width: "20%" }}> {event.city} </td>
                        <td style={{ width: "20%" }}> {event.cityCode} </td>
                        <td style={{ width: "20%" }}> {event.country} </td>
                        <td style={{ width: "20%" }}> <Button onClick={() =>deleteEvent(event)}> Delete </Button> </td>
                      </tr>
                    </table>
                  );
                })}
              </Card>
            </Grid>
          </Grid>
    </>
  );
}

export default AddCity;
