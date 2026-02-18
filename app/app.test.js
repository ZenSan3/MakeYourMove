import request from 'supertest';
import 'dotenv/config'; 
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import app from './app.js';
import { type } from 'os';

const url = process.env.API
let userToken;

test('app module shoud be defined', ()=>{
    expect(app).toBeDefined;
})

test('GET / should return 200', ()=>{
    return request(app).get('/').expect(200);
})

test('GET in users and routes should return 401 (without authentication)', async ()=>{
    expect.assertions(2);
    expect((await fetch(url + 'users', {method: "GET", headers: {"x-access-token": "sbagliato"}})).status).toEqual(403);
    expect((await fetch(url + 'routes', {method: "GET", headers: {"x-access-token": "sbagliato"}})).status).toEqual(403);
});

test('GET in users and routes should return 403 (with wrong token)', async ()=>{
    expect.assertions(2);
    expect((await fetch(url + 'users')).status).toEqual(401);
    expect((await fetch(url + 'routes')).status).toEqual(401);
});


test('Can be authenticated', async ()=>{
    expect.assertions(1);
    expect(( await fetch( url+'authentication',
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify({
                    email: "test.test@gmail.com",
                    pwd: "passwordTest"
                }),
            }
        )).status
    ).toEqual(200);

    await fetch( url+'authentication',
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({
                email: "test.test@gmail.com",
                pwd: "passwordTest"
            }),
        }
    ).then((res) => res.json())
    .then(function(data){
        userToken = data.token;
    });

})

test('GET in users and routes should return 200 (with authentication)', async ()=>{
    expect.assertions(2);
    expect((await fetch(url + 'users', {method: "GET", headers: {"x-access-token": userToken}})).status).toEqual(200);
    expect((await fetch(url + 'routes', {method: "GET", headers: {"x-access-token": userToken}})).status).toEqual(200);
});