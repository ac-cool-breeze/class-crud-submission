import { MenuItem, Select, InputLabel } from "@material-ui/core"
import { useEffect, useState } from "react"

const AllBuildings=({ SetBuildingLocation, buildingLocation  })=>{

    const [ buildings, setBuildings] = useState([])

    useEffect(()=>{
        fetch('https://class-wind-backend.herokuapp.com/allbuildinglocations')
        .then( res => console.log(res))
        .then( res => res.json())
        .then( json=> setBuildings(json))
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
            value={buildingLocation}
            onChange={handleChange}
            >
            {buildings.map(ele=>{
                return <MenuItem>{ele.name}</MenuItem>
            })}
            </Select>
            </>
    )
}

export default AllBuildings