// Console log to confirm the script is loaded
console.log("Dark theme applied successfully with white text.");

// Function to handle the subscription form submission
function showThankYouMessage(event) {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    // Get the input value from the email input field
    const emailInput = document.getElementById("email-input").value;

    // Get the thank-you message element
    const thankYouMessage = document.getElementById("thank-you-message");

    // Check if the email input is not empty
    if (emailInput) {
        // Set the thank-you message text
        thankYouMessage.textContent = "Thanks! We'll get in touch with you.";

        // Set the text color to green for success
        thankYouMessage.style.color = "green";

        // Display the thank-you message
        thankYouMessage.style.display = "block";

        // Optionally, clear the input field after submission
        document.getElementById("email-input").value = "";
    } else {
        // If no email is entered, display an error message
        thankYouMessage.textContent = "Please enter a valid email address.";
        thankYouMessage.style.color = "red";
        thankYouMessage.style.display = "block";
    }
}

// Attach the form submission event listener to the form
const subscribeForm = document.querySelector("form");
subscribeForm.addEventListener("submit", showThankYouMessage);
