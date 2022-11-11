import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref } from "firebase/database";
import app from "../../config/firebaseconfig";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Image from "../../images/quiz.avif";

function AddQuiz() {
  const initialValue = {
    category: "",
    question: "",
    option: [],
    quizName: "",
    timeDuration: "",
  };
  const [categories, setCategories] = useState("");
  const [data, setData] = useState(initialValue);
  const [allData, setAllData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isQuestion, setIsQuestion] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isMoreDisabled, setMoreIsDisabled] = useState(false);
  const [isQuestionDisabled, isSetQuestionDisabled] = useState(false);
  const [isButton, isSetButton] = useState(true);
  const [isOption, setIsOption] = useState([]);
  const [isButtonOn, isSetButtonOn] = useState(true);
  const [isErrors, setIsErrors] = useState(initialValue);
  const [category, setCategory] = useState("");


  const database = getDatabase(app);

  const categoryChange = (event) => {
    setCategories(event.target.value);
    setData((parm) => ({ ...parm, category: event.target.value }));
  };

  const handleChange = () => {
    if (
      data.quizName.length > 0 &&
      data.timeDuration.length > 0 &&
      data.category.length > 0
    ) {
      setIsDisabled(true);
      setMoreIsDisabled(true);
    }
    setIsErrors(validate(data));
  };

  const validate = (value) => {
    const error = {};
    if (!value.quizName) {
      error.quizName = "quiz name must required";
    }
    if (!value.category) {
      error.category = "category must required";
    }
    if (!value.timeDuration) {
      error.timeDuration = "time must required";
    }
    if (!value.quistion) {
      error.question = "question must required";
    }
    if (!value.option) {
      error.option = "option must required";
    }
    return error;
  };

  const submitQuestion = () => {
    if (isQuestion) {
      isSetQuestionDisabled(true);
    }
    setIsErrors(validate(data));
  };

  const submitOpton = () => {
    if (inputValue) {
      setIsOption([...isOption, { text: inputValue, isCorrect: false }]);
      setInputValue("");
    }
    isSetButton(false);
    setIsErrors(validate(data));
  };

  const checkCorrectAns = (i) => {
    setIsOption(
      isOption.map((val, ind) => {
        if (ind == i) {
          return {
            ...val,
            isCorrect: !val.isCorrect,
          };
        } else return val;
      })
    );
  };
  useEffect(() => {
    data.question && setAllData([...allData, { ...data }]);
  }, [data.question]);

  const addQuestionSubmit = () => {
    isSetButton(true);
    setData({ ...data, question: isQuestion, option: isOption });
    isSetQuestionDisabled(false);
    setMoreIsDisabled(true);
    setIsDisabled(false);
    isSetButtonOn(false);
    setIsOption([]);
    setIsQuestion("");
  };

  const allSubmit = () => {
    isSetButtonOn(true);
    const reference = ref(database, `Quiz`);
    push(reference, allData);
    isSetButtonOn(true);
    setAllData([]);
    initialValue = ""
  };

  const addMore = () => {
    isSetQuestionDisabled(false);
    setIsDisabled(true);
    setMoreIsDisabled(true);
    isSetButton(false);
    isSetButtonOn(true);
  };

  const deletOption = (event) => {
    setIsOption(
      isOption.filter((e, i) => {
        return i !== event;
      })
    );
  }

  const deletQuestion = (event) => {
    setIsQuestion(
      isQuestion.filter((e, i) => {
        return i !== event.button;
      })
    );
  }

  const getData = () => {
   const reference = ref(database, `course`)
   onValue(reference, (e)=> {
    let val = e.val()
    let status = e.exists()
    if(status) {
      let value = Object.values(val)
      let coursevalue = value.map((e) => {
        return e.courseName
      })
      let courseVal = new Set(coursevalue)
      setCategory([...courseVal])
    }
   })
 }

 useEffect(() => {
  getData()
 }, [])
  return (
    <Box sx={{backgroundColor : "#ff9671", minHeight : '90vh', height:"fit-Content", padding : 'none', margin : 'none',  alignItems : 'center'}}>
    
      <Box>
        <Box>
          <Link to="/dashboard">
            <ArrowBackIcon />
          </Link>
        </Box>
        <Grid container sx={{ display: "flex", justifyContent: "center",}}>
          <Grid item md="6" sm="12" xs="12">
            <Card sx={{ width: { md: "50vw" }, marginBottom : 3  }}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", marginTop: 2 }}
                >
                  Add Quiz Data
                </Typography>
                <Box>
                  <Box sx={{ textAlign: "center" }}>
                    <TextField
                      value={data.quizName}
                      disabled={isMoreDisabled}
                      onChange={(e) =>
                        setData((parm) => ({
                          ...parm,
                          quizName: e.target.value,
                        }))
                      }
                      variant="standard"
                      label="Quiz Name"
                      sx={{ width: "90%" }}
                    />
                    <Typography sx={{ color: "red" }}>
                      {isErrors.quizName}
                    </Typography>
                    <TextField
                      value={data.timeDuration}
                      disabled={isMoreDisabled}
                      onChange={(e) =>
                        setData((parm) => ({
                          ...parm,
                          timeDuration: e.target.value,
                        }))
                      }
                      variant="standard"
                      label="Time Duration"
                      type="number"
                      sx={{ width: "90%" }}
                    />
                    <Typography sx={{ color: "red" }}>
                      {isErrors.timeDuration}
                    </Typography>
                    <TextField
                      disabled={isMoreDisabled}
                      select
                      label="Select your Course"
                      value={categories}
                      onChange={categoryChange}
                      helperText="Please select your course"
                      variant="standard"
                      sx={{ width: "90%" }}
                    >
                      {category && category.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Typography sx={{ color: "red" }}>
                      {isErrors.category}
                    </Typography>
                    <Button
                     disabled={isMoreDisabled} 
                      onClick={handleChange}
                      color="warning"
                      variant="contained"
                      sx={{ m: 1, width: "90%", height : '4vh' }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
                {isDisabled ? (
                  <Box sx={{textAlign : 'center'}}>
                    <Box>
                      <TextField
                        disabled={isQuestionDisabled}
                        onChange={(e) => setIsQuestion(e.target.value)}
                        variant="standard"
                        label="Add Questions"
                        sx={{ width: "90%" }}
                      />
                      {/* <Typography sx={{color : 'red'}}> {isErrors.question} </Typography> */}
                    </Box>
                    <Box sx={{ marginTop: 1 }}>
                      <Button
                      disabled={isQuestionDisabled}
                        color="warning"
                        variant="contained"
                        sx={{ m: 1, width: "90%", height : '4vh' }}
                        onClick={submitQuestion}
                      >
                        Submite
                      </Button>
                    </Box>
                    <Box>
                      <TextField
                        onChange={(e) => setInputValue(e.target.value)}
                        variant="standard"
                        label="Options"
                        sx={{ width: "90%" }}
                      />
                    </Box>
                    <Box sx={{ marginTop: 1 }}>
                      <Button
                        onClick={submitOpton}
                        color="warning"
                        variant="contained"
                        sx={{ m: 1, width: "90%", height : '4vh' }}
                      >
                        Submite
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
                {isQuestionDisabled ? (
                  <Box sx={{textAlign : 'center'}}>
                    <Box sx={{display : 'flex', justifyContent : 'center'}}>
                    <Box sx={{marginTop: 1, padding : 1,  backgroundColor : '#ff9671', width : "45vw", display : 'flex', justifyContent : 'space-between'}}>
                    <Box sx={{ marginTop: 1,  }}>
                      <Typography sx={{ fontSize: "1.2rem", fontWeight : 'bold' }}>
                        Q# : {isQuestion}
                      </Typography>
                    </Box>
                    <HighlightOffIcon sx={{marginTop : 1}}  onClick={(i) => deletQuestion(i)} />
                    </Box>
                    </Box>
                    <Box sx={{display : 'flex', justifyContent : 'center'}}>
                      <Box>
                    {isOption.map((e, i) => {
                      return (
                        <Box sx={{marginTop: 1, padding : 1,  backgroundColor : '#ff9671', width : "45vw", display : 'flex', justifyContent : 'space-between'}}>
                          <FormControlLabel
                         
                            control={
                              <Checkbox
                                checked={e.isCorrect}
                                onChange={() => checkCorrectAns(i)}
                                name={e}
                              />
                            }
                            label={e.text}
                          />
                          <HighlightOffIcon sx={{marginTop : 1}} onClick={() => deletOption(i)} />
                         
                        </Box>
                      );
                    })}
                    </Box>
                    </Box>
                    <Button
                      onClick={addQuestionSubmit}
                      disabled={isButton}
                      color="warning"
                      variant="contained"
                      sx={{ m: 1, width: "90%", height : '4vh' }}
                    >
                      Submite Question
                    </Button>
                  </Box>
                ) : (
                  ""
                )}
                <Box sx={{textAlign : 'center'}}>
                <Button onClick={addMore} disabled={isButtonOn}
                 color="warning"
                 variant="contained"
                 sx={{ m: 1, width: "90%", height : '4vh' }}>
                  Add More
                </Button>
                <Button
                  onClick={allSubmit}
                  disabled={isButtonOn}
                  color="warning"
                  variant="contained"
                  sx={{ m: 1, width: "90%", height : '4vh', marginBottom : 3}}
                >
                  Submit
                </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AddQuiz;
