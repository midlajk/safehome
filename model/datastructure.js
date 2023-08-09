
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var categories = new Schema({
    name:String,
    features:[{
        name:String
    }],
 
});

var Categories =
    mongoose.model('Categories', categories);
module.exports = Categories;

var places = new Schema({
    name:String,
    description:String,
    imagePaths:String,
    highlighted:String,


});

var Places =
    mongoose.model('Places', places);
module.exports = Places;

var user = new Schema({
    username:String,
    password:String,
});

var User =
    mongoose.model('User', user);
module.exports = User;

var property = new Schema({
    plUserType: String,
    plFirstName: String,
    plLastName: String,
    plEmail: String,
    plContact: String,
    plPropertySaleRent: String,
    plPropertyType: String,
    plZipCode: String,
    plCountry: String,
    plState: String,
    plCity: String,
    plLandmark: String,
    plAddress: String,
    plBedrooms: Number,
    plFloorNo: Number,
    plBathrooms: Number,
    plFurnishingDetails: [],
    plCommonAreaRadio: String,
    plAttachedBalconyRadio: String,
    plTotalArea: Number,
    plCarpetArea: Number,
    plPlotArea: Number,
    plAvailableFrom: Date,
    plPossessionStatus: String,
    plTransectionType: String,
    plRoadFacingRadio: String,
    plGatedColonyRadio: String,
    file: [],
    plExpeactedPrice: Number,
    plPriceSqft: Number,
    plMaintenenceCharge: Number,
    plMaintenencePer: String,
    plBookingAmount: Number,
    plOtherAmount: Number,
    plShowPriceRadio: String
});

var Property =
    mongoose.model('Property', property);
module.exports = Property;


const formDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String },
    message: { type: String, required: true },
  });
  
  const FormData = mongoose.model('FormData', formDataSchema);
  module.exports = FormData;
