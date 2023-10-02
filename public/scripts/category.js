  
    document.addEventListener('DOMContentLoaded', function() {
        // Function to show the element with the given ID and hide other elements
        fetch('http://localhost:3000/backend/categorylist')
          .then(response => response.json())
          .then(data => {
    
            data.forEach(element => {
    
              printcategory(element)
              
            })
            
          })
          .catch(function(error) {
            // Handle error response
            console.error(error);
          });
      });
      // Function to handle adding a new category
  function addNewCategory() {
    // Get the value of the input field
    const newCategoryName = document.getElementById('categoryname').value;

    // Make an API request to add the new category
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    fetch('http://localhost:3000/backend/addcategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newCategoryName }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      // Assuming the server returns an object with the category details
      const categoryDetails = data;
      printcategory(categoryDetails)
      
    })
    .catch(error => {
      console.error('Error adding category:', error);
    });
  }

  // Add event listener to the "Add New Category" button
  document.getElementById('addCategoryBtn').addEventListener('click', addNewCategory);
  function printcategory(categoryDetails){
    
// Create the category card element
    var html = `<div class="p-3"><div class="d-flex justify-content-between"><div class="d-flex align-items-center"><a href="#" id="deleteCategoryBtn"><i class="bx bx-trash fs-3"></i></a><a id="categorybutton" data-poll='${JSON.stringify(categoryDetails)}' href="#" onclick="showfeatures(event)"><h5 class="ms-2 mb-0">${categoryDetails.name}</h5></a></div><h5 class="mb-0">0</h5></div></div>`;

// Convert the HTML string to a DOM element
const categoryCard = document.createElement('div');
categoryCard.innerHTML = html;

// Attach the event listener to the delete icon link
const deleteIconLink = categoryCard.querySelector('#deleteCategoryBtn');
deleteIconLink.addEventListener('click', () => {
  // Handle the delete icon click here
  // You can make another API request to delete the category here
  // and remove the card from the DOM after successful response
  // Replace 'YOUR_DELETE_ENDPOINT' with the actual delete API endpoint
  fetch('http://localhost:3000/backend/deletecategory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ categoryId: categoryDetails._id }), // Assuming the server expects categoryId to identify the category to delete
  })
  .then(() => {
    categoryCard.remove();
  })
  .catch(error => {
    console.error('Error deleting category:', error);
  });
});

// Append the new category card to the categoryList div
document.getElementById('categoryList').appendChild(categoryCard);
  }

  var category = {}
  function showfeatures(event){
    document.getElementById('featuresdiv').classList.remove('d-none')
    document.getElementById('featureslist').innerHTML=''
    const dataPollAttribute = JSON.parse(event.currentTarget.dataset.poll);
    category = dataPollAttribute
    document.getElementById('featuresheader').innerText = category.name + ' Features'

    dataPollAttribute.features.forEach(element => {
      printfeature(element)
      
    });
  

  }
  function printfeature(element){
    var html = `<div class="p-3"><div class="d-flex justify-content-between"><div class="d-flex align-items-center"><a href="#" id="deletefeature"><i class="bx bx-trash fs-3"></i></a><a href="#"><h5 class="ms-2 mb-0">${element.name}</h5></a></div><h5 class="mb-0">0</h5></div></div>`;
          // Convert the HTML string to a DOM element
          const categoryCard = document.createElement('div');
      categoryCard.innerHTML = html;

      // Attach the event listener to the delete icon link
      const deleteIconLink = categoryCard.querySelector('#deletefeature');
      deleteIconLink.addEventListener('click', () => {
        // Handle the delete icon click here
        // You can make another API request to delete the category here
        // and remove the card from the DOM after successful response
        // Replace 'YOUR_DELETE_ENDPOINT' with the actual delete API endpoint
        fetch('http://localhost:3000/backend/deletefeature', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ categoryId: category._id,featureId:element._id }), // Assuming the server expects categoryId to identify the category to delete
        })
        .then(() => {
          categoryCard.remove();
        })
        .catch(error => {
          console.error('Error deleting category:', error);
        });
      });
      document.getElementById('featureslist').appendChild(categoryCard);

  }


       // Function to handle adding a new category
       function addFeature() {
    // Get the value of the input field
    const newFeature = document.getElementById('newFeature').value;

    // Make an API request to add the new category
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    fetch('http://localhost:3000/backend/addfeatures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newFeature,category:category._id }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      // Assuming the server returns an object with the category details
      document.getElementById('featureslist').innerHTML=''
      data.features.forEach(element => {
        printfeature(element)

      });
      
    })
    .catch(error => {
      console.error('Error adding Feature:', error);
    });
       }
       

