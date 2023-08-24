const { response } = require("express");

$(document).ready(function() {
    const propertiesListing = $('.rh_page__listing');
    const paginationContainer = $('#pagination');
    const paginationstatus = $('.rh_pagination__stats');
    const sortproperties = $('#sort-properties'); // Don't use .val() here
    // Function to make an AJAX request to the backend with pagination
    function fetchProperties(page, sortproperty) {

fetch('http://localhost:3000/getsearcheddata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page: page,
      sortproperty: sortproperty,
      data: response, // Include the large object here
    }),
  })
    .then(response => response.json())
    .then(response => {
      // Handle the response from the backend here
      // ... (your existing code)
    })
    .catch(error => {
      console.error('Error fetching properties:', error);
    });
        // $.ajax({
        //     url: `http://localhost:3000/getfullgrid?page=${page}&sortproperty=${sortproperty}&type=${propertytype}&pagename=${pagename}`,
        //     type: 'GET',
        //     dataType: 'json',
        //     success: function(response) {
        //         // Handle the response from the backend here
        //         // For example, update the HTML to display the property listings
        //         if (response && response.properties) {
        //             propertiesListing.empty();
        //             response.properties.forEach(property => {
        //                 console.log(property.imagepath)
        //                 propertiesListing.append(layout(property));
        //             });

        //             paginationstatus.empty();
        //             paginationstatus.html(`
        //                 <span class="highlight_stats">${(response.currentPage - 1) * 10}</span>
        //                 <span> to </span>
        //                 <span class="highlight_stats">${Math.min(response.totalProperties, response.currentPage * 10)}</span>
        //                 <span> out of </span>
        //                 <span class="highlight_stats">${response.totalProperties}</span>
        //                 <span> properties</span>`
        //             );

        //             // Create pagination links
        //             paginationContainer.empty();
        //             for (let i = 1; i <= response.totalPages; i++) {
        //                 const activeClass = response.currentPage === i ? 'current' : '';
        //                 paginationContainer.append(`<a class="rh_pagination__btn ${activeClass}" href="#" data-page="${i}">${i}</a>`);
        //             }
        //         }
        //     },
        //     error: function(error) {
        //         console.error('Error fetching properties:', error);
        //     }
        // });
    }

    // Call the fetchProperties function with page 1 and the initial sortproperties value on page load
    fetchProperties(1, sortproperties.val());

    // Handle pagination link clicks
    paginationContainer.on('click', 'a', function(e) {
        e.preventDefault();
        const page = parseInt($(this).attr('data-page'));
        fetchProperties(page, sortproperties.val());
    });

    // Handle sortproperties change event
    sortproperties.on('change', function() {
        fetchProperties(1, $(this).val());
    });
 // Default property type


});

