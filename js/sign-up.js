var loggedIn =false;
window.onload = function () {

    // using an eventListener to register when the user clicks the submit button
    document.getElementById('sign-up-form').addEventListener('submit', function (event) {

        event.preventDefault();

        // getting the users email address from the form
        var email = document.getElementById("email").value;

        // getting the users name from the form
        var name = document.getElementById("firstname").value;

        // this is an object that is used by the EmailJS template for the email
        // these are needed to have the users name displayed in the email and to send it to their inbox
        // setting the variables to the users email and name
        var templateParams = {
            email: email,
            name: name,
        };

        // this function is responsible for sending the email 
        // the paramters are unique identifiers provided on our EmailJS account
        // the first parameter is a service id, which is what connects our email address with EmailJS 
        // the second is the template id, this will determine what the email says and is set up on the EmailJS dashboard
        if (loggedIn == true){
            emailjs.send('service_he5dnbc', 'template_9hbccd7', templateParams)
            .then(function () {
                // displays success to the console if the email was sent
                console.log('SUCCESS!');
            }, function (error) {
                // displays failed to the console if the email was not sent
                console.log('FAILED...', error);
            });
        }

    });
}

function validateForm() {

    //setting x to the value of username in the login form
    var x = document.forms["sign-up-form"]["password"].value;

    //checking if the variable x is left blank 
    if (x == null || x == "") {

        // alert the user
        alert("Password can not be blank.");
        return false;
    }
}

function validateEmail(email) {
    alert("validateEmail()");

    var re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
        console.log("correct email");
        store();
    }
}

function store() {

    var firstname = document.getElementById("firstname");
    var surname = document.getElementById("surname");
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    localStorage.firstname = firstname.value;
    localStorage.surname = surname.value;
    localStorage.password = password.value;
    localStorage.email = email.value;
    localStorage.loggedIn = true;
    loggedIn = true;
    //  window.open("index.html");
}

function signIn() {



    //calling the validateForm() function
    validateForm();

    // getting the length of the value of the element with an id of password from the HTML 
    var password = document.getElementById("password").value;
    var passwordCheck = document.getElementById("password-check").value;

    // checking if the length is >=8

    if (password.length >= 8) {

        // found this method on w3schools.com when researching the best way to compare strings 
        var x = password.localeCompare(passwordCheck);

        // locale compare returns 0 or 1, 0 if the strings are the same or 1 if they are incorrect
        // checking if x = 0
        if (x == 0) {
            store();
        } else {
            document.getElementById("error").innerHTML = "Error:";
            document.getElementById("match-error").innerHTML = "Passwords must match.";
        }

    } else {
        // update the html of the elements with id of error and login_error
        document.getElementById("error").innerHTML = "Error:"
        document.getElementById("length-error").innerHTML = "Password must be 8 characters in length"
    }
}


