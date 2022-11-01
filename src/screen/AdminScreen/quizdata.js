import { Box, Button, Card, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref } from "firebase/database";
import app from "../../config/firebaseconfig";
import { DataGrid } from "@mui/x-data-grid";


function QuizData () {
     
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    const database = getDatabase(app)
    const reference = ref(database, `Quiz`)
    onValue(reference, e => {
        const val = e.val();
        setData(Object.values(val))
    })
}, [])
const columns = [
  {
      field: 'id',
      headerName: 'id',
      width: 50,
      editable: true,
    },
    {
      field: 'Category',
      headerName: 'Category',
      width: 150,
      editable: true,
    },
  {
    field: 'Question',
    headerName: 'Question',
    width: 400,
    editable: true,
  }, {
      field: 'OptionA',
      headerName: 'Option A',
      width: 200,
      editable: true,
    }, {
      field: 'OptionB',
      headerName: 'Option B',
      width: 200,
      editable: true,
    }, {
      field: 'OptionC',
      headerName: 'Option C',
      width: 200,
      editable: true,
    }, {
      field: 'OptionD',
      headerName: 'Option Dth',
      width: 120,
      editable: true,
    }, {
      field: 'CorrectOption',
      headerName: 'Correct Option',
      width: 200,
      editable: true,
    }, 
];    

const rows = data.map((event, index) => ({
  id : index + 1, Category: event.category, Question : event.question,
  OptionA : event.optionOne, OptionB : event.optionTwo, OptionC : event.optionThree, OptionD : event.optionFour,
  CorrectOption : event.correctAnswer
 })) 
    return (
        <>
        <Box> <Link to='/dashboard'> <ArrowBackIcon/> </Link>
        
        <Box height={600}>
                <DataGrid columns={columns} rows={rows}/>
            </Box>

         </Box>
        </>
    )
}

export default QuizData;