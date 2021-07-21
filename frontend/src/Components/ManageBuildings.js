import { useState} from "react"
import { Paper, InputLabel, TextField, makeStyles, Button } from "@material-ui/core"
import RemoveBuildings from "./RemoveBuilding";


const useStyles = makeStyles((theme)=>({
    root: {
        border: 0,
        borderRadius: 3,
        color: '#0F0C24',
        padding: '0 30px',
        display: 'flex'
      },
    form: {
        margin : '5px'
    }
}))


const ManageBuildings=()=>{
    const classes = useStyles();
    const [buildingName, setBuildingName] = useState('')

    const handleClick=(e)=>{
        e.preventDefault()
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: buildingName })
        }
        fetch('http://localhost:3001/addbuilding', requestOptions)
    }

    const handleChange=(e)=>{
        setBuildingName(e.target.value)
    }

    const handleEnterPress=(e)=>{
        if(e.charCode === 13){
            handleClick()
        }
    }

    return (
        <>
        <h2>Manage Building Locations</h2>
        
        <RemoveBuildings/>

        <h4>Add building location</h4>
        <Paper className={classes.root}>
        <form>
            <InputLabel className={classes.form}>Building Name</InputLabel >
            <TextField id="addBuilding" variant="outlined" onChange={handleChange} onKeyPress={handleEnterPress}/>
            <br/>
            <Button variant="contained" color="primary" onClick={handleClick} className={classes.form}>Add building</Button>
        </form>
        </Paper>
        </>
    )
}

export default ManageBuildings