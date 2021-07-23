import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { 
    TextField,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    Button,
    makeStyles,
    Container,
    Typography
 } from "@material-ui/core"

import ManageBuildings from "./ManageBuildings"


const useStyles = makeStyles((theme)=>({
    root: {
        border: 0,
        borderRadius: 3,
        color: '#202020',
        padding: '0 30px',
        display: 'flex-wrap',
        justifyContent: 'space-around'
      },
    child: {
        padding: '10px'
    },
    form: {
        margin : '10px'
    }
}))


const AddRecord=()=>{
    const classes = useStyles();
    const [buildingLocation, SetBuildingLocation] = useState([])
    const [buildings, setBuildings] = useState([])
    const [serial, setSerial] = useState('')
    const [name, setName] = useState('')

    const handleChange = (event) => {
        SetBuildingLocation(event.target.value);
      };

    const clickHandlerSetName = (event) =>{
        setName(event.target.value)
    }


    const clickHandlerSetSerial = (event) =>{
        setSerial(event.target.value)
    }

    const serialEnterHandler = (e) =>{
        if(e.charCode === 13){
            clickHandlerAddRecord()
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    const clickHandlerAddRecord = (event) => {
        //event.preventDefault()
        let requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: name,
                serial: serial,
                building_location: buildingLocation
            })
        }
        setSerial('')
        fetch('https://class-wind-backend.herokuapp.com/addrecord', requestOptions)

    }

    useEffect(()=>{
        async function fetchBuildings(){
            await fetch('https://class-wind-backend.herokuapp.com/allbuildinglocations')
            .then( res => res.json())
            .then( json=> setBuildings(json))
        }

        fetchBuildings()
    }, [])

    return (
        <>
            <Container className={classes.root}>
                <Typography variant="h2">Add an asset.</Typography>
                <Paper elevation={2} className={classes.child} align="center">
                <form id="addRecordForm" className={classes.form} onSubmit={handleSubmit}>
                    <InputLabel id="assetNameLabel" className={classes.form}>Asset Name</InputLabel >
                    <TextField value={name} onChange={clickHandlerSetName} labelId="assetNameLabel" id="standard-required" variant="outlined"/>
                    <InputLabel id="serialLabel" className={classes.form}>Serial</InputLabel>
                    <TextField value={serial} onChange={clickHandlerSetSerial} onKeyPress={serialEnterHandler}labelId="serialLabel" required id="standard-required" variant="outlined"/>
                    <InputLabel id="buildingLocationSelectionLabel" className={classes.form}>Building Location</InputLabel>
                    <Select
                    labelId="buildingLocationSelection"
                    id="buildingLocationSelection"
                    onChange={handleChange}
                    >
                    {buildings.map(ele=>{
                        return <MenuItem value={ele.name}>{ele.name}</MenuItem>
                    })}
                    </Select>

                    <br/>
                    <Button size="small" variant="contained" color="primary" onClick={clickHandlerAddRecord} className={classes.form}>Add record</Button>
                </form>
                </Paper>
                <Router>
                    <Button size="small" variant="contained" color="secondary" href="/ManageBuildings" className={classes.form} > Modify locations</Button>
                    <Route path="/ManageBuildings" component={ ManageBuildings }/>
                </Router>
            </Container>
        </>
    )
}

export default AddRecord