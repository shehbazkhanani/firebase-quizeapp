import { display } from "@mui/system";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import MultipleSelect from "../../component/multipleselect";
import app from "../../config/firebaseconfig";

const {
  Grid,
  Card,
  Box,
  TextField,
  Typography,
  Button,
  Chip,
  MenuItem,
} = require("@mui/material");

function TrainerRegistrationForm() {
  const initialData = {
    firstName: "",
    lastName: "",
    CNIC: "",
    contact: "",
    qualification: "",
    otherQualifications: "",
  };
  const [data, setData] = useState(initialData);
  console.log(data, 'daaataa');
  const [otherQualification, setOtherQualification] = useState("");
  const [isOtherQualification, setIsOtherQualification] = useState([]);
  const [isCourse, setIsCourse] = useState("");

  useEffect(() => {
    getCourse();
  }, []);

  const database = getDatabase(app);

  const getCourse = () => {
    const reference = ref(database, `formControl`);
    onValue(reference, (e) => {
      let val = e.val();
      let status = e.exists();
      if (status) {
        let value = Object.values(val);
        let filteredCourse = value
          .filter((e) => {
            return e.isFormOpen == "Open";
          })
          .map((e) => {
            return e.course;
          });
        let newCourse = new Set(filteredCourse);
        setIsCourse([...newCourse]);
      }
    });
  };

  const selectQualification = () => {
    if (otherQualification) {
      setIsOtherQualification([...isOtherQualification, otherQualification]);
      setOtherQualification("");
    }
  };

  const chip =
    isOtherQualification &&
    isOtherQualification.map((e, i) => {
      return (
        <Chip
          sx={{ margin: 1 }}
          key={i}
          label={e}
          variant="outlined"
          onDelete={() => deleteQualification(e)}
        />
      );
    });

  const deleteQualification = (event) => {
    setIsOtherQualification(
      isOtherQualification.filter((e) => {
        return e !== event;
      })
    );
  };

  useEffect(()=> {
    setData({...data, otherQualifications : isOtherQualification})
  }, [isOtherQualification])
  const submitHandler = () => {
    const reference = ref(database, `TrainerRegistration`)
    push(reference, data)
    setData(initialData)
  }

  return (
    <>
    <div style={{backgroundColor : "#ff9671", minHeight : '100vh', maxHeight : "fit-Content", padding : 'none', margin : 'none'}}>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", height : '100vh', alignItems : 'center'}}
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
              <Box sx={{ textAlign: "center", marginTop : 3}}>
                <Typography variant="h5">
                  TRAINER REGISTRATION FORM
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: 3,
                }}
              >
                <Box sx={{ width: "40%" }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="FirstName*"
                    onChange={(e) =>
                      setData((event) => ({
                        ...event,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </Box>
                <Box sx={{ width: "40%" }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="LastName*"
                    onChange={(e) =>
                      setData((event) => ({
                        ...event,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: 3,
                }}
              >
                <Box sx={{ width: "40%" }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="CNIC*"
                    onChange={(e) =>
                      setData((event) => ({ ...event, CNIC: e.target.value }))
                    }
                  />
                </Box>
                <Box sx={{ width: "40%" }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Contact*"
                    onChange={(e) =>
                      setData((event) => ({
                        ...event,
                        contact: e.target.value,
                      }))
                    }
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: 3,
                }}
              >
                <Box sx={{ width: "40%" }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Qualification*"
                    onChange={(e) =>
                      setData((event) => ({
                        ...event,
                        qualification: e.target.value,
                      }))
                    }
                  />
                </Box>
                <Box
                  sx={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box sx={{ width: "70%" }}>
                    <TextField
                      fullWidth
                      variant="standard"
                      value={otherQualification}
                      onChange={(e) => {
                        setOtherQualification(e.target.value);
                      }}
                      label="Other Qualification*"
                    />
                  </Box>
                  <Box sx={{ width: "20%", marginTop: 2 }}>
                    <Button
                      sx={{ width: "100%" }}
                      onClick={selectQualification}
                    >
                      add
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: 1,
                }}
              >
                {chip}
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: 3,
                }}
              >
                <Box sx={{ width: "80%", marginTop : 2 }}>
                  <MultipleSelect
                    value={isCourse}
                    name="Select Course"
                    onChange={(e) => setData({ ...data, course: e })}
                  />
                </Box>
              </Box>
              <Box sx={{ width: "100%", display : 'flex', justifyContent : 'center'}}>
                <Button
                  color="warning"
                  variant="contained"
                  sx={{ m: 1, width: "40%", height: "4vh", marginBottom: 3, marginTop : 3 }}
                  onClick={submitHandler}
                >
                  Submite
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      </div>
    </>
  );
}

export default TrainerRegistrationForm;
