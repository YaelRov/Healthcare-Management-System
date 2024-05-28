const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient } = require('mongodb');
import inquiriesRouter from './routers/inquiriesRouters';
import usersRouter from './routers/usersRouters';
import appointmentsRouter from './routers/appointmentsRouters';
//import medicalfileRouter from './routers/medicalfilesRouters';

// const inquiriesRouter = require('./Routers/inquiries');
// const appointmentsRouter = require('./Routers/appointments');
// const medicalfileRouter = require('./Routers/medicalfile');
// const usersRouter = require('./Routers/users');

const host = process.env.HOST;
const port = process.env.PORT;
const mongoUrl = process.env.MONGODB_URL; // Your MongoDB connection URL

const server = express();

server.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Connect to MongoDB
let db;

async function connectToMongoDB() {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongoDB();

server.use(express.json());

server.use('/inquiries', inquiriesRouter(db)); // Pass MongoDB instance to routers
server.use('/appointments', appointmentsRouter(db)); // Pass MongoDB instance to routers
// server.use('/medicalfile', medicalfileRouter(db)); // Pass MongoDB instance to routers
server.use('/login', usersRouter(db)); // Pass MongoDB instance to routers

server.listen(port, host, () => {
    console.log(`listening to requests at http://${host}:${port}`);
});