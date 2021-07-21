import { Typography, Paper } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { useEffect, useState } from 'react'

const convertTime=(unixTimeStamp)=>{
    let dateObj = new Date(unixTimeStamp * 1000)
    let utcString = dateObj.toUTCString()
    //let time = utcString.slice(-11,-4)
    return utcString
}
const NeedsInventory =()=>{

    const [ rows, setRows ] = useState([])
    const [ columns, setColumns ] = useState([])


    useEffect(()=>{

        let arrayToPush = []

        fetch('http://localhost:3001/needsinventory')
        .then( res => res.json())
        .then( data => {
            setColumns([
                { field: 'id', headerName: 'ID', width: 100 },
                { field: 'name', headerName: 'Name', width: 250 },
                { field: 'serial', headerName: 'Serial', width: 200 },
                { field: 'ingest_date', headerName: 'Ingest Date', width: 250},
                { field: 'inv_date', headerName: 'Last Inventory Date', width: 250}
            ]);

            console.log(data)

            data.map( ele => {
                return arrayToPush.push({
                    id: ele.id,
                    name: ele.name,
                    serial: ele.serial,
                    ingest_date:  convertTime(ele.inges_date),
                    inv_date: convertTime(ele.last_inv_date)
                });
            });

            setRows( arrayToPush );
        })

    },[])


    return (
        <>
        <h2>Needs inventory:</h2>
        <Typography variant="subtitle1">*Assuming assets have to be required once a year.</Typography>
        <Paper>
            <div style={{ height: '90vh', width: '100%' }}>
                    <DataGrid rows={rows} columns={columns}/>
            </div>
        </Paper>
        </>
    )
}

export default NeedsInventory