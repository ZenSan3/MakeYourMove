var loggedUser = {};

function login()
{
    //get the form object
    var email = document.getElementById("loginEmail").value;
    var pwd = document.getElementById("loginPassword").value;
    // console.log(email);

    fetch('../api/authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { email: email, pwd: pwd } ),
    })
    .then((res) => res.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        //console.log(data);
        loggedUser.token = data.token;
        loggedUser.email = data.email;
        loggedUser.id = data.id;
        loggedUser.self = data.self;
        // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
        document.getElementById("loggedUser").textContent = loggedUser.email;
        //loadLendings();
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

};