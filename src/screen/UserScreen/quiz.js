import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../../config/firebaseconfig";

function Quiz() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [filterQuestion, setFilterQuestion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  console.log(score, "score");
  // console.log(data, 'dataa');
  // console.log(filterQuestion, 'filterQuestions');
  // console.log(category, 'category');
  // console.log(categories, 'categorieess');

  const valueFilter = () => {
    setFilterQuestion(
      data.filter((e) => {
        // console.log(e, 'eeeeee');
        return e.category == category;
      })
    );
  };

  useEffect(() => {
    valueFilter();
  }, [category]);

  const handleChanger = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    const database = getDatabase(app);
    const reference = ref(database, `Quiz`);
    onValue(reference, (e) => {
      let val = e.val();
      setData(Object.values(val));
      localStorage.setItem("myData", JSON.stringify(Object.values(val)));
      const Data = localStorage.getItem("myData");
      const getData = JSON.parse(Data);
      let array = [];
      getData.map((item) => {
        array.push(item.category);
      });
      setCategories([...new Set(array)]);
    });
  }, []);

  const clickOption = (answer) => {
    if (filterQuestion.length == currentIndex + 1) {
      if (filterQuestion[currentIndex].correctAnswer == answer) {
        setScore(score + 1);
        setShowScore(true);
      } else if (filterQuestion[currentIndex].correctAnswer !== answer) {
        setShowScore(true);
      }
    } else {
      if (answer == filterQuestion[currentIndex].correctAnswer) {
        setScore(score + 1);
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const backToQuiz = () => {
    setShowScore(false);
    setCategory(null);
  };

  return (
    <>
      {!showScore ? (
        <Box sx={{ marginTop: "20vh" }}>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item md="6" sm="8" xs="12">
              <Box>
                <Typography> Quiz </Typography>
              </Box>
              <Box>
                <TextField
                  select
                  label="Select Category"
                  value={category}
                  helperText="Please select your course"
                  variant="standard"
                  onChange={handleChanger}
                  fullWidth
                >
                  {categories.length > 0 ? (
                    categories.map((event, index) => (
                      <MenuItem key={index} value={event}>
                        {event}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem> </MenuItem>
                  )}
                </TextField>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Grid
              container
              sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}
            >
              <Grid item md="6" sm="8" xs="12">
                {filterQuestion.length ? (
                  <Typography>
                    {" "}
                    {filterQuestion[currentIndex].question}{" "}
                  </Typography>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <Grid
              container
              sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}
            >
              <Grid item md="3" sm="4" xs="12">
                {filterQuestion.length ? (
                  <Button
                    onClick={() =>
                      clickOption(filterQuestion[currentIndex].optionOne)
                    }
                  >
                    {" "}
                    {filterQuestion[currentIndex].optionOne}{" "}
                  </Button>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item md="3" sm="4" xs="12">
                {filterQuestion.length ? (
                  <Button
                    onClick={() =>
                      clickOption(filterQuestion[currentIndex].optionTwo)
                    }
                  >
                    {" "}
                    {filterQuestion[currentIndex].optionTwo}{" "}
                  </Button>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>

            <Grid
              container
              sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}
            >
              <Grid item md="3" sm="4" xs="12">
                {filterQuestion.length ? (
                  <Button
                    onClick={() =>
                      clickOption(filterQuestion[currentIndex].optionThree)
                    }
                  >
                    {" "}
                    {filterQuestion[currentIndex].optionThree}{" "}
                  </Button>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item md="3" sm="4" xs="12">
                {filterQuestion.length ? (
                  <Button
                    onClick={() =>
                      clickOption(filterQuestion[currentIndex].optionFour)
                    }
                  >
                    {" "}
                    {filterQuestion[currentIndex].optionFour}{" "}
                  </Button>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: "100vh",
            widows: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "block" }}>
            <Box>
              <Typography variant="h4"> Score : {score} </Typography>
            </Box>
            <Box>
              <Button onClick={backToQuiz}> Bact to Quiz </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Quiz;
