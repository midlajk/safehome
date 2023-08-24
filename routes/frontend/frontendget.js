require('../../model/datastructure');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Property = mongoose.model('Property'); // Assuming your model is defined as 'Property'
const Places = mongoose.model('Places');

router.get('/listproperties', async (req, res) => {
    console.log(req.query)
    const page = parseInt(req.query.page) || 1;
    const sortproperty = req.query.sortproperty || 'date-desc';
    const propertyType = req.query.type || 'all';
    const pagename = req.query.pagename || 'Sale';
    const sortField = getSortField(sortproperty);
    const sortOrder = getSortOrder(sortproperty);
    const pageSize = 10; // Number of properties per page
    const startIndex = (page - 1) * pageSize;

    try {
        var query = {plPropertySaleRent:pagename};
        if (propertyType !== 'all') {
            query.plPropertyType = propertyType;
        }
        const totalProperties = await Property.countDocuments(query);
        const totalPages = Math.ceil(totalProperties / pageSize);

        const propertiesForPage = await Property
            .find(query)
            .skip(startIndex)
            .limit(pageSize)
            .sort({ [sortField]: sortOrder })
            .exec(); // Use 'exec()' to execute the query

        res.json({
            properties: propertiesForPage,
            currentPage: page,
            totalPages: totalPages,
            totalProperties:totalProperties
        });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
function getSortField(sortproperty) {
    switch (sortproperty) {
        case 'price-asc':
            return 'plExpeactedPrice';
        case 'price-desc':
            return 'plExpeactedPrice';
        case 'date-asc':
            return '_id';
        case 'date-desc':
            return '_id';
        default:
            return '_id'; // Default to sorting by _id descending
    }
}
function getSortOrder(sortproperty) {
    switch (sortproperty) {
        case 'price-asc':
            return 1;
        case 'price-desc':
            return -1;
        case 'date-asc':
            return 1;
        case 'date-desc':
            return -1;
        default:
            return 1; // Default to sorting by _id descending
    }
}

router.get('/viewproperty/:id', async (req, res) => {
    Property.findById(req.params.id).then((property) => {
    res.render('frontend/viewproperty', { route: req.params.id,property: property});
  
    })
  
  
  })


  ////
  router.get('/fetchcities', async (req, res) => {
    console.log('hre')
    try {
        // Use Mongoose's aggregate pipeline to retrieve places and count of matching properties
        const placesWithCount = await Places.aggregate([
          {
            $lookup: {
              from: 'properties', // Change this to the actual collection name for properties
              localField: 'name', // Change this to the actual field that links to the place in properties collection
              foreignField: 'plCountry', // Change this to the actual field in the properties collection that links to the place
              as: 'properties'
            }
          },
          {
            $addFields: {
              highlightedProperties: {
                $filter: {
                  input: '$properties',
                  as: 'property',
                  cond: { $eq: ['$$property.highlighted', true] }
                }
              }
            }
          },
          {
            $project: {
              _id: 1,
              name: 1, // Change this to the actual field that represents the place name
              description: 1, // Change this to the actual field that represents the place description
              imagePaths: 1, // Change this to the actual field that represents the place image
              highlighted: 1, // Change this to the actual field that represents whether the place is highlighted
              noOfProperties: { $size: '$highlightedProperties' } // Count the number of highlighted properties
            }
          }
        ]);
    
        // Respond with the list of places with count of highlighted properties in JSON format
        res.status(200).json(placesWithCount);
      } catch (err) {
        // Handle any errors that occurred during the fetch process
        console.error('Error fetching places:', err);
        res.status(500).json({ error: 'Unable to fetch places' });
      }
});



router.get('/listfeatruredproperties', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 3; // Number of properties per page
  const startIndex = (page - 1) * pageSize;

  try {
     
      const totalProperties = await Property.countDocuments({status:'featured'});
      console.log('Total properties: ' + totalProperties)
      const totalPages = Math.ceil(totalProperties / pageSize);

      const propertiesForPage = await Property
          .find({status:'featured'})
          .skip(startIndex)
          .limit(pageSize)
          .exec(); // Use 'exec()' to execute the query
console.log(propertiesForPage,page,totalPages,totalProperties)
      res.json({
          properties: propertiesForPage,
          currentPage: page,
          totalPages: totalPages<3?totalPages:3,
          totalProperties:totalProperties<9?totalProperties:9
      });
  } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;



router.get('/miniforsale', async (req, res) => {
  console.log('minifor sale')


  try {
     
    const propertiesForPage = await Property.aggregate([
      { $match: { plPropertySaleRent: 'Sale' } }, // Match the desired condition
      { $sample: { size: 3 } } // Retrieve 3 random documents
    ]).exec()

      res.json({
          properties: propertiesForPage,
      });
  } catch (error) {
    console.log(error)
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/listallrandom', async (req, res) => {


  try {
     
    const propertiesForPage = await Property.aggregate([ // Match the desired condition
      { $sample: { size: 3 } } // Retrieve 3 random documents
    ]).exec()
      res.json({
          properties: propertiesForPage,
      });
  } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/getfullgrid', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const sortproperty = req.query.sortproperty || 'date-desc';
  const propertyType = req.query.type||'all';
  const pagename = req.query.pagename || 'buildtypes';
  const sortField = getSortField(sortproperty);
  const sortOrder = getSortOrder(sortproperty);
  const pageSize = 10; // Number of properties per page
  const startIndex = (page - 1) * pageSize;
console.log(req.query)
  try {
      var query = {plPropertyType:propertyType};
      if (pagename == 'location') {
        query = {plCountry:propertyType}
      }else{
        query.plPropertyType = propertyType;
      }
      const totalProperties = await Property.countDocuments(query);
      const totalPages = Math.ceil(totalProperties / pageSize);

      const propertiesForPage = await Property
          .find(query)
          .skip(startIndex)
          .limit(pageSize)
          .sort({ [sortField]: sortOrder })
          .exec(); // Use 'exec()' to execute the query

      res.json({
          properties: propertiesForPage,
          currentPage: page,
          totalPages: totalPages,
          totalProperties:totalProperties
      });
  } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/getsearcheddata', async (req, res) => {
  console.log(req.query)
  const page = parseInt(req.body.page) || 1;
  const sortproperty = req.body.sortproperty || 'date-desc';
  const sortField = getSortField(sortproperty);
  const sortOrder = getSortOrder(sortproperty);
  const pageSize = 10; // Number of properties per page
  const startIndex = (page - 1) * pageSize;
  const data = req.body.data;
  console.log(data)


  try {

    const query = {};
    const data = req.body.data;
    for (const key in data) {
        if (data[key] !== '') {
            query[key] = data[key];
        }
    }
  
      const totalProperties = await Property.countDocuments(query);
      const totalPages = Math.ceil(totalProperties / pageSize);

      const propertiesForPage = await Property
          .find(query)
          .skip(startIndex)
          .limit(pageSize)
          .sort({ [sortField]: sortOrder })
          .exec(); // Use 'exec()' to execute the query

      res.json({
          properties: propertiesForPage,
          currentPage: page,
          totalPages: totalPages,
          totalProperties:totalProperties
      });
  } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
