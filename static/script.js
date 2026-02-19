var loggedUser = {};
const url = "https://makeyourmove.onrender.com/api/";

function login()
{
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

};

function baseUser(){
    
    var ul = document.getElementById("Stazioni");
    var div = document.getElementsByClassName("UserBase");

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
    const ul = document.getElementById('Request');
    const stat = document.getElementById('Stats');

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
                }).then(()=>{window.Location.reload(true);});}
                approve.textContent = "Approva";

                decline.type = "button";
                decline.onclick = function(){fetch(url + 'routes/' + element._id, {
                    method: "POST",
                    headers: {"x-access-token": loggedUser.token, 'Content-Type': 'application/json'},
                    body: JSON.stringify({status: "Declined"})
                }).then(()=>{window.Location.reload(true);});}
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
                ul.appendChild(li);            
            }
        })
    });

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

}

function admin(){
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
    }).then(()=>{
        window.Location.reload(true);
    });
}

function sendRoute(){
    var stationA = document.getElementById("routeA").value;
    var stationB = document.getElementById("routeB").value;
    var dateOfDeparture = document.getElementById("routeDate").value;

    fetch(url + 'routes/', {
        method: 'POST',
        headers: { "x-access-token": loggedUser.token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: loggedUser.user, stationA: stationA, stationB: stationB, dateOfDeparture: dateOfDeparture })
    }).then(()=>{
        window.Location.reload(true);
    });
}