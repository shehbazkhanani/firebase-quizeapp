import { Box, Button, Card, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref } from "firebase/database";
import app from "../../config/firebaseconfig";
import { DataGrid } from "@mui/x-data-grid";


function QuizData () {
     
  const [data, setData] = useState([]);
  const [row,setRow] = useState([])
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
    },{
      field: 'quizName',
      headerName: 'Quiz Name',
      width: 150,
      editable: true,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: true,
    },
  {
    field: 'question',
    headerName: 'Question',
    width: 400,
    editable: true,
  }, {
      field: 'option',
      headerName: 'Option',
      width: 200,
      editable: true,
    }, {
      field: 'correctOption',
      headerName: 'Correct Option',
      width: 200,
      editable: true,
    },{
      field: 'timeDuration',
      headerName: 'Time Duration',
      width: 200,
      editable: true,
    }, 
    
];    

useEffect(()=>{
getQuizData()
},[data])

const getQuizData = () => {
  let getData = []
    data.map((events)=>{
      events.map((e)=>{
        getData.push({...e,id:getData.length+1
          ,option:e.option.map((opt)=>{
            return (
              opt.text
            )
          }),
          correctOption : e.option.filter((item) => {
            return (item.isCorrect == true)
          }).map((event) => {
            return (event.text)
          })
        }
          
          )
    })
    })
    setRow(getData)
}


    return (
        <>
        <Box> <Link to='/dashboard'> <ArrowBackIcon/> </Link>
        
        <Box height={600}>
                <DataGrid columns={columns} rows={row}/>
            </Box>

         </Box>
        </>
    )
}

export default QuizData;