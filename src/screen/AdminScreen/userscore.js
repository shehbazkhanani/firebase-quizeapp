import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function UserScore () {
    return (
        <>
        <Box> <Link to='/dashboard'> <ArrowBackIcon/> </Link>
        
        <h1> User Score </h1>
         </Box>
        </>
    )
}

export default UserScore;