require('../model/datastructure')
const mongoose = require('mongoose');
const Category = mongoose.model('Categories');
const Places = mongoose.model('Places');
const FormData = mongoose.model('FormData');
const Property = mongoose.model('Property');


exports.getenquiries  = ((req, res, next)=> {
  
  res.render('backend/enquiries', { route: 'enquiries' });
        
})
exports.adminmanagement  = ((req, res, next)=> {
  
  res.render('backend/adminmanagement', { route: 'adminmanagement' });
        
})
exports.getproperties  = ((req, res, next)=> {
  res.render('backend/properties', { route: 'properties' });

      
})
exports.getaddproperty  = (async(req, res, next)=> {
  const place = await Places.find();
  const getAllFeatureNames = async () => {
    try {
      const aggregationResult = await Category.aggregate([
        // Unwind the 'features' array to denormalize it
        { $unwind: '$features' },
  
        // Project the fields with the desired format
        {
          $project: {
            _id: 0,
            categoryName: '$name',
            featureName: '$features.name'
          }
        },
  
        // Add a new field with the concatenated string
        {
          $addFields: {
            categoryFeatureName: {
              $concat: ['$categoryName', ':', '$featureName']
            }
          }
        },
  
        // Group all documents and push the concatenated strings into an array
        {
          $group: {
            _id: null,
            allFeatureNames: { $push: '$categoryFeatureName' }
          }
        }
      ]);
  
      // Extract the feature names from the aggregation result
      const allFeatureNames = aggregationResult.length > 0 ? aggregationResult[0].allFeatureNames : [];
      console.log(allFeatureNames);
      return allFeatureNames;
    } catch (error) {
      console.error('Error getting feature names:', error);
      throw error;
    }
  };
  
  
  const categories = await getAllFeatureNames();
  res.render('backend/addproperty', { route: 'addproperty' ,places:place,category:categories});

      
})
exports.getcategory  = ((req, res, next)=> {
  res.render('backend/category', { route: 'category' });

      
})

exports.getfeatured  = ((req, res, next)=> {
  res.render('backend/featured', { route: 'featured' });

})
exports.getplaces  = ((req, res, next)=> {
  res.render('backend/places', { route: 'places' });

})


/////////

exports.categorylist  = ((req, res) => {
  // Use Mongoose's find method to retrieve all categories
  Category.find()
    .then(categories => {
      console.log(categories)
      // Respond with the list of categories in JSON format
      res.status(200).json(categories);
    })
    .catch(err => {
      // Handle any errors that occurred during the fetch process
      res.status(500).json({ error: 'Unable to fetch categories' });
    });
});
exports.placelist  = ((req, res) => {
  // Use Mongoose's find method to retrieve all categories
  Places.find()
    .then(places => {
      // Respond with the list of categories in JSON format
      res.status(200).json(places);
    })
    .catch(err => {
      // Handle any errors that occurred during the fetch process
      res.status(500).json({ error: 'Unable to fetch categories' });
    });
});

/////
exports.enquiries  = (async (req, res) => {
// Assuming you have already imported required modules and set up your Express app

// API endpoint for paginated data
  try {
    const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
    const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
    const length = parseInt(req.query.length) || 10; // Get the number of records per page
    // Fetch data from the database with pagination
    const totalCount = await FormData.countDocuments();
    const data = await FormData.find().skip(start).limit(length);

    res.json({
      draw,
      recordsTotal: totalCount,
      recordsFiltered: totalCount,
      data,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Server error' });
  }


});

exports.deleteenquiries  = (async (req, res) => {
  try {
    const { id } = req.params;
    // Find the data record by ID and delete it from the database
    const deletedData = await FormData.findByIdAndRemove(id);
    if (!deletedData) {
      // If the data with the provided ID does not exist, return a 404 status
      return res.status(404).json({ error: 'Data not found' });
    }
    // If deletion is successful, return a success response
    return res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    // If an error occurs during the deletion process, return a 500 status with an error message
    return res.status(500).json({ error: 'Server error' });
  }
});




////
exports.propertieslist  = (async (req, res) => {
  // Assuming you have already imported required modules and set up your Express app
  
  // API endpoint for paginated data
    try {
      const draw = parseInt(req.query.draw) || 1; // Get the draw count (used by DataTables)
      const start = parseInt(req.query.start) || 0; // Get the starting index of the data to fetch
      const length = parseInt(req.query.length) || 10; // Get the number of records per page
      // Fetch data from the database with pagination
      const totalCount = await Property.countDocuments();
      const data = await Property.find().skip(start).limit(length);
  
      res.json({
        draw,
        recordsTotal: totalCount,
        recordsFiltered: totalCount,
        data,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Server error' });
    }
  
  
  });
  
  exports.deleteproperty  = (async (req, res) => {
    try {
      const { id } = req.params;
      // Find the data record by ID and delete it from the database
      const deletedData = await Property.findByIdAndRemove(id);
      if (!deletedData) {
        // If the data with the provided ID does not exist, return a 404 status
        return res.status(404).json({ error: 'Data not found' });
      }
      // If deletion is successful, return a success response
      return res.json({ message: 'Data deleted successfully' });
    } catch (error) {
      console.error('Error deleting data:', error);
      // If an error occurs during the deletion process, return a 500 status with an error message
      return res.status(500).json({ error: 'Server error' });
    }
  });
  