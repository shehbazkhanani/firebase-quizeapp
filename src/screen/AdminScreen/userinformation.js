import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DataGrid } from "@mui/x-data-grid";
import app from "../../config/firebaseconfig";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";


function UserInformation () {
   
    const [data, setData] = useState([]);
    console.log(data);
   
    useEffect(() => {
    const database = getDatabase(app)
    const reference = ref(database, `information`)
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
            field: 'full Name',
            headerName: 'Full Name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 250,
            valueGetter: (params) =>
              `${params.row.name || ''}`,
          },
        {
          field: 'Course',
          headerName: 'Course',
          width: 200,
          editable: true,
        }, {
            field: 'Section',
            headerName: 'Section',
            width: 100,
            editable: true,
          }, {
            field: 'Contact',
            headerName: 'Contact',
            width: 200,
            editable: true,
          }, {
            field: 'Age',
            headerName: 'Age',
            width: 100,
            editable: true,
          }, {
            field: 'DateOfBirth',
            headerName: 'Date Of Birth',
            width: 120,
            editable: true,
          }, {
            field: 'FatherName',
            headerName: 'Father Name',
            width: 200,
            editable: true,
          }, {
            field: 'FatherCnic',
            headerName: 'Father Cnic',
            width: 200,
            editable: true,
          }, {
            field: 'FatherContact',
            headerName: 'Father Contact',
            width: 200,
            editable: true,
          }, {
            field: 'EmergencyContact',
            headerName: 'Emergency Contact',
            width: 200,
            editable: true,
          }
      ];    

const rows = data.map((event, index) => ({
    id : index + 1, name: `${event.firstName}    ${event.lastName}`, Course : event.cours,
    Section : event.section, Contact : event.contact, Age : event.age, DateOfBirth : event.dateOfBirth,
    FatherName : event.fatherName, FatherCnic : event.fatherCnic, FatherContact : event.fatherContact,
    EmergencyContact : event.emergencyContact,
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

export default UserInformation;