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
    const div = document.getElementById('Operator');
    
    fetch(url + 'routes', {method: "GET", headers: {"x-access-token": loggedUser.token}})
    .then((res) => res.json())
    .then(function(data){
        console.log(data);
    });
}

function admin(){

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