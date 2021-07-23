import { 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    TableBody, 
    makeStyles,
    Container,
    Dialog,
    Typography,
} from '@material-ui/core';

import { useState, useEffect } from 'react';
import UpdateRecord from './UpdateRecord';

const useStyles = makeStyles((theme) => ({
    tableRow:{
        border: "1px solid #efefef",
        borderRadius: "5px",
        margin: "1px",
        '&:hover': {
            background: "#EEEEEE",
            border: "1px solid #BBBBBB",
         },
    },
    table:{
        alignItems: 'center',
        margin: 'auto',
    }
}))

const NeedsInventory=()=>{
    

    const classes = useStyles()
    const msToLocale=(msTimestamp)=>{
        let parsed = new Date(parseInt(msTimestamp))
        let formmatedTime = parsed.toLocaleString()
        return formmatedTime
    }

    const [ records, setRecords ] = useState([])
    const [ open, setOpen ] = useState(false);
    const [ selectedValue, setSelectedValue ] = useState('')
    const [ props, setProps ] = useState({})

    const handleClickOpen=(e)=>{
        let recordId = e.target.id
        let recordField = e.currentTarget.dataset.value
        let recordValue = e.target.innerHTML
        setProps({ id: recordId, field: recordField, value: recordValue })
        setOpen(true);
        getAllRecords()
    }

    const handleClose=(value)=>{
        getAllRecords()
        setOpen(false);
        setSelectedValue(value)
    }
    
    const getAllRecords = async ()=>{
        let response = await fetch( 'https://class-wind-backend.herokuapp.com/needsinventory')
        let data = await response.json()
        setRecords([...data])
    }

    useEffect(()=>{
        getAllRecords()
    },[records])

    return(
        <>
        <Container className={classes.root}>

        <Typography variant="h2">Needs to be inventoried</Typography>
        <Typography variant="subtitle">*Assuming items have to be inventoried once a year.</Typography>
        <Paper align="center">
        <TableContainer  className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Asset Name</TableCell>
                    <TableCell>Serial</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Added to inventory</TableCell>
                    <TableCell>Last Inventory Date</TableCell>
                    <TableCell>Active</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                records.map(ele => {
                    return(
                        <TableRow key={'tablerow'+ele.id+'head'} id={ele.id}>
                            <TableCell className={classes.tableRow} key={'tablerow'+ele.id+'name'} onClick={handleClickOpen} id={ele.id} data-value="name">{ele.asset_name}</TableCell>
                            <TableCell className={classes.tableRow} key={'tablerow'+ele.id+'serial'} onClick={handleClickOpen} id={ele.id} data-value="serial">{ele.serial}</TableCell>
                            <TableCell className={classes.tableRow} key={'tablerow'+ele.id+'location_name'} onClick={handleClickOpen} id={ele.id} data-value="location_name">{ele.location_name}</TableCell>
                            <TableCell className={classes.tableRow} key={'tablerow'+ele.id+'inges_date'} onClick={handleClickOpen} id={ele.id} data-value="inges_date">{ msToLocale(ele.inges_date) }</TableCell>
                            <TableCell className={classes.tableRow} key={'tablerow'+ele.id+'last_inv_date'} onClick={handleClickOpen} id={ele.id} data-value="last_inv_date">{ msToLocale(ele.last_inv_date) }</TableCell>
                            <TableCell className={classes.tableRow} key={'tablerow'+ele.id+'active'} onClick={handleClickOpen} id={ele.id} data-value="active">{ele.active.toString()}</TableCell>
                        </TableRow>
                    )
                })
            }
            </TableBody>
        </TableContainer>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <UpdateRecord props={props} setOpen={setOpen} getAllRecords={getAllRecords}/>
        </Dialog>
        </Paper>

        </Container>
        </>
    )
}

export default NeedsInventory