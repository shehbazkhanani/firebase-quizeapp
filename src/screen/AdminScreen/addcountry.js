import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../../config/firebaseconfig";


function AddCountry() {
    const database = getDatabase(app)
    const [data, setData] = useState([])
    const [isData, setIsData] = useState([])
    console.log(isData, 'Result Data');
    const submitEvent = () => {
    const reference = ref(database, `Country`)
    push(reference, data) 
    }

    const getData = () => {
      const reference = ref(database, `Country`)
      onValue(reference, (e) =>{
        const value = e.val();
        const status = e.exists()
        if(status){
            setIsData(Object.values(value))
        }
      })
    }

    useEffect(() => {
        getData()
    }, [data])

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
                <Typography variant="h4"> Add Country </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <TextField
                  sx={{ margin: 1 }}
                  onChange={(e) =>
                    setData((event) => ({ ...event, country : e.target.value }))
                  }
                  variant="standard"
                  label="Add Country"
                />
                <TextField
                  sx={{ margin: 1 }}
                  variant="standard"
                  label="Add Country Code"
                  onChange={(e) => 
                    setData((event) => ({...event, countryCode : e.target.value}))}
                />
                <TextField
                  sx={{ margin: 1 }}
                  variant="standard"
                  label="Add Currency"
                  onChange={(e)=> 
                    setData((event) => ({...event, currency : e.target.value}))}
                />
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                onClick={submitEvent}
                  color="warning"
                  variant="contained"
                  sx={{ m: 1, width: "30%", height: "4vh", marginBottom: 2 }}
                >
                  {" "}
                  Submit{" "}
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
                       Country Name
                      </td>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                       Country Code
                      </td>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        Currency
                      </td>
                    </tr>
                  </th>
                </table>
              {isData.map((event) => {
                  return (
                    <table style={{ width: "100%", textAlign: "center" }}>
                      <tr>
                        <td style={{ width: "20%" }}> {event.country} </td>
                        <td style={{ width: "20%" }}> {event.countryCode} </td>
                        <td style={{ width: "20%" }}> {event.currency} </td>
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

export default AddCountry;
