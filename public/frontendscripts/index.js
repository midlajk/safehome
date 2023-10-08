
// $(document).ready(function() {
//     const propertiesListing = $('.rhea_properties_cities_wrapper');
//     // const paginationContainer = $('#pagination');
//     // const paginationstatus = $('.rh_pagination__stats');
//     // const sortproperties = $('#sort-properties'); // Don't use .val() here
//     // const propertyTypesList = $('#property-types-list');
//     // let selectedPropertyType = 'all';
//     // Function to make an AJAX request to the backend with pagination
//     function fetchcities() {
//         $.ajax({
//             url: `http://safehomes.ae/fetchcities`,
//             type: 'GET',
//             dataType: 'json',
//             success: function(response) {


//                 // Handle the response from the backend here
//                 // For example, update the HTML to display the property listings
//                 if (response && response.cities) {
//                     propertiesListing.empty();
//                     response.cities.forEach(cities => {
//                         var html = `<div class="rhea_property_city">
//                         <a class="rhea_property_city_inner" style="flex-direction: column" href="../property-city/little-havana/index.html"><span class="rhea_pc_layer_still" style='background-image: url("${cities.image}")'></span>
//                             <span class="rhea_pc_layer"></span><h3 class="rhea_city_title">${cities.name}</h3><span class="rhea_pc_counter" style="align-self: flex-end"><span class="rhea_pc_count">${cities.property}</span> <span class="rhea_pc_label">Properties  </span></span></a></div>`
//                         propertiesListing.append(html);
//                     });
//                 }
//             },
//             error: function(error) {
//                 console.error('Error fetching properties:', error);
//             }
//         });
//     }
//     fetchcities()
//     // Call the fetchProperties function with page 1 and the initial sortproperties value on 
//     // Handle sortproperties change event

//  // Default property type


// });

