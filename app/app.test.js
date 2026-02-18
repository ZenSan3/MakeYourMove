import request from 'supertest';
import 'dotenv/config'; 
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import app from './app.js';

const url = process.env.API

test('app module shoud be defined', ()=>{
    expect(app).toBeDefined;
})

test('GET / should return 200', ()=>{
    return request(app).get('/').expect(200);
})

test('GET /api/users should return 401 (without authentication)', async ()=>{
    expect.assertions(1);
    expect((await fetch(url + 'users/')).status).toEqual(401);
});