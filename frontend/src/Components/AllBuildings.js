import { MenuItem, Select, InputLabel } from "@material-ui/core"
import { useEffect, useState } from "react"

const AllBuildings=({ SetBuildingLocation, buildingLocation  })=>{

    const [ buildings, setBuildings] = useState([])

    const getBuildings=async (e)=>{
        let response = await fetch('https://class-wind-backend.herokuapp.com/allbuildinglocations')
        let data = await response.json()
        setBuildings(data)
    }

    useEffect(()=>{
        getBuildings()
    },[])

    const handleChange = (event) => {
        SetBuildingLocation(event.target.value);
    };

    return (
            <>
            <InputLabel id="buildingLocationSelectionLabel">Building Location</InputLabel>
            <Select
            labelId="buildingLocationSelection"
            id="buildingLocationSelection"
            //value={buildingLocation}
            onChange={handleChange}
            >
            {buildings.map(ele=>{
                return <MenuItem value={ele.name}>{ele.name}</MenuItem>
            })}
            </Select>
            </>
    )
}

export default AllBuildings