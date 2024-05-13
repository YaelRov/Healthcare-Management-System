const express = require('express');
require('dotenv').config();
const cors = require('cors');
const inquiriesRouter = require('./Routers/inquiries');
const appointmentsRouter = require('./Routers/appointments');
const medicalfileRouter = require('./Routers/medicalfile');
const loginRouter = require('./Routers/login');

//const init = require('./initialization');

const host = process.env.HOST;
const port = process.env.PORT;
const server = express();



server.use(cors({
    origin: 'http://localhost:3306',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


//get parameter to check if to call c
async function Start() { if (true) await init(); }
//Start();

server.use(express.json());

server.use('/inquiries', inquiriesRouter);
server.use('/appointments', appointmentsRouter);
server.use('/medicalfile', medicalfileRouter);
server.use('/login', loginRouter);


server.listen(port, host, () => {
    console.log(`listening to requests at http://${host}:${port}`);
});
