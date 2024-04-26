const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require('bcryptjs-react');
const multer = require('multer');
const UserModel = require("./User");

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/eventsphere")

// Registration endpoint
app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(error => res.json(error))
});

// // Login endpoint
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(404).send('User not found');
//         }
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return res.status(401).send('Invalid password');
//         }
//         // Authentication successful
//         res.send('Login successful');
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email });

        // If the user doesn't exist, respond with an error
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        try {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                return res.json({ user });
            } else {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Server error.' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(3000, () => {
    console.log("Server is running port 3000....");
})