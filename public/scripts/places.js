const closeModalButton = document.getElementById('closeModalBtn');
document.addEventListener('DOMContentLoaded', function () {
  // Function to show the element with the given ID and hide other elements
  fetch('https://www.safehomes.ae/backend/placelist')
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        addPlaceToTable(element);
      });
    })
    .catch(function (error) {
      console.log(error);
      // Handle error response
    });
});
// Function to add a new place
function addPlace() {
  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('highlighted', document.getElementById('highlighted').value);
  formData.append('image', document.getElementById('image').files[0]);

  makeAPIRequest(
    'https://www.safehomes.ae/backend/addplace',
    formData,
    'POST',
    addPlaceToTable,
  );
}

// Function to edit a place
function editPlace(placeId) {
  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('highlighted', document.getElementById('highlighted').value);
  formData.append('image', document.getElementById('image').files[0]);
  formData.append('placeId', placeId);

  makeAPIRequest(
    `https://www.safehomes.ae/backend/editplace`,
    formData,
    'POST',
    updatePlaceInTable,
  );
}
// Function to make API requests
function makeAPIRequest(url, data, method, callback) {
  axios({
    method: method,
    url: url,
    data: data,
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then((response) => {
      // Handle the response from the server
      const placeDetails = response.data;
      callback(placeDetails);
      closeModalButton.click();
    })
    .catch((error) => {
      console.log(error)
      console.error('Error:', error);
    });
}

// Function to add the new place data to the table
function addPlaceToTable(place) {
  const tableBody = document.getElementById('placesTableBody');
  const newRow = document.createElement('tr');
  newRow.setAttribute('data-poll', JSON.stringify(place)); // Add data-poll attribute

  newRow.innerHTML = `
        <td>${place.name}</td>
        <td>${place.description}</td>
        <td><a href="https://www.safehomes.ae/${
          place.imagePaths
        }" target="_blank">View Image</a></td>
        <td>${place.highlighted}</td>
        <td>${place.noOfProperties}</td>
        <td>
                                        
                                              <a onclick="openEditModal(event)" data-poll='${JSON.stringify(
                                                place,
                                              )}' style="margin-left:10px"  href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#modalCenter"><i class="bx bx-edit-alt me-1"></i></a
                >    <a id="deletePlace" href="javascript:void(0);"
                  ><i class="bx bx-trash me-1"></i></a
                >
           
        </td>
      `;
  const deleteIconLink = newRow.querySelector('#deletePlace');
  deleteIconLink.addEventListener('click', () => {
    fetch('https://www.safehomes.ae/backend/deleteplace', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({placeId: place._id}), // Assuming the server expects categoryId to identify the category to delete
    })
      .then(() => {
        newRow.remove();
      })
      .catch((error) => {
        console.log(error)

        console.error('Error deleting category:', error);
      });
  });

  tableBody.appendChild(newRow);
}

// Function to update the place data in the table after editing
function updatePlaceInTable(place) {
  const tableBody = document.getElementById('placesTableBody');
  const rows = tableBody.getElementsByTagName('tr');

  // Find the row with the matching place ID and update its content
  for (let i = 0; i < rows.length; i++) {
    const rowData = JSON.parse(rows[i].getAttribute('data-poll'));
    if (rowData._id === place._id) {
      const html = `
        <td>${place.name}</td>
        <td>${place.description}</td>
        <td><a href="https://www.safehomes.ae/${
          place.imagePaths
        }" target="_blank">View Image</a></td>
        <td>${place.highlighted}</td>
        <td>${place.noOfProperties}</td>
        <td>
          <a onclick="openEditModal(event)" data-poll='${JSON.stringify(
            place,
          )}' style="margin-left:10px" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#modalCenter"><i class="bx bx-edit-alt me-1"></i></a>
          <a id="deletePlace" href="javascript:void(0);"><i class="bx bx-trash me-1"></i></a>
        </td>         
      `;
      rows[i].innerHTML = html;

      const deleteIconLink = rows[i].querySelector('#deletePlace');
      deleteIconLink.addEventListener('click', () => {
        fetch('https://www.safehomes.ae/backend/deleteplace', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({placeId: place._id}), // Assuming the server expects placeId to identify the place to delete
        })
          .then(() => {
            rows[i].remove();
          })
          .catch((error) => {
            console.error('Error deleting place:', error);
          });
      });
      break;
    }
  }
}

function openEditModal(event) {
  const dataPollAttribute = JSON.parse(event.currentTarget.dataset.poll);
  const placeId = dataPollAttribute._id;
  // Populate the modal fields with the place data
  document.getElementById('name').value = dataPollAttribute.name;
  document.getElementById('description').value = dataPollAttribute.description;
  document.getElementById('highlighted').value = dataPollAttribute.highlighted;

  // Set the onclick function and text for the modal button
  document.getElementById('submitbutton').onclick = () => editPlace(placeId);
  document.getElementById('submitbutton').innerText = 'Edit Place';
  document.getElementById('modalCenterTitle').innerText = 'Edit Place';
}

function openAddModal() {
  // Clear the modal fields
  document.getElementById('name').value = '';
  document.getElementById('description').value = '';
  document.getElementById('highlighted').value = '';

  // Set the onclick function and text for the modal button
  document.getElementById('submitbutton').onclick = addPlace;
  document.getElementById('submitbutton').innerText = 'Add Place';
  document.getElementById('modalCenterTitle').innerText = 'Add New Place';
}
