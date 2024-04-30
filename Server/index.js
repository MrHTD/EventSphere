const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require('bcrypt');
const multer = require('multer');
const UserModel = require("./User");
const ExpoModel = require("./Expo");
const FloorPlanModel = require("./FloorPlan");
const BoothModel = require("./Booth");
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET;

const app = express()
app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/eventsphere")

app.post("/forget-password", async (req, res) => {
    try {
        const { email } = req.body;
        const oldUser = await UserModel.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User not exists." });
        } else {
            // Generate token with unique secret per user
            const secret = JWT_SECRET + oldUser.password;
            const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
                expiresIn: "5m",
            });
            const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'mughis01@gmail.com',
                    pass: 'nrtb pskk llwl hapv',
                }
            });

            var mailOptions = {
                from: user,
                to: oldUser.email,
                subject: 'Sending Email using Node.js',
                text: link,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            console.log(link);
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.json({ error: "Internal server error." });
    }
});

app.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;

    const oldUser = await UserModel.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User not exists." });
    } else {
        const secret = JWT_SECRET + oldUser.password;
        try {
            const verify = jwt.verify(token, secret);
            res.render("index", { email: verify.email, status: "Not Verified" })
        }
        catch (error) {
            console.log(error);
            res.json("Token is not Verified");
        }
    }
});

app.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await UserModel.findById(id);

    // Ensure user exists
    if (!oldUser) {
        return res.json({ status: "User not exists." });
    }
    else {
        // Concatenate JWT_SECRET and user's password
        const secret = JWT_SECRET + oldUser.password;
        try {
            const verify = jwt.verify(token, secret);

            // Hash the new password
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Update user's password in the database
            await UserModel.updateOne(
                {
                    _id: id,
                },
                {
                    $set: {
                        password: encryptedPassword,
                    }
                },
            );
            // Send success response
            // res.json({ status: "Password Updated" });
            res.render("index", { email: verify.email, status: "Verified" });
        } catch (error) {
            console.error(error);
            res.json("Something went wrong");
        }
    }
});

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

app.get("/getUserbyid/:id", (req, res) => {
    const id = req.params.id
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(error => res.json(error))
})

app.get("/getUser", (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(error => res.json(error))
})

app.put("/edituser/:id", (req, res) => {
    const id = req.params.id;
    const { username } = req.body;
    UserModel.findByIdAndUpdate({ _id: id }, { $set: { username: username } })
        .then(users => res.json(users))
        .catch(error => res.json(error))
})

// Expo Management
app.post('/addexpoevent', (req, res) => {
    ExpoModel.create(req.body)
        .then(expos => res.json(expos))
        .catch(error => res.json(error))
});

app.get("/getexpoeventsbyid/:id", (req, res) => {
    const id = req.params.id;
    ExpoModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
        .then(expos => res.json(expos))
        .catch(error => res.json(error))
})

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

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email });

        // If the user doesn't exist, respond with an error
        if (!user) {
            return res.json({ status: 'Usernotfound' });
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                return res.json({ user });
            } else {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(3000, () => {
    console.log("Server is running port 3000....");
})