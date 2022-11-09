import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import app from "../../config/firebaseconfig";
import { getDatabase, onValue, ref } from "firebase/database";

function ShowResult() {
  const database = getDatabase(app);
  const [data, setData] = useState({});
  const [categories, setCategories] = useState("");
  const [isError, setIsError] = useState(data);
  const [isCategory, setIsCategory] = useState("");
  const [isResultData, setIsResultData] = useState([]); 
  const [filteredResultData, setFilteredResultData] = useState([]); 
  const [isSearch, setIsSearch] = useState("");

  const getData = () => {
    const reference = ref(database, `Result`);
    onValue(reference, (e) => {
      const value = e.val();
      const status = e.exists();
      if (status) {
        const val = Object.values(value);
        const filteredData = val.filter((e) => e.isShowResult == true);
        setData(filteredData);
        const course = filteredData.map((e) => e.category);
        const cateGory = new Set(course);
        setCategories([...cateGory]);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const categoryEvent = (event) => {
    setIsCategory(event.target.value);
  };

  const submitEvent = () => {
    // validate(setIsError(data));
    let dataOne = [];
    data
      .filter((e) => {
        return e.category == isCategory;
      })
      .map((e) => {
        dataOne = e.resultData;
      });
    setIsResultData(dataOne);
  };

  const searchEvent = (e) => {
      setIsSearch(e.target.value)
  }

  const searchHandle = () => {
    let dataOne = []
    let show = isResultData.filter((e)=> {
      return isSearch == e.rollNo
    })
    dataOne = show;
    setFilteredResultData(dataOne);
  }
  //   const validate = (value) => {
  //     const error = {};
  //     if (!value.category) {
  //       error.category("category must required");
  //     }
  //     return error;
  //   };

  return (
    <>
      <div
        style={{
          backgroundColor: "#ff9671",
          height: "91vh",
          padding: "none",
          margin: "none",
        }}
      >
        <Link to="/dashboard">
          <ArrowBackIcon />
        </Link>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item md="6" sm="12" xs="12">
            <Card sx={{ width: { md: "50vw" } }}>
              <Box sx={{ textAlign: "center", paddingTop: 1 }}>
                <Typography variant="h4"> Display Result Form </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ marginTop: 3 }}></Box>
                <Box sx={{ width: "60%" }}>
                  <Typography> {isError.category} </Typography>
                  <TextField
                    select
                    fullWidth
                    label="Select your Course"
                    value={isCategory}
                    onChange={categoryEvent}
                    helperText="Please select your course"
                    variant="standard"
                  >
                    {!!categories.length > 0 &&
                      categories.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                  </TextField>
                </Box>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  color="warning"
                  variant="contained"
                  sx={{ m: 1, width: "90%", height: "4vh", marginBottom: 2 }}
                  onClick={submitEvent}
                >
                  Submit
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
        {isResultData.length > 0 ? (
            <Box>
                <Grid container sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                    <Grid item md="6" sm="12" xs="12">
                        <Card sx={{ width: { md: "50vw" }, display : 'flex', justifyContent : 'center'}}>
                            <Box sx={{width : '50%'}}> 
                        <TextField id="standard-basic" fullWidth label="Roll NO#" variant="standard" onChange={searchEvent} />
                        </Box>
                        <Box sx={{width : '40%', paddingTop : 2}}> <Button onClick={searchHandle} color="warning"
                  variant="contained"
                  sx={{ m: 1, width: "100%", height: "4vh", marginBottom: 2 }}> Search </Button> </Box>
                        </Card>
                    </Grid>
                </Grid>
                { filteredResultData.length > 0 ? 
                <Grid
            container
            sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
          >
            <Grid item md="6" sm="12" xs="12">
              <Card sx={{ width: { md: "50vw" } }}>
              <table style={{ width: "100%", textAlign: "center" }}>
                  <th style={{}}>
                    <tr>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        Student Name
                      </td>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        Student Roll No
                      </td>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        Student Marks
                      </td>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        Student Result
                      </td>
                    </tr>
                  </th>
                </table>
              {filteredResultData.map((event) => {
                  return (
                    <table style={{ width: "100%", textAlign: "center" }}>
                      <tr>
                        <td style={{ width: "20%" }}> {event.name} </td>
                        <td style={{ width: "20%" }}> {event.rollNo} </td>
                        <td style={{ width: "20%" }}> {event.marks} </td>
                        <td style={{ width: "20%" }}> {event.result} </td>
                      </tr>
                    </table>
                  );
                })}
              </Card>
            </Grid>
          </Grid>
          : ""}
          <Grid
            container
            sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
          >
            <Grid item md="6" sm="12" xs="12">
              <Card sx={{ width: { md: "50vw" } }}>
                <table style={{ width: "100%", textAlign: "center" }}>
                  <th style={{}}>
                    <tr>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        Student Name
                      </td>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        Student Roll No
                      </td>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        Student Marks
                      </td>
                      <td
                        style={{
                          width: "25vw",
                          borderBottom: "1px solid grey",
                        }}
                      >
                        Student Result
                      </td>
                    </tr>
                  </th>
                </table>
                {isResultData.map((event) => {
                  return (
                    <table style={{ width: "100%", textAlign: "center" }}>
                      <tr>
                        <td style={{ width: "20%" }}> {event.name} </td>
                        <td style={{ width: "20%" }}> {event.rollNo} </td>
                        <td style={{ width: "20%" }}> {event.marks} </td>
                        <td style={{ width: "20%" }}> {event.result} </td>
                      </tr>
                    </table>
                  );
                })}
              </Card>
            </Grid>
          </Grid>
          </Box>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ShowResult;
