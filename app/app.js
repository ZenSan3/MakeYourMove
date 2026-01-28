import express from 'express';
import stations from './stations.js';

const app = express();
const port = 8080;


app.use('/api/stations', stations);

app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)
});