// Lister for submit
document.getElementById('loan-form').addEventListener('submit', function(object){
    // Hide result
    document.getElementById('results').style.display = 'none';
    
    // Show the loading gif
    document.getElementById('loading').style.display = 'block';


    setTimeout(calculateResults, 1500);

    object.preventDefault();
});

function calculateResults () {

    // UI Variables
    const UIamount = document.getElementById('amount');
    const UIinterest = document.getElementById('interest');
    const UIyearsToReplay = document.getElementById('years');

    const UImonthlyPayment = document.getElementById('monthly-payment');
    const UItotalPayment = document.getElementById('total-payment');
    const UItotalInterest = document.getElementById('total-interest');

    
    const principal = parseFloat(UIamount.value); 
    const calculateInterest = parseFloat(UIinterest.value) / 100 / 12;
    const calculateNumberOfPayments = parseFloat(UIyearsToReplay.value) * 12;
    
    // Calculate the montly payment
    const x = Math.pow(1 + calculateInterest, calculateNumberOfPayments);
    const monthly = (principal * x * calculateInterest) / (x - 1);

    if (isFinite(monthly)) {
        // toFixed is used to only display two numbers after 0
        UImonthlyPayment.value = monthly.toFixed(2);
        UItotalPayment.value = (monthly * calculateNumberOfPayments).toFixed(2);
        UItotalInterest.value = (((monthly * calculateNumberOfPayments)) - principal).toFixed(2);

         // show the results
        document.getElementById('results').style.display = 'block';
         // hide loading gif
         document.getElementById('loading').style.display = 'none';
    }
    else 
    {      
        showError('Please Check Your Numbers'); 
          // hide loading gif
          document.getElementById('loading').style.display = 'none';   
    }
}

// Show and error if the data entered is not valid
function showError (error) {
    // Create a Div
    const errorDiv = document.createElement('div');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create Text Node
    const textNode = document.createTextNode(error);

    // Add the text node into errorDiv
    errorDiv.appendChild(textNode);
    
    // Grab UI elements
    const card = document.querySelector('.card');   
    const heading = document.querySelector('.heading');
    
    // Insert error above card
    card.insertBefore(errorDiv, heading);

    // Remove the Error after 3 seconds
    setTimeout(clearError, 3000);
}

// Remove Error
function clearError() {
    document.querySelector('.alert').remove();
}

