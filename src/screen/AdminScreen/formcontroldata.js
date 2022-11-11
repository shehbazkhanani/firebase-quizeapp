import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DataGrid } from "@mui/x-data-grid";
import app from "../../config/firebaseconfig";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";


function FormControlData () {
   
    const [data, setData] = useState([]);
    const [row, setRow] = useState([])
    console.log(row);
   
    useEffect(() => {
    const database = getDatabase(app)
    const reference = ref(database, `formControl`)
    onValue(reference, e => {
        const val = e.val();
        let value = Object.values(val)
        setData(value.map((e, i) => {
        return {
            ...e, 
            id : i + 1
        }
        } ))
        
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
          field: 'course',
          headerName: 'Course Name',
          width: 200,
          editable: true,
        }, {
            field: 'isFormOpen',
            headerName: 'Form Status',
            width: 100,
            editable: true,
          }, {
            field: 'countryName',
            headerName: 'Country Name',
            width: 200,
            editable: true,
          }, {
            field: 'ciyName',
            headerName: 'City Name',
            width: 100,
            editable: true,
          }, {
            field: 'admissionStart',
            headerName: 'Admission Start',
            width: 120,
            editable: true,
          }, {
            field: 'admissionEnd',
            headerName: 'admission End',
            width: 200,
            editable: true,
          }
      ];    


    return (
        <>
        <Box> <Link to='/dashboard'> <ArrowBackIcon/> </Link>
        
        <Box height={600}>
                <DataGrid columns={columns} rows={data}/>
            </Box>

         </Box>
        </>
    )
}

export default FormControlData;