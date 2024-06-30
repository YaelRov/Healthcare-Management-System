require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const session = require('express-session');
const inquiriesRouter = require('./routers/inquiriesRouters');
const usersRouter = require('./routers/usersRouters');
const loginRouter = require('./routers/loginRouter');
const appointmentsRouter = require('./routers/appointmentsRouters');
const userControllers = require('./controllers/usersControllers');
const loginControllers = require('./controllers/loginControllers'); // Import loginControllers
const server = express();

const host = process.env.HOST;
const port = process.env.PORT;
const mongoUrl = process.env.MONGODB_URL;

server.use(cors({
  origin: ['http://localhost:3030', 'http://localhost:5174', 'http://localhost:5173'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'CREATE', 'UPDATE'],
  allowedHeaders: ['Content-Type', 'Authorization','user-id'],
  credentials: true 
}));

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
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { 
//     httpOnly: true,
//     secure: false, 
//     path: '/',
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//      sameSite: 'lax'
//   }
// }));


server.use(session({
  secret: '9e8f423b7a2c5d6e8f9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f',
  resave: false,
  saveUninitialized: false,
  cookie: { 
      httpOnly: true,
      secure: false, // שנה ל-true אם את משתמשת ב-HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 שעות
  }
}))

// Login route
server.post('/login/:userId', async (req, res) => {
  const id = req.params.userId;
  const password = req.body.password;
  console.log(`userId=${id} password=${password}`);
  try {
    req.params.id = id;
    const result = await loginControllers.getByUserId(req, res); // Use loginControllers to handle login
    console.log(`result=${result}`);
    // if (result.success) {
    //   req.session.profile = result.user.profile;
    //   res.status(200).json({ message: 'Login successful', user: result.user, success:result.success });
    if (result.success) {
      req.session.profile = result.user.profile; // שמירת profile ב-session
      res.status(200).json({ message: 'Login successful', user: result.user, success: result.success })
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Authorization middleware
// function authMiddleware(req, res, next) {
//   const id = req.params.userId;
// console.log(`id=${id}`);
//   console.log(req.session);
//   console.log("authMiddleware");

//   if (req.path === '/login' || req.path.startsWith('/login/')) {
//     return next(); // Allow login requests to proceed
//   }
//   console.log(`profile=${JSON.stringify(req.session.profile)}`);
//   // if (req.session.profile==null||req.session.profile==undefined) {
//   //   return res.status(401).json({ error: 'Unauthorized' });
//   // }
//   next(); 
// }

async function authMiddleware(req, res, next) {
  console.log(req.session);
  console.log("authMiddleware");

  if (req.path === '/login' || req.path.startsWith('/login/')) {
    return next(); // Allow login requests to proceed
  }

  if (req.session.profile == null || req.session.profile == undefined) {
    // Try to get userId from sessionStorage (on the frontend)
    const userId = req.headers['user-id']; // Get the userId from the header
    console.log(`id=${userId}`);

    if (userId) {
      // Fetch user profile from the database
      const result = await userControllers.getProfile({ params: { userId: userId } });
      if (result.profile!=null&&result.profile!=undefined) {
        req.session.profile = result.profile;
        return next();
      }
    }
  } else {
    // User is already authenticated
    return next();
  }

  // If all else fails, return unauthorized
  return res.status(401).json({ error: 'Unauthorized' });
}


// Use authorization middleware for protected routes
server.use('/appointments', authMiddleware, appointmentsRouter); 
server.use('/inquiries', authMiddleware, inquiriesRouter);
server.use('/users', authMiddleware, usersRouter);
server.use('/login', loginRouter);

server.listen(port, host, () => {
  console.log(`listening to requests at http://${host}:${port}`);
});

