import {
  Alert,
  AlertTitle,
  Button,
  Card,
  Chip,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import app from "../../config/firebaseconfig";
import { getDatabase, push, ref } from "firebase/database";

function AddCource() {
  const database = getDatabase(app);
  let initialList = {
    courseName: "",
    courseDuration: "",
    courseStatus: "",
    noOfQuiz: "",
    fees: "",
    leadTrainer: "",
    asistantTrainer: "",
  };

  const [data, setData] = useState(initialList);
  const [isAsistant, setIsAsistant] = useState("");
  const [asistantList, setAsistantList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState(initialList);
  const [isSuccess, setIsSuccess] = useState(false)

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleOpen = () => {
    setIsSubmit(true);
    setErrors(validate(data));
    if (Object.keys(errors).length === 0 && isSubmit) {
      setOpen(true);
    }
  };

  useEffect(()=>{
   setTimeout(() => {
    setIsSuccess(false)
   }, 5000);
  }, [isSuccess])

  const validate = (values) => {
    const error = {};
    if (!values.courseName) {
      error.courseName = "course name must required";
    } else if (values.courseName.length < 2) {
      error.courseName = "course name more then 2 character";
    } 
    if (!values.courseDuration) {
      error.courseDuration = "course duration must required";
    } 
    if (!values.courseStatus) {
      error.courseStatus = "course status must required";
    }
    if (!values.noOfQuiz) {
      error.noOfQuiz = "no# of quiz must required";
    }
    if (!values.fees) {
      error.fees = "fees must required";
    } 
    if (!values.leadTrainer) {
      error.leadTrainer = "lead trainer must required";
    }
    if (!values.asistantTrainer) {
      error.asistantTrainer = "asistant trainer must required";
    }
    return error;
  };

  const handleClose = () => {
    setOpen(false);
  };

  function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setIsSuccess(true)
      const reference = ref(database, `course`);
      push(reference, {
        ...data,
        courseDuration: `${data.courseDuration} Month`,
      });
      setData(initialList);
      setOpen(false);
    };

    return (
      <React.Fragment>
        <Button onClick={handleOpen}>Submited</Button>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200, backgroundColor: "white" }}>
            <h2 id="child-modal-title">Are You Sure?</h2>
            <p id="child-modal-description">This will be upload in firebase</p>
            <Button onClick={handleClose}>Confirm</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

  data.asistantTrainer = asistantList;

  const selectAsis = () => {
    if (isAsistant) {
      setAsistantList([...asistantList, isAsistant]);
    } else alert("please add trainer");
  };

  const deleteAsist = (event) => {
    setAsistantList(
      asistantList.filter((e) => {
        return e !== event;
      })
    );
  };

  const chip = asistantList.map((e, i) => {
    return (
      <Chip
        sx={{ margin: 1 }}
        key={i}
        label={e}
        variant="outlined"
        onDelete={() => deleteAsist(e)}
      />
    );
  });

  const [courseStatus, setCourseStatus] = useState("");

  const isCourseStatus = (event) => {
    setCourseStatus(event.target.value);
    setData((e) => ({ ...e, courseStatus: event.target.value }));
  };
  const courseOpen = [{ name: "Open" }, { name: "Closed" }];
  return (
    <>
     <div style={{backgroundColor : "#ff9671", minHeight : '100vh', height:"fit-Content", padding : 'none', margin : 'none'}}>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Grid item md="6" sm="12" xs="12">
        <Card
            sx={{
              width: { md: "50vw" },
              display: "flex",
              justifyContent: "center",
              marginTop : 2,
              marginBottom : 2
            }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                border: "1px solid black",
                width: "50vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {Object.keys(errors).length === 0 && isSuccess ? 
    <Alert severity="success">
    <AlertTitle>Success</AlertTitle>
    This is a success alert — <strong>check it out!</strong>
  </Alert> : "" }
              <Typography
                variant="h3"
                sx={{ borderBottom: "1px solid grey", marginTop: 3 }}
              >
                Create Course Form
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  marginTop: 4,
                }}
              >
                <Box sx={{ width: "40%"}}>
                  <Typography sx={{ color: "red" }}>
                    {errors.courseName}
                  </Typography>
                  <TextField
                    fullWidth
                    label="Course Name*"
                    value={data.courseName}
                    onChange={(e) =>
                      setData((event) => ({
                        ...event,
                        courseName: e.target.value,
                      }))
                    }
                  />
                </Box>
                <Box sx={{ width: "40%" }}>
                  <Typography sx={{ color: "red" }}>
                    {errors.courseDuration}{" "}
                  </Typography>
                  <TextField
                    value={data.courseDuration}
                    onChange={(e) =>
                      setData((event) => ({
                        ...event,
                        courseDuration: e.target.value,
                      }))
                    }
                    type="number"
                    fullWidth
                    label="Course Duration?*"
                    helperText="8 to 16 month?"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  marginTop: 3,
                }}
              >
                <Box sx={{ width: "40%" }}>
                  <Typography sx={{ color: "red" }}>
                    {errors.courseStatus}{" "}
                  </Typography>
                  <TextField
                    fullWidth
                    select
                    value={data.courseStatus}
                    label="Course Status"
                    onChange={isCourseStatus}
                    helperText="Open / Closed?"
                  >
                    {courseOpen.map((option) => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box sx={{ width: "40%" }}>
                  <Typography sx={{ color: "red" }}>
                    {errors.noOfQuiz}
                  </Typography>

                  <TextField
                    value={data.noOfQuiz}
                    onChange={(e) =>
                      setData((event) => ({
                        ...event,
                        noOfQuiz: e.target.value,
                      }))
                    }
                    type="number"
                    fullWidth
                    label="No of Quiz?*"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  marginTop: 3,
                }}
              >
                <Box sx={{ width: "40%" }}>
                  <Typography sx={{ color: "red" }}> {errors.fees} </Typography>

                  <TextField
                    fullWidth
                    value={data.fees}
                    onChange={(e) =>
                      setData((event) => ({ ...event, fees: e.target.value }))
                    }
                    type="number"
                    label="Fees in Rupees*"
                  />
                </Box>
                <Box sx={{ width: "40%" }}>
                  <Typography sx={{ color: "red" }}>
                    {errors.leadTrainer}
                  </Typography>
                  <TextField
                    fullWidth
                    value={data.leadTrainer}
                    onChange={(e) =>
                      setData((event) => ({
                        ...event,
                        leadTrainer: e.target.value,
                      }))
                    }
                    label="Lead Trainer*"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  marginTop: 3,
                }}
              >
                <Box sx={{ width: "40%" }}>
                  <Typography sx={{ color: "red" }}>
                    {errors.asistantTrainer}
                  </Typography>

                  <TextField
                    fullWidth
                    value={data.asistantList}
                    onChange={(e) => {
                      setIsAsistant(e.target.value);
                    }}
                    label="Assistant Trainer*"
                  />
                </Box>
                <Button sx={{ width: "40%" }} onClick={selectAsis}>
                  add
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  marginTop: 2,
                }}
              >
                {chip}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  marginBottom: 1,
                }}
              >
                <Button  color="warning"
                  variant="contained"
                  sx={{ m: 1, width: "40%", height: "4vh", marginBottom: 3, marginTop : 3 }} onClick={handleOpen}>Submited</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box sx={{ ...style, width: 400, backgroundColor: "white" }}>
                    <h2 id="parent-modal-title">This is your Course Form</h2>
                    <p id="parent-modal-description">
                      Couse Name : {data.courseName}
                    </p>
                    <p id="parent-modal-description">
                      Couse Durations : {data.courseDuration} Month
                    </p>
                    <p id="parent-modal-description">
                      Couse Status : {data.courseStatus}
                    </p>
                    <p id="parent-modal-description">
                      No of Quiz : {data.noOfQuiz}
                    </p>
                    <p id="parent-modal-description">Fees : {data.fees}</p>
                    <p id="parent-modal-description">
                      Lead Trainer : {data.leadTrainer}
                    </p>
                    <p id="parent-modal-description">
                      Assistant Trainer : {data.asistantTrainer}
                    </p>
                    <ChildModal />
                  </Box>
                </Modal>
              </Box>
            </Box>
          </Box>
          </Card>
        </Grid>
      </Grid>
      </div>
    </>
  );
}

export default AddCource;
