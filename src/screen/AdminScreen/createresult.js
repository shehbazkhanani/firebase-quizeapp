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
import USswitch from "../../component/switch";
import { useState } from "react";
import app from "../../config/firebaseconfig";
import {getDatabase, push, ref } from "firebase/database";


function CreateResult() {
const database = getDatabase(app)
  const [data, setData] = useState({});
  const [categories, setCategories] = useState("");
  const [isCourseStatus, setIsCourseStatus] = useState(false);
  const [isResultData, setIsResultData] = useState([
    {
      name: "ABC",
      marks: 80,
      rollNo: "AB123",
      result: "Pass",
    },
    {
      name: "DEF",
      marks: 80,
      rollNo: "AB124",
      result: "Pass",
    },
    {
      name: "IJK",
      marks: 30,
      rollNo: "AB125",
      result: "Fail",
    },
    {
      name: "IJK",
      marks: 30,
      rollNo: "AB126",
      result: "Fail",
    },
    {
      name: "IJK",
      marks: 30,
      rollNo: "AB127",
      result: "Fail",
    },
    {
      name: "IJK",
      marks: 30,
      rollNo: "AB127",
      result: "Fail",
    },
    {
      name: "IJK",
      marks: 30,
      rollNo: "AB128",
      result: "Fail",
    },
    {
      name: "IJK",
      marks: 30,
      rollNo: "AB128",
      result: "Fail",
    },
    {
      name: "IJK",
      marks: 30,
      rollNo: "AB121",
      result: "Fail",
    },
    {
      name: "IJK",
      marks: 30,
      rollNo: "AB121",
      result: "Fail",
    },
  ]);
  const [isError, setIsError] = useState(data)




  const categoryEvent = (event) => {
    setCategories(event.target.value);
  };

  const submitEvent = () => {
    setData({ ...data, category: categories, isShowResult: isCourseStatus, resultData : isResultData });
    // validate(setIsError(data))
    const reference = ref(database, `Result`)
    push(reference, data)
    setCategories("")
  };

// const validate = (value) => {
//    const error = {};
//    if(!value.category){
//     error.category("category must required")
//    }
//    return error
// }

  const category = [
    { name: "General Knowledge" },
    { name: "Science" },
    { name: "History" },
  ];
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
              <Box sx={{ textAlign: "center", paddingTop: 3 }}>
                <Typography variant="h4"> Create Result Form </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ marginTop: 2 }}>
                  <USswitch
                    onChange={(e) => setIsCourseStatus(e)}
                    lable="Course"
                  />
                </Box>
                <Box sx={{ width: "60%" }}>
                    <Typography> {isError.category} </Typography>
                  <TextField
                    fullWidth
                    select
                    label="Select your Course"
                    value={categories}
                    onChange={categoryEvent}
                    helperText="Please select your course"
                    variant="standard"
                  >
                    {category.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  color="warning"
                  variant="contained"
                  sx={{ m: 1, width: "90%", height: "4vh", marginBottom: 3 }}
                  onClick={submitEvent}
                >
                  Submit
                </Button>
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
              <table style={{ width: "100%", textAlign : 'center'}}>
                <th style={{}}>
                  <tr>
                    <td
                      style={{ width: "25vw", borderBottom: "1px solid grey" }}
                    >
                      Student Name
                    </td>
                    <td
                      style={{ width: "25vw", borderBottom: "1px solid grey" }}
                    >
                      Student Roll No
                    </td>
                    <td
                      style={{ width: "25vw", borderBottom: "1px solid grey" }}
                    >
                      Student Marks
                    </td>
                    <td
                      style={{ width: "25vw", borderBottom: "1px solid grey" }}
                    >
                      Student Result
                    </td>
                  </tr>
                </th>
              </table>
              {isResultData.map((event) => {
                return (
                  <>
                    <table style={{ width: "100%", textAlign: "center" }}>
                      <tr>
                        <td style={{ width: "20%" }}> {event.name} </td>
                        <td style={{ width: "20%" }}> {event.rollNo} </td>
                        <td style={{ width: "20%" }}> {event.marks} </td>
                        <td style={{ width: "20%" }}> {event.result} </td>
                      </tr>
                    </table>
                  </>
                );
              })}
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default CreateResult;
