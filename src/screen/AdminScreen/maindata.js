import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";



function MainData () {
    
    const Data = localStorage.getItem('myData')
    const getData = JSON.parse(Data)
    // console.log(Data, 'myData');

   

    return (
        <>
        <Box>
                <TableContainer> 
                    <Table>
                         <TableHead>
                             <TableRow> 
                                <TableCell> Name </TableCell> 
                                <TableCell> Email </TableCell>
                                <TableCell> Status </TableCell>
                                <TableCell> Unique ID </TableCell>
                             </TableRow>
            
                         </TableHead>
                         <TableBody>
                         <TableCell> {getData?.name} </TableCell>
                         <TableCell> {getData?.email} </TableCell>
                         <TableCell> {getData.cAdmin = true ? "Admin" : "User"} </TableCell>
                         <TableCell> {getData?.uid} </TableCell>
                         </TableBody>
                    </Table>
                 </TableContainer>
        
        </Box>
        </>
    )
}

export default MainData;