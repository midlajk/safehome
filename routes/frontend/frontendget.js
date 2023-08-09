require('../../model/datastructure');
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Property = mongoose.model('Property'); // Assuming your model is defined as 'Property'

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
module.exports = router;
