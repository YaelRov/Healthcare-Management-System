// const express = require('express');
// const db = require('../DB/DalUsers');
// const bcrypt = require('bcrypt');
// const router = express.Router();

// // POST endpoint to authenticate user
// router.post('/login', async (req, res) => {
//   try {
//     const { username, website, password } = req.body;
//     if (!username || !website || !password) {
//       return res.status(400).json({ error: 'Username, website, and password are required' });
//     }

//     const [rows] = await db.getUserToLogin(username);

//     if (rows.length === 1) {
//       const isMatch = await bcrypt.compare(password, rows[0].password_hash);

//       if (isMatch) {
//         // User found, return user data
//         res.json(rows[0]);
//       } else {
//         // Passwords do not match
//         res.status(401).json({ error: 'Invalid credentials' });
//       }
//     } else {
//       // User not found
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error('Error authenticating user:', error);
//     res.status(500).json({ error: 'Failed to authenticate user' });
//   }
// });

// // POST endpoint for signup
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, username, email, address, phone, website, company, password } = req.body;
//     if (!name || !username || !email || !address || !phone || !website || !company || !password) {
//       return res.status(400).json({ error: 'All user details including password are required for signup' });
//     }

//     // Hash the password before saving it
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = {
//       name,
//       username,
//       email,
//       address,
//       phone,
//       website,
//       company,
//       password: hashedPassword // Save the hashed password
//     };

//     await db.addNewUser(newUser);

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Error signing up user:', error);
//     res.status(500).json({ error: 'Failed to sign up user' });
//   }
// });

// module.exports = router;
