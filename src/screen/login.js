import { Alert, AlertTitle, Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logInUser } from "../config/firebasemethod";
import CircularProgress from "@mui/material/CircularProgress";
import LoginIcon from "@mui/icons-material/Login";
import StndImg from "../images/student.jpg";

function Login() {
  const navigate = useNavigate();
  const initialValue = {
    email: "",
    password: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [isLoading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(initialValue);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const loginUser = () => {
    setLoading(true);
    setFormErrors(validate(formValue));
    setIsSubmit(true);
    logInUser(formValue)
      .then((succ) => {
        setFormValue(initialValue);
        localStorage.setItem("myData", JSON.stringify(succ));
        if (succ.cAdmin == true) {
          navigate("/dashboard", {
            state: { succ },
          });
        } else {
          setLoading(false);
          navigate("user", {
            state: { succ },
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };


  const validate = (values) => {
    const error = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.email) {
      error.email = "email must required";
    } else if (!regex.test(values.email)) {
      error.email = "this is not valid email format!";
    }
    if (!values.password) {
      error.password = "password must required";
    } else if (values.password < 4) {
      error.password = "password must be more then 4 character";
    } else if (values.password > 10) {
      error.password = "password must be less then 10 character";
    }
    return error;
  };

  return (
    <>
      <Grid container>
        <Grid
          item
          md={8}
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
            display: "flex",
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "flex" },
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={StndImg} width="40%" height="30%" />
            </Box>
          </Box>
        </Grid>

        <Grid item md={4} sm={12} xs={12} sx={{ width: "30%" }}>
          <Card sx={{ alignItem: "center" }}>
          {Object.keys(formErrors).length === 0 && isSubmit ? (
              <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  This is a success alert — <strong>check it out!</strong>
                </Alert>
              ) : ""
             
              }
            <Box sx={{ textAlign: "center", marginTop: 10 }}>
           {" "}
              <LoginIcon />{" "}
            </Box>

            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography
                variant="p"
                sx={{
                  fontFamily: "roboto",
                  fontWeight: "bold",
                  fontSize: "1.6rem",
                }}
              >
                {" "}
                LOGIN ACCOUNT{" "}
              </Typography>
            </Box>

            <Box
              sx={{
                marginTop: 20,
                textAlign: "center",
              }}
            >
              <TextField
                onChange={handleChange}
                sx={{ m: 1, width: "90%" }}
                type="email"
                name="email"
                label="Email*"
                variant="standard"
                id="fullWidth"
                value={formValue.email}
              />
              <Typography sx={{ color: "red" }}>
                {formErrors.email}
              </Typography>
            </Box>

            <Box
              sx={{
                marginTop: 1,
                textAlign: "center",
              }}
            >
              <TextField
                onChange={handleChange}
                sx={{ m: 1, width: "90%" }}
                type="password"
                name="password"
                label="Password*"
                variant="standard"
                id="fullWidth"
                value={formValue.password}
              />
              <Typography sx={{ color: "red" }}>
                {" "}
                {formErrors.password}{" "}
              </Typography>
            </Box>

            <Box sx={{ marginTop: 15.5, textAlign: "center" }}>
              <Link>
                {" "}
                <Typography sx={{ m: 1, width: "90%" }}>
                  {" "}
                  Forget Your Password?{" "}
                </Typography>{" "}
              </Link>
            </Box>

            <Box sx={{ marginTop: 5, textAlign: "center" }}>
              <Button
                onClick={loginUser}
                sx={{ m: 1, width: "90%" }}
                disabled={isLoading}
                variant="contained"
                color="success"
              >
                {isLoading ? <CircularProgress /> : "Login"}{" "}
              </Button>
            </Box>

            <Box sx={{ marginTop: 1, textAlign: "center" }}>
              <Link style={{ textDecoration: "none" }} to="/signup">
                <Button
                  sx={{ m: 1, width: "90%", marginBottom: 10 }}
                  variant="contained"
                  color="warning"
                >
                  
                  SignUp                </Button>
              </Link>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
