import express from 'express';
import stations from './stations.js';
import users from './users.js';
import routes from './routes.js';

var app = express();
app.use(express.json());
const port = 8080;


app.use('/api/stations', stations);
app.use('/api/users', users);
app.use('/api/routes', routes);

app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)
});