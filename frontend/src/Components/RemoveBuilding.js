import { useState, useEffect } from "react"
import { Paper, List, ListItem, makeStyles, Button} from "@material-ui/core"


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

const handleClick=(e,id)=>{
    //e.preventDefault()
    console.log('remove building clicked',id)
    let requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            building_id: id,
        })
    }
    fetch('https://class-wind-backend.herokuapp.com/removebuilding', requestOptions)
}


const RemoveBuildings=()=>{
    const classes = useStyles();
    const [buildings, setBuildings] = useState([])

    useEffect(()=>{
        fetch('https://class-wind-backend.herokuapp.com/allbuildinglocations')
            .then( res => res.json())
            .then( json => {
                setBuildings(json.map( ele=>{
                    return <ListItem key={ele.name+'_'+ele.id} id={ele.id}>{ele.name} <Button variant="contained" color="secondary" className={classes.form} onClick={e=>handleClick(e.target.value, ele.id)}>❌</Button></ListItem>
                }))
            })
    })


    return (
        <>
        <h4>Remove Buildings</h4>
        <Paper className={classes.root}>
            <List>
            { buildings }
            </List>
        </Paper>
        </>
    )
}

export default RemoveBuildings