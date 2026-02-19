var loggedUser = {};
const url = "https://makeyourmove.onrender.com/api/";

function createUser(){
    var usernameC = document.getElementById("createUsername").value;
    var emailC = document.getElementById("createEmail").value;
    var pwdC = document.getElementById("createPassword").value;

    fetch(url + 'authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: "creator.creator@gmail.com", pwd: "create" })
    })
    .then((res) => res.json())
    .then(function(data) {
        fetch(url + 'users', {
        method: 'POST',
        headers: { 'x-access-token': data.token, 'Content-Type': 'application/json' },
        body: JSON.stringify({
                username: usernameC, 
                email: emailC,
                pwd: pwdC
            })
        })
        document.getElementById("Creation").textContent ="Utente Registrato";
    });
};

function login()
{
    if(!loggedUser.token){
        //get the form object
        var email = document.getElementById("loginEmail").value;
        var pwd = document.getElementById("loginPassword").value;
        console.log(email);
        console.log(pwd);
    
        fetch(url + 'authentication', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, pwd: pwd })
        })
        .then((res) => res.json())
        .then(function(data) { // Here you get the data to modify as you please
            console.log(data);
            //console.log(data.token);
            loggedUser.token = data.token;
            loggedUser.email = data.email;
            loggedUser.user = data.user;
            loggedUser.id = data.id;
            loggedUser.self = data.self;
            // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
            document.getElementById("loggedUser").textContent = loggedUser.user;
    
            switch (data.role) {
                case "Operator":
                    baseUser();
                    operator();
                    break;
                case "Admin":
                    baseUser();
                    operator();
                    admin();
                    break;
                default: baseUser(); break;
            }
            return;
        })
        .catch( error => console.error(error) ); // If there is any error you will catch them here
    }
};

function baseUser(){
    
    var ul = document.getElementById("Stazioni");
    var div = document.getElementsByClassName("UserBase");
    var request = document.getElementById("rRoot");
    request.style = "visibility:visible";

    fetch(url + 'stations')
    .then((res) => res.json())
    .then(function(data){
        data.forEach(element => {
            console.log(element);
            
            var li = document.createElement('li');
            var span = document.createElement('span');
            var a = document.createElement('a');
            a.textContent = element.name;
            
            // Append all our elements
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        });
    })
}

function operator(){
    var operator = document.getElementById("Operator");
    var req = document.createElement('ul');
    var stat = document.createElement('ul');
    var mainR = document.createElement('h2');
    var mainS =  document.createElement('h2');
    mainR.textContent = "Tratte Richieste";
    mainS.textContent = "Statistiche";


    fetch(url + 'routes', {method: "GET", headers: {"x-access-token": loggedUser.token}})
    .then((res) => res.json())
    .then(function(data){
        data.forEach(element =>{
            console.log(element);
            if(element.status == "Pending"){
                var li = document.createElement('li');
                var span = document.createElement('span');
                var user = document.createElement('a');
                var stationA = document.createElement('p');
                var stationB = document.createElement('p');
                var departure = document.createElement('p');
                var status = document.createElement('p');
                var div = document.createElement('div');
                var approve = document.createElement('button');
                var decline = document.createElement('button');
                
                approve.type = "button";
                approve.onclick = function(){fetch(url + 'routes/' + element._id, {
                    method: "POST",
                    headers: {"x-access-token": loggedUser.token, 'Content-Type': 'application/json'},
                    body: JSON.stringify({status: "Approved"})
                });};
                approve.textContent = "Approva";

                decline.type = "button";
                decline.onclick = function(){fetch(url + 'routes/' + element._id, {
                    method: "POST",
                    headers: {"x-access-token": loggedUser.token, 'Content-Type': 'application/json'},
                    body: JSON.stringify({status: "Declined"})
                });};
                decline.textContent = "Declina";

                user.textContent = "User: " + element.user;
                stationA.textContent = "StationA: " + element.stationA;
                stationB.textContent = "StationB: " + element.stationB;
                departure.textContent = "Departure: " + element.dateOfDeparture;
                status.textContent = "Status: " + element.status;

                div.appendChild(approve);
                div.appendChild(decline);
                span.appendChild(user);
                span.appendChild(stationA);
                span.appendChild(stationB);
                span.appendChild(departure);
                span.appendChild(status);
                span.append(div);
                li.appendChild(span);
                req.appendChild(li);            
            }
        })
    });
    operator.appendChild(mainR);
    operator.appendChild(req);
    operator.appendChild(mainS);

    fetch(url + 'users', {method: "GET", headers: {"x-access-token": loggedUser.token}})
    .then((res) => res.json())
    .then(function(users){
        users.forEach(user => {
            fetch(url + 'routes/'+user.username, {method: "GET", headers: {"x-access-token": loggedUser.token}})
            .then((res) => res.json())
            .then(function(data){
                console.log(data);

                var li = document.createElement('li');
                var span = document.createElement('span');
                var text = document.createElement('a');
    
                text.textContent = user.username + ": " + data.length;
                span.appendChild(text);
                li.appendChild(span);
                stat.appendChild(li);  
            });
        });
    })
    operator.appendChild(stat);

}

function admin(){

    var stazioni = document.getElementById("nStations");
    stazioni.style = "visibility:visible";

    var name = document.getElementById("stationName").value;
    var address = document.getElementById("stationAddress").value;
    var city = document.getElementById("stationCity").value;
    var CAP = document.getElementById("stationCAP").value;

    /*fetch(url + 'routes/' + element._id, {
        method: "POST",
        headers: { "x-access-token": loggedUser.token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: "Approved" })})*/

    //fetch to insert a new station
    fetch(url + 'stations/', {
        method: 'POST',
        headers: { "x-access-token": loggedUser.token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, address: address, city: city, CAP: CAP })
    });

    var us = document.getElementById("Users");
    var h2 = document.createElement("h2");
    var ul = document.createElement("ul");
    h2.textContent = "Utenti";

    fetch(url + 'users', {
        method: 'GET',
        headers: { "x-access-token": loggedUser.token}}
    ).then((res)=>res.json())
    .then(function(data){
        console.log(data);
        data.forEach(element => {
            var li = document.createElement("li");
            var div = document.createElement("div");
            var span = document.createElement("span");
            var username = document.createElement("a");
            var email = document.createElement("p");
            var role = document.createElement("p");
            var del = document.createElement("button");

            username.textContent = "Username: " + element.username;
            email.textContent = "Email: " + element.email;
            role.textContent = "Ruolo: " + element.role; 

            del.type = "button";
            del.onclick = function(){fetch(url + 'users/'+element.email, {
                method: "DELETE",
                headers: {"x-access-token": loggedUser.token, 'Content-Type': 'application/json'},
            });};
            del.textContent = "Elimina Account";

            div.appendChild(del);
            span.appendChild(username);
            span.appendChild(email);
            span.appendChild(role);
            span.appendChild(div);
            li.appendChild(span);
            ul.appendChild(li);
        });
    });
    us.appendChild(h2);
    us.appendChild(ul);
}

function sendRoute(){
    var stationA = document.getElementById("routeA").value;
    var stationB = document.getElementById("routeB").value;
    var dateOfDeparture = document.getElementById("routeDate").value;

    fetch(url + 'routes/', {
        method: 'POST',
        headers: { "x-access-token": loggedUser.token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: loggedUser.user, stationA: stationA, stationB: stationB, dateOfDeparture: dateOfDeparture })
    });
}