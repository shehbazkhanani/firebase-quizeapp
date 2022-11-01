import { Link} from "react-router-dom"
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../../config/firebaseconfig";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';



function Userdata() {
    const [data, setData] = useState([])
    const [isLoading, setisLoading] = useState(false)
    

    console.log(data, 'Dataaaaa');
    const GetData = () => {
        setisLoading(true)
        
        const database = getDatabase(app)
        const reference = ref(database, `users`);
        onValue(reference, (e) => {
            let getData = e.val();
            let value = Object.values(getData)
            setData(value)
            setisLoading(false)
            let key = Object.keys(getData)
        })
    }

   let id = 0 + 1;

    useEffect(() => {
        GetData()
    }, [])

    const columns = [
        {
            field: 'id',
            headerName: 'id',
            width: 50,
            editable: true,
          },
        {
            field: 'name',
            headerName: 'name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 250,
            valueGetter: (params) =>
              `${params.row.name || ''}`,
          },
        {
          field: 'Email',
          headerName: 'Email',
          width: 350,
          editable: true,
        },
        {
          field: 'Status',
          headerName: 'Status',
          width: 200,
          editable: true,
        }, {
            field: 'Action',
            headerName: 'Action',
            width: 200,
            editable: true,
            renderCell: (cellValues) => {
                return (
                    <Button 
                    variant="contained"
                    color="success"
                    > Promote </Button>
                )
            }
          }, {
            field: 'More',
            headerName: 'More',
            width: 200,
            editable: true,
            renderCell: (cellValues) => {
                return (
                    <Button 
                    variant="contained"
                    color="success"
                    > More </Button>
                )
            }
          }
      ];    

const rows = data.map((event, index) => ({
    id : index + 1, name: event.name, Email : event.email, Status: 'User',
   })) 

    return (
        <>
            <Box>
                <Link to="/dashboard" > <ArrowBackIcon /> </Link>
            </Box>
            {isLoading ? <Box style={{width : "100%", height: "100vh", display : "flex", justifyContent : "center"}}> <CircularProgress /> </Box> :
            <Box key={data} height={600}>
                <DataGrid columns={columns} rows={rows} />
            </Box>
                    }
        </>
    )
}

export default Userdata