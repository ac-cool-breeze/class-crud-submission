import 'date-fns';
import {
    DialogTitle,
    DialogContent,
    Button,
    TextField,
    Switch,
    InputLabel
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const useStyles = makeStyles((theme) => ({
    center:{
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    margin:{
        margin: '15px'
    },
    center:{
        alignSelf: 'center',
        margin: 'auto'
    }
}))

const UpdateRecord =({ props, setOpen })=>{
    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const clickHandler=(e)=>{
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: props.id,
                name: newName,
                serial: newSerial,
                last_inges_date: newLastInvDate,
                inges_date: newIngesDate,
                active: newActive
            })
        }
        fetch('http://localhost:3001/updaterecord', requestOptions)
        setOpen(false)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    const handleNameChange=(e)=>{
        setNewName(e.currentTarget.value)
        if( e.charCode === 13){
            console.log('char code pressed')
            clickHandler()
        }
    }

    const handleSerialChange=(e)=>{
        e.preventDefault()
        setNewSerial(e.currentTarget.value)
    }

    const handleActiveChange=(e)=>{
        setActiveValue(!activeValue)
        setNewActive(e.currentTarget.checked)
    }
    const [ newName, setNewName ] = useState('')
    const [ newSerial, setNewSerial ] = useState('')
    const [ newLastInvDate, setNewLastInvDate ] = useState('')
    const [ newIngesDate, setNewIngesDate ] = useState('')
    const [ newActive, setNewActive ] = useState('')
    const [ activeValue, setActiveValue ] = useState( props.value === 'false' ? false: true)
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const classes = useStyles();

    let isChecked = activeValue
    console.log('props.value', isChecked)
    let field = props.field


    return (
        <>
        <DialogTitle id="customized-dialog-title">
        Current Value: {props.value}
        </DialogTitle>
        <DialogContent dividers className={classes.center} align="center">
            <form onSubmit={handleSubmit}>
                { field === 'name' ? <><InputLabel>Name:</InputLabel><TextField label="New Name" onChange={handleNameChange} onKeyPress={handleNameChange} /></> : <></> }
                { field === 'serial' ? <><InputLabel>Serial:</InputLabel><TextField label="New Serial" onChange={handleSerialChange} /></> : <></> }
                { field === 'last_inv_date' ? <><InputLabel>Inventory Date:</InputLabel><TextField label="New Inventory Date"/></> : <></> }
                { field === 'inges_date' ? <><InputLabel>Ingest Date:</InputLabel><MuiPickersUtilsProvider utils={DateFnsUtils}><KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
                
                </MuiPickersUtilsProvider></> : <></> }
                { field === 'active' ? <><InputLabel className={classes.center}>Active:</InputLabel><Switch checked={activeValue} onChange={handleActiveChange} label="Active"/></> : <></> }
            <br/>
            <Button type="submit" onClick={clickHandler} color="secondary" variant="contained" className={classes.margin}>Update Record</Button>
            </form>
        </DialogContent>
        </>
    )
}

export default UpdateRecord