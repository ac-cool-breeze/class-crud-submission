var express = require('express');
var router = express.Router();
const db = require('../db')


router.get('/', function(req, res, next) {
  console.log('/ hit')
  res.send('reached endpoint')
  res.end()
});

// TODO
router.get('/allrecords', (req,res)=>{
  db.select('*')
    .from('assets')
    .orderBy('id')
    .then( data => res.json(data).status(200))


  // db.from('assets_b_locations')
  //   .leftJoin('assets', 'assets_b_locations.assets_id', 'assets.id' )
  //   .leftJoin('b_locations', 'assets_b_locations.locations_id', 'b_locations.id')
  //   .select('assets.name','assets.inges_date', 'assets.serial', 'assets.last_inv_date', 'assets.active', 'b_locations.name')
  //   .orderBy('assets.id')
  //   .then(data => res.status(200).json(data.rows))
  //   .catch(err =>
  //     res.status(500).json({
  //       message: err
  //     })
  //   );

})

// FINISHED
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
  db.select('*')
  .from('assets')
  .then( data => res.json(data.rows).status(200))
})

// FINISHED
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
  .then( data => res.json(data.rows).status(200))
})


// FINISHED
router.post('/removebuilding', (req,res)=>{
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

// TODO
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
    .then( res => console.log(res))
    /*
    .then( data => {
      let asset_id = data
      db('b_locations')
      .select('id')
      .where('name',`${req.body.building_location}`)
      .then( buildingId => {
        db('assets_b_locations')
        .insert({
          assets_id: asset_id,
          locations_id: building_id
        })
      })
    })

       .then( data => {
           let assetId = data.rows[0].id
           db.query(`SELECT id FROM b_locations WHERE name = '${req.body.building_location}';`)
           .then( data2 => {
              let buildingId = data2.rows[0].id
              db.query(`INSERT INTO assets_b_locations ( assets_id, locations_id ) VALUES ( ${assetId},${buildingId});`)
           })
       })*/
})


// TODO
router.post('/updaterecord', (req,res)=>{
  console.log(req.body)
  let column = ''
  if(req.body.name){
      column = 'name'
      newValue = req.body.name
  } else if(req.body.serial){
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
      .then( res.status(200).end())
  } 
  
  db('assets')
  .where('id',`${req.body.id}`)
  .update( `${column}`, `${newValue}`)
  .then( res.status(200).end())

})
module.exports = router;
