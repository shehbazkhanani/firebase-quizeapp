import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import app from "../../config/firebaseconfig";
import { getDatabase, onValue, push, ref } from "firebase/database";

function Information() {
  const weak = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date();
  const month = date.getMonth(months);
  const RegistrationMonth = months[month];
  const day = date.getDay();
  const RegistrationDay = weak[day];
  const year = date.getFullYear();

  const [category, setCategory] = useState("");
  const [isCourse, setIsCourse] = useState("")
  const [section, setSection] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    cours: "",
    section: "",
    contact: "",
    cnic: "",
    dateOfBirth: "",
    age: "",
    fatherName: "",
    fatherContact: "",
    emergencyContact: "",
    fatherCnic: "",
  });

  const DathofBirth = `${dob.$M}-${dob.$D}-${dob.$y}`;
  data.dateOfBirth = DathofBirth;

  useEffect(() => {
    setAge(dob ? year - dob.$y : "");
    data.age = year - dob.$y;
  }, [dob]);

  const database = getDatabase(app);

  const submited = () => {
    const reference = ref(database, `information`);
    push(reference, data);
  };
  const CourseChange = (event) => {
    setIsCourse(event.target.value);
    setData((parm) => ({ ...parm, course: event.target.value }));
  };

  const SectionChange = (event) => {
    setSection(event.target.value);
    setData((parm) => ({ ...parm, section: event.target.value }));
  };

  const getData = () => {
    const reference = ref(database, `course`);
    onValue(reference, (e) => {
      let val = e.val();
      let status = e.exists();
      if (status) {
        let value = Object.values(val);
        let coursevalue = value.map((e) => {
          return e.courseName;
        });
        let courseVal = new Set(coursevalue);
        setCategory([...courseVal]);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const sections = [{ name: "A" }, { name: "B" }, { name: "C" }];

  return (
    <>
        <Box sx={{backgroundColor : "#ff9671", height : '130vh', maxHeight:"fit-Content", padding : 'none', margin : 'none',  alignItems : 'center'}}>
      <Box>
        <Grid container sx={{ display: "flex", justifyContent: "center", height : "130vh", alignItems : 'center' }}>
          <Grid item md={6} sm={12} xs={12} sx={{ width: "30%" }}>
            <Card sx={{ alignItem: "center" }}>
              <Box sx={{ textAlign: "center", marginTop: 5 }}> </Box>

              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "roboto",
                    fontWeight: "bold",
                    fontSize: "1.6rem",
                  }}
                >
                  REGISTER FORM
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width : '100%',
                    marginTop: 4,
                    display: "flex",
                    justifyContent : "space-evenly"
                  }}
                >
                  <Box sx={{width : "40%"}}>
                  <TextField
                  fullWidth
                    onChange={(e) =>
                      setData((parm) => ({
                        ...parm,
                        firstName: e.target.value,
                      }))
                    }
                    type="text"
                    label="First Name*"
                    variant="standard"
                    id="fullWidth"
                  />
                      </Box>
                      <Box sx={{width : '40%'}}>
                  <TextField
                    onChange={(e) =>
                      setData((parm) => ({ ...parm, lastName: e.target.value }))
                    }
                   fullWidth
                    type="text"
                    label="Last Name*"
                    variant="standard"
                    id="fullWidth"
                  />
              </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width : '100%',
                  marginTop: 1,
                  textAlign: "center",
                  display: "flex",
                  justifyContent : 'space-evenly'
                }}
              >
                <Box sx={{width : '40%'}}>
                <TextField
                  select
                  label="Select your Course"
                  value={isCourse}
                  onChange={CourseChange}
                  helperText="Please select your course"
                  variant="standard"
                  fullWidth
                >
                  {category && category.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                </Box>
                <Box sx={{width : '40%'}}>
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
              </Box>

              <Box
                sx={{
                  width : "100%",
                  marginTop: 1,
                  textAlign: "center",
                  display: "flex",
                  justifyContent : 'space-evenly'
                }}
              >
                 <Box sx={{width : '40%'}}>
                <TextField
                  onChange={(e) =>
                    setData((parm) => ({ ...parm, contact: e.target.value }))
                  }
                 fullWidth
                  type="number"
                  label="Contact*"
                  variant="standard"
                  id="fullWidth"
                />
                </Box>
                 <Box sx={{width : '40%'}}>
                <TextField
                  onChange={(e) =>
                    setData((parm) => ({ ...parm, cnic: e.target.value }))
                  }
                 fullWidth
                  type="cnic"
                  label="CNIC*"
                  variant="standard"
                  id="fullWidth"
                />
                </Box>
              </Box>

              <Box
                sx={{
                  width : "100%",
                  marginTop: 1,
                  textAlign: "center",
                  display: "flex",
                  justifyContent : "space-evenly"
                }}
              >
                 <Box sx={{width : '40%'}}>
                <LocalizationProvider
                  variant="standard"
                  dateAdapter={AdapterDayjs}
                >
                  <DatePicker
                    label="Date of Birth"
                    value={dob}
                    onChange={(newValue) => {
                      setDob(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                </Box>
                <Box sx={{width : '40%'}}>
                <TextField
                 fullWidth
                  type="text"
                  label="Age*"
                  value={age}
                  variant="standard"
                />
                </Box>
              </Box>
              <Box
                sx={{
                  width : '100%',
                  display: "flex",
                  justifyContent : 'center'
                }}
              >
                <TextField
                  onChange={(e) =>
                    setData((parm) => ({ ...parm, fatherName: e.target.value }))
                  }
                  sx={{ m: 1, width: "90%" }}
                  type="text"
                  label="Father Name*"
                  variant="standard"
                />
              </Box>
              <Box
                 sx={{
                  width : '100%',
                  display: "flex",
                  justifyContent : 'center'
                }}
              >
                <TextField
                  onChange={(e) =>
                    setData((parm) => ({ ...parm, fatherCnic: e.target.value }))
                  }
                  sx={{ m: 1, width: "90%" }}
                  type="cnic"
                  label="First CNIC*"
                  variant="standard"
                />
              </Box>
              <Box
                sx={{
                  width : '100%',
                  display: "flex",
                  justifyContent : 'center'
                }}
              >
                <TextField
                  onChange={(e) =>
                    setData((parm) => ({
                      ...parm,
                      fatherContact: e.target.value,
                    }))
                  }
                  sx={{ m: 1, width: "90%" }}
                  type="number"
                  label="Father Contact*"
                  variant="standard"
                />
              </Box>
              <Box
                 sx={{
                  width : '100%',
                  display: "flex",
                  justifyContent : 'center'
                }}
              >
                <TextField
                  onChange={(e) =>
                    setData((parm) => ({
                      ...parm,
                      emergencyContact: e.target.value,
                    }))
                  }
                  sx={{ m: 1, width: "90%" }}
                  type="number"
                  label="Emergency Number*"
                  variant="standard"
                />
              </Box>

              <Box sx={{ marginTop: 1, textAlign: "center" }}>
                <Button
                  onClick={submited}
                  sx={{ m: 1, width: "90%" }}
                  variant="contained"
                  color="warning"
                >
                  Submited
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      </Box>
    </>
  );
}

export default Information;
