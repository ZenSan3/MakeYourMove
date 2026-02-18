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
        loggedUser.id = data.id;
        loggedUser.self = data.self;
        // loggedUser.id = loggedUser.self.substring(loggedUser.self.lastIndexOf('/') + 1);
        document.getElementById("loggedUser").textContent = loggedUser.email;

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
    
    let ul = document.getElementById("Stazioni");
    let div = document.getElementsByClassName("UserBase");

    fetch(url + 'stations')
    .then((res) => res.json())
    .then(function(data){
        data.forEach(element => {
            console.log(element);
            
            let li = document.createElement('li');
            let span = document.createElement('span');
            let a = document.createElement('a');
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
                let li = document.createElement('li');
                let span = document.createElement('span');
                let user = document.createElement('a');
                let stationA = document.createElement('p');
                let stationB = document.createElement('p');
                let departure = document.createElement('p');
                let status = document.createElement('p');
                let div = document.createElement('div');
                let approve = document.createElement('button');
                let decline = document.createElement('button');
                
                approve.type = "button";
                approve.onclick = function(){fetch(url + 'routes/' + element._id, {
                    method: "POST",
                    headers: {"x-access-token": loggedUser.token, 'Content-Type': 'application/json'},
                    body: JSON.stringify({status: "Approved"})
                });}
                approve.textContent = "Approva";

                decline.type = "button";
                decline.onclick = function(){fetch(url + 'routes/' + element._id, {
                    method: "POST",
                    headers: {"x-access-token": loggedUser.token, 'Content-Type': 'application/json'},
                    body: JSON.stringify({status: "Declined"})
                });}
                decline.textContent = "Declina";

                user.textContent = "User: " + element.user;
                stationA.textContent = "StationA: " + element.stationA;
                stationB.textContent = "StationB: " + element.stationB;
                departure.textContent = "Departure: " + element.dateOfDeparture;
                status.textContent = "Status: " + element.status;

                div.appendChild(accept);
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

                let li = document.createElement('li');
                let span = document.createElement('span');
                let text = document.createElement('a');
    
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
    })
}

function loadLendings() {

    const ul = document.getElementById('bookLendings'); // Get the list where we will place our lendings

    ul.innerHTML = '';

    fetch('../api/v1/booklendings?studentId=' + loggedUser.id + '&token=' + loggedUser.token)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        
        console.log(data);
        
        return data.map( (entry) => { // Map through the results and for each run the code below
            
            // let bookId = book.self.substring(book.self.lastIndexOf('/') + 1);
            
            let li = document.createElement('li');
            let span = document.createElement('span');
            // span.innerHTML = `<a href="${entry.self}">${entry.book}</a>`;
            let a = document.createElement('a');
            a.href = entry.self
            a.textContent = entry.book.title;
            
            // Append all our elements
            span.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) );// If there is any error you will catch them here
    
}