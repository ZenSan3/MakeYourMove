import express from 'express';
import 'dotenv/config';
import stations from './stations.js';
import users from './users.js';
import routes from './routes.js';
import authentication from './autentication.js';
import tokenChecker from './tokenChecker.js';

var app = express();
app.use(express.json());
const port = process.env.Port;

//Path to authenticate
app.use('/api/authentication', authentication);

//Paths that are protected by the authentication
app.use('/api/users', tokenChecker);
app.use('/api/routes', tokenChecker);

//Paths that are not protected by the authentication
app.use('/api/stations', stations);
app.use('/api/users', users);
app.use('/api/routes', routes);

app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)
});