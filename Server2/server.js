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
const axios = require('axios');
const userControllers = require('./controllers/usersControllers');
const session = require('express-session');



const server = express();

server.use(cors({
    origin: ['http://localhost:3030','http://localhost:5174','http://localhost:5173'],
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

// server.use(session({
//   secret: 'your_secret_key', // סוד להצפנת ה-Session ID
//   resave: false,
//   saveUninitialized: false,
//   cookie: { 
//       secure: false, // הגדר ל-true אם אתה משתמש ב-HTTPS
//       path: '/',
//   }
// }));

server.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    credentials: true,
      secure: false, 
      path: '/',
      maxAge: 24 * 60 * 60 * 1000 
  }
}));

server.use('/login/:userId', async (req, res, next) => {
//
  const id = req.params.userId;
  const password = req.body.password;
   console.log(`id=${id} password=${password}`);
  try {
    req.params.id=id;
      const profileResult = await userControllers.getProfile(req, res, next);
      req.session.profile = profileResult.profile;
      next();
  } catch (err) {
      console.error('Error fetching user profile:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Session middleware (unchanged)


// Authorization middleware
function authMiddleware(req, res, next) {
  console.log(req.session);
  console.log("authMiddleware");
  // Check if the request is for the login route
  console.log("iii");
  console.log(req.session);
  if (req.path.startsWith('/login')) {
    console.log("1");
      return next(); // Allow login requests to proceed
  }

  if (req.session.profile!=0&&req.session.profile!=1) {//***************8 */
    console.log("2");
      return res.status(401).json({ error: 'Unauthorized' });
  }
  next(); 
}

// הגדרת הראוטרים לאחר חיבור ל-MongoDB
server.use('/appointments', authMiddleware, appointmentsRouter); 
server.use('/inquiries', authMiddleware, inquiriesRouter);
//server.use('/medicalfile', medicalfileRouter); 
server.use('/users', usersRouter);
 server.use('/login', loginRouter);



server.listen(port, host, () => {
    console.log(`listening to requests at http://${host}:${port}`)});

