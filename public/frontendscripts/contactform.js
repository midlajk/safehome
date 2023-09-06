document.getElementById('contactform').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    const form = event.target;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('/admincontrollerenquiries', {
        method: 'POST',
        body: formData,
      });
    
      const responseData = await response.json();
    
      if (response.ok) {
        // Clear form fields after successful submission
        form.reset();
    
        // Display success message
        const messageContainer = document.getElementById('message-container');
        messageContainer.innerHTML = '<p>Form submitted successfully!</p>';
      } else {
        // Handle errors and display them in the error container
        const errorContainer = document.getElementById('error-container');
        errorContainer.innerHTML = `<p>${responseData.error}</p>`;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    });
    