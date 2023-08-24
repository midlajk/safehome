require('../model/datastructure');
const mongoose = require('mongoose');
const Category = mongoose.model('Categories');
const Places = mongoose.model('Places');
const Property = mongoose.model('Property');
const FormData = mongoose.model('FormData');
const crypto = require('crypto');

const fs = require('fs');

exports.addcategory = (req, res, next) => {
  const {name} = req.body;

  // Assuming 'Category' is the mongoose model for your 'categories' collection
  const newCategory = new Category({
    name,
    features: [], // You can add features here if needed
  });

  // Save the new category to the database
  newCategory
    .save()
    .then((savedCategory) => {
      // Respond with the saved category data
      res.status(201).json(savedCategory);
    })
    .catch((err) => {
      // Handle any errors that occurred during the save process
      res
        .status(500)
        .json({error: 'Unable to save the category to the database'});
    });
};

exports.deletecategory = (req, res, next) => {
  const categoryId = req.body.categoryId;

  // Use Mongoose's findOneAndRemove method to find the category by ID and remove it
  Category.findOneAndRemove({_id: categoryId})
    .then((deletedCategory) => {
      if (!deletedCategory) {
        // Category with the given ID was not found
        return res.status(404).json({error: 'Category not found'});
      }
      // Category successfully deleted
      res.status(200).json({message: 'Category deleted successfully'});
    })
    .catch((err) => {
      // Handle any errors that occurred during the delete process
      res.status(500).json({error: 'Unable to delete the category'});
    });
};

exports.addfeatures = (req, res, next) => {
  const {name, category} = req.body;
  var flag = 0;
  Category.findById(category)
    .then((foundCategory) => {
      if (!foundCategory) {
        flag = 1;
        // Category with the given ID was not found
        return res.status(404).json({error: 'Category not found'});
      } else {
        // Add the new feature to the category
        foundCategory.features.push({name});
        // Save the updated category to the database
        return foundCategory.save();
      }
    })
    .then((savedCategory) => {
      if (flag == 0) {
        res.status(201).json(savedCategory);
      }

      // Respond with the updated category data
    })
    .catch((err) => {
      // Handle any errors that occurred during the process
      res
        .status(500)
        .json({error: 'Unable to add the feature to the category'});
    });
};

exports.deletefeature = async (req, res, next) => {
  const {categoryId, featureId} = req.body;

  try {
    // Find the category by its ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({error: 'Category not found'});
    }

    // Find the feature by its ID in the specified category
    const featureIndex = category.features.findIndex(
      (feat) => feat._id.toString() === featureId,
    );

    if (featureIndex === -1) {
      return res.status(404).json({error: 'Feature not found'});
    }

    // Remove the feature from the category's features array
    category.features.splice(featureIndex, 1);

    // Save the updated category in the database
    await category.save();

    return res.json({message: 'Feature deleted successfully'});
  } catch (error) {
    console.error('Error deleting feature:', error);
    return res.status(500).json({error: 'Internal server error'});
  }
};

exports.addplace = async (req, res, next) => {
  try {
    const {name, description, highlighted} = req.body;

    // Get the file paths of the uploaded images
    let imagePaths;

    if (req.files[0]) {
      imagePaths = req.files[0].path;
    } else {
      imagePaths = '';
    }

    // Create a new place object with the necessary data including the image paths
    const newPlace = {
      name,
      description,
      imagePaths,
      highlighted,
    };

    // Save the new place to the database
    const place = new Places(newPlace);
    await place.save();
    return res.json(place);
  } catch (error) {
    console.log(error)
    console.error('Error adding place:', error);
    return res.status(500).json({error: 'Internal server error'});
  }
};

exports.editPlace = async (req, res, next) => {
  const placeId = req.body.placeId;
  const {name, description, highlighted} = req.body;
  let imagePath;

  // Check if an image is provided
  if (req.files[0]) {
    imagePath = req.files[0].path;
  }

  try {
    // Find the place by its ID in the database
    const place = await Places.findById(placeId);

    // Check if the place exists
    if (!place) {
      return res.status(404).json({error: 'Place not found'});
    }

    // Update the place data with the provided values
    place.name = name;
    place.description = description;
    place.highlighted = highlighted;

    // Update the image path if provided
    if (imagePath) {
      // Delete the previous image if it exists
      if (place.imagePaths) {
        fs.unlinkSync(place.imagePaths);
      }

      place.imagePaths = imagePath;
    }

    // Save the updated place to the database
    const updatedPlace = await place.save();
    updatedPlace._id = placeId;
    // Send the updated place details as the response
    return res.json(updatedPlace);
  } catch (error) {
    console.error('Error updating place:', error);
    return res.status(500).json({error: 'Server error'});
  }
};

exports.deleteplace = async (req, res, next) => {
  const placeId = req.body.placeId;

  // Use Mongoose's findOneAndRemove method to find the category by ID and remove it
  Places.findOneAndRemove({_id: placeId})
    .then((deletedCategory) => {
      if (!deletedCategory) {
        // Category with the given ID was not found
        return res.status(404).json({error: 'Category not found'});
      }
      if (deletedCategory.imagePaths) {
        // Delete the previous image if it exists
        fs.unlinkSync(deletedCategory.imagePaths);
      }
      // Category successfully deleted
      res.status(200).json({message: 'Category deleted successfully'});
    })
    .catch((err) => {
      // Handle any errors that occurred during the delete process
      res.status(500).json({error: 'Unable to delete the category'});
    });
};

//////////

exports.addProperty = async (req, res, next) => {
  try {
    const propertyData = req.body;
    const uniqueId = crypto.randomBytes(3).toString('hex').toUpperCase();

    // Append the unique ID to propertyData
    propertyData.uniqueId = uniqueId;
  const property = new Property(propertyData);
    await property.save();
    return res.json(property);
  // Category successfully deleted
} catch (error) {
  console.error('Error updating place:', error);
  return res.status(500).json({error: 'Server error'});
}
};
exports.posteditproperty = async  (req, res) => {
  try {
    const id = req.body.id;
    delete req.body.id; // Remove the ID from the request body
    const updatedFields = req.body;
    // Assuming you're sending the ID in the request body
   

    // Update the document in the database
    const updatedProperty = await Property.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    return res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
  } catch (error) {
    console.error('Error updating property:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

/////
exports.uploadFiles = ((req, res) => {
  
  // Access the uploaded files using req.files array
  // const filePaths = req.files.map((file) => file.path);
  const filePaths = req.files[0]
  res.json({ filePaths });
});
exports.uploadeditFiles = ((req, res) => {
  // Access the uploaded files using req.files array
  // const filePaths = req.files.map((file) => file.path);
  const filePaths = req.files[0].path
  res.json({ filePaths });
});

exports.deleteFile = ((req, res) => {

  try {
    const { filePath } = req.query;
    console.log(filePath)
    if (!filePath) {
      return res.status(400).json({ error: 'Missing filePath parameter' });
    }
    fs.unlinkSync(filePath);
  
    return res.status(500).json({ error: 'Failed to delete file' });
    // Category successfully deleted
} catch (error) {
  console.error('Error deleting file:', error);
  return res.status(500).json({ error: 'Failed to delete file' });
}
});

exports.addfeatured =  (async (req, res) => {
  const { id,status } = req.body;
  try {
      const updatedUser = await Property.findByIdAndUpdate(id, { status }, { new: true });

      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }

      return res.json({ message: 'User status updated successfully', user: updatedUser });
  } catch (error) {
    console.log(error)
      console.error('Error updating user status:', error);
      return res.status(500).json({ message: 'An error occurred' });
  }
});
/////
exports.enquiries =  (async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, number, message } = req.body;
    
    // Save the form data to MongoDB
    const formData = new FormData({ name, email, number, message });
    await formData.save();

    // Respond with a success status and message
    return res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});
