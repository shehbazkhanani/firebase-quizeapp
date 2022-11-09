import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import app from "../../config/firebaseconfig";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CourseData () {

    const [data, setData] = useState([])

    useEffect(() => {
        const database = getDatabase(app)
        const reference = ref(database, `course`)
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
            field: 'CourseName',
            headerName: 'Course Name',
            width: 250,
            editable: true,
          },
        {
          field: 'CourseDuration',
          headerName: 'Course',
          width: 150,
          editable: true,
        }, {
            field: 'CourseStatus',
            headerName: 'Course Status',
            width: 200,
            editable: true,
          }, {
            field: 'NoofQuiz',
            headerName: 'No of Quiz',
            width: 200,
            editable: true,
          }, {
            field: 'QuizFees',
            headerName: 'Quiz Fees',
            width: 200,
            editable: true,
          }, {
            field: 'LeadTrainer',
            headerName: 'Lead Trainer',
            width: 120,
            editable: true,
          }, {
            field: 'AssistantTrainer',
            headerName: 'Assistant Trainer',
            width: 200,
            editable: true,
          }, 
      ];    
      
      const rows = data.map((event, index) => ({
        id : index + 1, CourseName: event.courseName, CourseDuration : event.courseDuration,
        CourseStatus : event.courseStatus, NoofQuiz : event.noOfQuiz, QuizFees : event.fees, LeadTrainer : event.leadTrainer,
        AssistantTrainer : event.AsistantTrainer
       })) 

    return (
    <>
    <Link to='/dashboard'> <ArrowBackIcon/> </Link>
        
        <Box height={600}>
                <DataGrid columns={columns} rows={rows}/>
            </Box>
    </>
    )
}

export default CourseData;