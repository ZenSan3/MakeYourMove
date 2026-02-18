import express from 'express';
import path from 'path'
import 'dotenv/config';
import stations from './stations.js';
import users from './users.js';
import routes from './routes.js';
import authentication from './autentication.js';
import tokenChecker from './tokenChecker.js';
import { fileURLToPath } from 'url';

var app = express();
app.use(express.json());
const port = process.env.Port;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../static")));

//Path to authenticate
app.use('/api/authentication', authentication);

//Paths that are protected by the authentication
app.use('/api/users', tokenChecker);
app.use('/api/routes', tokenChecker);
app.use('/api/users', users);
app.use('/api/routes', routes);

//Paths that are not protected by the authentication
app.use('/api/stations', stations);

app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)
});

export default app;