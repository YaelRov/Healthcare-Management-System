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

const server = express();

const host = process.env.HOST;
const port = process.env.PORT;
const mongoUrl = process.env.MONGODB_URL;

server.use(cors({
  origin: ['http://localhost:3030', 'http://localhost:5174', 'http://localhost:5173'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'CREATE', 'UPDATE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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

server.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    secure: false, 
    path: '/',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Login route
server.post('/login/:userId', async (req, res) => {
  const id = req.params.userId;
  const password = req.body.password;
  console.log(`userId=${id} password=${password}`);
  try {
    req.params.id = id;
    const profileResult = await userControllers.getProfile(req, res);
    if (profileResult && profileResult.profile) {
      req.session.profile = profileResult.profile;
      res.status(200).json({ message: 'Login successful', profile: profileResult.profile });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Authorization middleware
function authMiddleware(req, res, next) {
  console.log(req.session);
  console.log("authMiddleware");

  if (req.path === '/login' || req.path.startsWith('/login/')) {
    return next(); // Allow login requests to proceed
  }

  if (!req.session.profile) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next(); 
}

// Use authorization middleware for protected routes
server.use('/appointments', authMiddleware, appointmentsRouter); 
server.use('/inquiries', authMiddleware, inquiriesRouter);
server.use('/users', authMiddleware, usersRouter);
server.use('/login', loginRouter);

server.listen(port, host, () => {
  console.log(`listening to requests at http://${host}:${port}`);
});
