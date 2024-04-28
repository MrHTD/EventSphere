const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require('bcryptjs-react');
const multer = require('multer');
const UserModel = require("./User");
const ExpoModel = require("./Expo");
const FloorPlanModel = require("./FloorPlan");
const BoothModel = require("./Booth");

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/eventsphere")

// Registration endpoint


app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Check if the username or email already exists in the database
    UserModel.findOne({ $or: [{ username }, { email }] })
        .then(existingUser => {
            if (existingUser) {
                // User with the same username or email already exists
                res.json({ exists: true });
            } else {
                UserModel.create(req.body)
                    .then(users => {
                        // Send success response
                        res.json(users);
                    })
                    .catch(error => res.json(error));
            }
        })
        .catch(error => res.json(error));

});


// Expo Management
app.post('/addexpoevent', (req, res) => {
    ExpoModel.create(req.body)
        .then(expos => res.json(expos))
        .catch(error => res.json(error))
});

app.get("/getexpoevents", (req, res) => {
    ExpoModel.find({})
        .then(expos => res.json(expos))
        .catch(error => res.json(error))
})

app.put("/editexpoevent/:id", (req, res) => {
    const id = req.params.id;
    ExpoModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
        .then(expos => res.json(expos))
        .catch(error => res.json(error))
})

app.delete("/deleteexpoevent/:id", (req, res) => {
    const id = req.params.id;
    ExpoModel.findByIdAndDelete({ _id: id })
        .then(expos => res.json(expos))
        .catch(error => res.json(error))
})

app.post('/addfloorplan', (req, res) => {
    FloorPlanModel.create(req.body)
        .then(floorplans => res.json(floorplans))
        .catch(error => res.json(error))
});

app.get("/getfloorplans", (req, res) => {
    FloorPlanModel.find({})
        .then(floorplans => res.json(floorplans))
        .catch(error => res.json(error))
})

app.put("/editfloorplan/:id", (req, res) => {
    const id = req.params.id;
    FloorPlanModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
        .then(floorplans => res.json(floorplans))
        .catch(error => res.json(error))
})

app.delete("/deletefloorplan/:id", (req, res) => {
    const id = req.params.id;
    FloorPlanModel.findByIdAndDelete({ _id: id })
        .then(floorplans => res.json(floorplans))
        .catch(error => res.json(error))
})

app.post('/addbooth', (req, res) => {
    BoothModel.create(req.body)
        .then(booths => res.json(booths))
        .catch(error => res.json(error))
});

app.get("/getbooths", (req, res) => {
    BoothModel.find({})
        .then(booths => res.json(booths))
        .catch(error => res.json(error))
})

app.put("/editbooth/:id", (req, res) => {
    const id = req.params.id;
    BoothModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
        .then(booths => res.json(booths))
        .catch(error => res.json(error))
})

app.delete("/deletebooth/:id", (req, res) => {
    const id = req.params.id;
    BoothModel.findByIdAndDelete({ _id: id })
        .then(booths => res.json(booths))
        .catch(error => res.json(error))
})

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