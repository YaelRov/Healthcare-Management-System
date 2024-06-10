require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const inquiriesRouter = require('./routers/inquiriesRouters');
const usersRouter = require('./routers/usersRouters');
const loginRouter=require('./routers/loginRouter')
const appointmentsRouter = require('./routers/appointmentsRouters');
const { create, update } = require('./dataAccess/inquiriesAccess');
//const medicalfileRouter = require('./routers/medicalfilesRouters');
console.log('Environment variables:', process.env);
const host = process.env.HOST;
console.log(process.env.HOST)
console.log(host)
const port = process.env.PORT;
console.log(process.env.HOST)
console.log(host)
const mongoUrl = process.env.MONGODB_URL; // Your MongoDB connection URL

const server = express();

server.use(cors({
    origin: 'http://localhost:3030',
    methods: ['GET', 'PUT','POST',  'DELETE','CREATE','UPDATE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Connect to MongoDB
let db;

async function connectToMongoDB() {
    const client = new MongoClient(mongoUrl);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db('Clinic');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToMongoDB();

server.use(express.json());

// הגדרת הראוטרים לאחר חיבור ל-MongoDB
server.use('/inquiries', inquiriesRouter);
server.use('/appointments', appointmentsRouter);
//server.use('/medicalfile', medicalfileRouter); 
server.use('/users', usersRouter);
 server.use('/login', loginRouter);



server.listen(port, host, () => {
    console.log(`listening to requests at http://${host}:${port}`);
})


