var express = require('express');
var router = express.Router();
const db = require('../db')

const minusYear=(time)=>{
  //1595534634000
  //1879531434000
  //1 year = 31556926
  db('assets')
  .select('id')
  .where('last_inv_date')

  return (time - 31556926)
}


router.get('/', function(req, res, next) {
  console.log('/ hit')
  res.send('reached endpoint')
  res.end()
});


router.get('/allrecords', (req,res)=>{
  db.select(
    'assets.id',
    'assets.name as asset_name',
    'assets.serial',
    'assets.last_inv_date',
    'assets.inges_date',
    'assets.active',
    'b_locations.name as location_name'
    )
    .from('assets_b_locations')
    .leftJoin('assets','assets_b_locations.assets_id','assets.id')
    .leftJoin('b_locations','assets_b_locations.locations_id','b_locations.id')
    .orderBy('assets.id')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(500).json({
        message: err
      })
    );

})


router.get('/allbuildinglocations', (req,res)=>{
  db.select('*')
  .from('b_locations')
  .then( data => res.json(data).status(200))
  .catch(err =>
    res.status(500).json({
      message: err
    })
  );
})


router.get('/needsinventory', (req,res)=>{

  let now = new Date().getTime()

  db.select(
    'assets.id',
    'assets.name as asset_name',
    'assets.serial',
    'assets.last_inv_date',
    'assets.inges_date',
    'assets.active',
    'b_locations.name as location_name'
    )
    .where('assets.last_inv_date','<', now - 31556926 ) //1627060675350
    .from('assets_b_locations')
    .leftJoin('assets','assets_b_locations.assets_id','assets.id')
    .leftJoin('b_locations','assets_b_locations.locations_id','b_locations.id')
    .orderBy('assets.id')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(500).json({
        message: err
      })
    );
})


router.post('/addbuilding', (req,res)=>{
  console.log('add building hit', req.body)

  db('b_locations')
  .insert({name: `${req.body.name}`})
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(500).json({
      message: err
    })
  )
})

router.get('/join', (req,res)=>{
  db('assets_b_locations')
  .select('*')
  .then( data => res.json(data).status(200))
})


router.delete('/removebuilding', (req,res)=>{
  if( req.body.building_id === 1){
    res.status(500).send('unable to delete "no location"')
  }
  db('b_locations')
    .where('id',`${req.body.building_id}`)
    .del()
    .then( data => res.json(data.rows).status(200))
    .catch(err =>
      res.status(500).json({
        message: err
      })
    )
})


router.post('/addrecord', (req,res)=>{
  console.log(req.body)

  let now = new Date().getTime()

  db('assets')
    .insert({ 
      name : `${req.body.name}`,
      inges_date  : `${now}`,
      serial  : `${req.body.serial}`,
      last_inv_date : `${now}`,
      active  : 'true'
    })
    .returning('id')
    .then( returnedId => {
      let asset_id = returnedId[0]
      
      db('b_locations')
      .select('id')
      .where('name',`${req.body.building_location}`)
      .then( res => {
          let buildingId = res[0].id
          console.log('inside /addrecord, inserting into join table')
          db('assets_b_locations')
            .insert({
              assets_id: asset_id,
              locations_id: buildingId
            })
            .then(res => console.log('res',res))
          })
      .then( data => res.json(data).status(200))
    })
})


router.delete('/deleterecord', (req,res)=>{
  let asset_id = req.body.id
  db('assets_b_locations')
  .where('assets_id',`${asset_id}`)
  .del()
  .then( data => res.json(data).status(200))
})

router.delete('/deleteall', (req,res)=>{
  db('assets_b_locations')
  .where('assets_id','<', 1000)
  .del()
  .then( data => res.json(data).status(200))
})


router.put('/updaterecord', (req,res)=>{
  console.log(req.body)
  let asset_id = req.body.id
  let column = ''
  let isLocationUpdate = false
  if(req.body.name){
      column = 'name'
      newValue = req.body.name
  }else if(req.body.location_name){
    console.log('new location')
    isLocationUpdate = true
  }else if(req.body.serial){
      column ='serial'
      newValue = req.body.serial
  }else if(req.body.last_inv_date){
      column ='last_inv_date'
      newValue = req.body.last_inv_date
  }else if(req.body.inges_date){
      column ='inges_date'
      newValue = req.body.inges_date
  }else if(req.body.active === false || true){
      db('assets')
      .where('id',`${req.body.id}`)
      .update({
        active : `${req.body.active}`
      })
      .then( res.status(200))
  } 
  
  if( isLocationUpdate === false ){
    db('assets')
    .where('id',`${req.body.id}`)
    .update( `${column}`, `${newValue}`)
    .then( res.status(200) )
  } else {
    db('b_locations')
      .select('id')
      .where('name',`${req.body.location_name}`)
      .returning('id')
      .then( res => {
        console.log(`NEW LOCATION POSTED ${res[0].id}`)
        let location_id = res[0].id
        db('assets_b_locations')
          .where('assets_id',`${asset_id}`)
          .update('locations_id',`${location_id}`)
          .returning('id')
          .then( res => console.log(res))
      }).then( data => res.json(data).status(200))
    res.status(200)
  }

})
module.exports = router;
