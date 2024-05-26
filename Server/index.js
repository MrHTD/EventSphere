const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require('bcrypt');
const multer = require('multer');
const cron = require('node-cron');
const axios = require('axios');
const UserModel = require("./User");
const ExpoModel = require("./Expo");
const FloorPlanModel = require("./FloorPlan");
const SessionModel = require("./Models/Session");
const { BoothModel, ExpoBoothAllocationModel } = require("./Booth");
const MockAdapter = require('axios-mock-adapter');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const ExpoRegistrationModel = require("./Models/ExpoRegistration");
const {Message, ExhibitorMessage} = require("./Models/Message");

const JWT_SECRET = process.env.JWT_SECRET;

const app = express()
app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use("/Uploads", express.static("Uploads"));

mongoose.connect("mongodb://localhost:27017/eventsphere");

// Chat Api's
app.get("/api/messages", (req, res) => {
    Message.find({})
        .then(Message => res.json(Message))
        .catch(error => res.json(error))
});

app.post('/api/postmessages', (req, res) => {
    Message.create(req.body)
        .then(Message => res.json(Message))
        .catch(error => res.json(error))
});

app.get("/api/getmessagesbyid/:id", (req, res) => {
    const userId = req.params.id;
    Message.find({ userId: userId })
        .then(Message => res.json(Message))
        .catch(error => res.status(400).json(error));
});

app.get("/api/exhibitormessages", (req, res) => {
    ExhibitorMessage.find({})
        .then(ExhibitorMessage => res.json(ExhibitorMessage))
        .catch(error => res.json(error))
});

app.post('/api/postexhibitormessages', (req, res) => {
    ExhibitorMessage.create(req.body)
        .then(ExhibitorMessage => res.json(ExhibitorMessage))
        .catch(error => res.json(error))
});

app.get("/api/exhibitormessagesbyid/:id", (req, res) => {
    const senderId = req.params.id;
    ExhibitorMessage.find({ senderId: senderId })
        .then(ExhibitorMessage => res.json(ExhibitorMessage))
        .catch(error => res.status(400).json(error));
});
// ----------------

app.post("/forget-password", async (req, res) => {
    try {
        const { email } = req.body;
        const oldUser = await UserModel.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User not exists." });
        } else {
            console.log("User exists.");
            // Generate token with unique secret per user
            const secret = JWT_SECRET + oldUser.password;
            const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
                expiresIn: "5m",
            });
            const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'mughisuddinahmed@gmail.com',
                    pass: 'pimq iyzh rwhl eyfm',
                }
            });
            const user = 'EventSphere <mughisuddinahmed@gmail.com>';

            var mailOptions = {
                from: user,
                to: oldUser.email,
                subject: 'Your Password Reset Link: ',
                text: link,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            console.log(res.json({ status: "User exists." }));
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
            res.render("index", { email: verify.email, status: "Verified" });
        } catch (error) {
            console.error(error);
            res.json("Something went wrong");
        }
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });

// Registration endpoint
app.post('/register', upload.single('image'), (req, res) => {

    const { username, email, password } = req.body;

    // Check if the username or email already exists in the database
    UserModel.findOne({ $or: [{ username }, { email }] })
        .then(existingUser => {
            if (existingUser) {
                // User with the same username or email already exists
                res.json({ exists: true });
            } else {
                const eventData = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                    image: req.file.filename,
                };
                UserModel.create(eventData)
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

app.put("/edituser/:id", upload.single('image'), (req, res) => {
    const id = req.params.id;
    const Data = {
        username: req.body.username,
        image: req.file.filename,
    };

    UserModel.findByIdAndUpdate({ _id: id }, { $set: Data })
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

// BoothAllocations Api

app.post('/addboothAllocation', (req, res) => {
    ExpoBoothAllocationModel.create(req.body)
        .then(boothAllocations => res.json(boothAllocations))
        .catch(error => res.json(error))
});

app.get("/getboothsAllocation", (req, res) => {
    ExpoBoothAllocationModel.find({})
        .then(boothAllocations => res.json(boothAllocations))
        .catch(error => res.json(error))
})

app.put("/editboothAllocation/:id", (req, res) => {
    const id = req.params.id;
    ExpoBoothAllocationModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
        .then(boothAllocations => res.json(boothAllocations))
        .catch(error => res.json(error))
})

app.delete("/deleteboothAllocation/:id", (req, res) => {
    const id = req.params.id;
    ExpoBoothAllocationModel.findByIdAndDelete({ _id: id })
        .then(boothAllocations => res.json(boothAllocations))
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

// Schedule Models
app.post('/createSession', (req, res) => {
    SessionModel.create(req.body)
        .then(sessions => res.json(sessions))
        .catch(error => res.json(error))
});

app.get("/getSession", (req, res) => {
    SessionModel.find({})
        .then(sessions => res.json(sessions))
        .catch(error => res.json(error))
})

app.put("/editSession/:id", (req, res) => {
    const id = req.params.id;
    SessionModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
        .then(sessions => res.json(sessions))
        .catch(error => res.json(error))
})

app.delete("/deleteSession/:id", (req, res) => {
    const id = req.params.id;
    SessionModel.findByIdAndDelete({ _id: id })
        .then(sessions => res.json(sessions))
        .catch(error => res.json(error))
})

// Exhibitor Apis

app.post('/exporegister', (req, res) => {
    ExpoRegistrationModel.create(req.body)
        .then(expoRegistration => res.json(expoRegistration))
        .catch(error => res.status(400).json({ error: error.message }));
});

app.put("/editexporegister/:id", (req, res) => {
    const id = req.params.id;
    ExpoRegistrationModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
        .then(expoRegistration => res.json(expoRegistration))
        .catch(error => res.json(error))
})

app.put("/updateapprovalstatus/:id", (req, res) => {
    const id = req.params.id;
    ExpoRegistrationModel.findByIdAndUpdate({ _id: id }, { $set: { approvalStatus: req.body.approvalStatus } })
        .then(expoRegistration => res.json(expoRegistration))
        .catch(error => res.json(error))
});

app.get("/getregisterexpo", (req, res) => {
    ExpoRegistrationModel.find({})
        .then(expoRegistration => res.json(expoRegistration))
        .catch(error => res.json(error))
})

app.get("/getregisterexpobyid/:id", (req, res) => {
    const id = req.params.id;
    ExpoRegistrationModel.findByIdAndUpdate({ _id: id }, { $set: req.body })
        .then(expoRegistration => res.json(expoRegistration))
        .catch(error => res.json(error))
})

app.post('/boothAllocations', (req, res) => {
    ExpoBoothAllocationModel.create(req.body)
        .then(boothAllocations => res.json(boothAllocations))
        .catch(error => res.status(400).json({ error: error.message }));
});

app.get("/getboothAllocations", (req, res) => {
    ExpoBoothAllocationModel.find({})
        .then(boothAllocations => res.json(boothAllocations))
        .catch(error => res.json(error))
})

app.post("/addboothreservespace", (req, res) => {
    const { boothId, reservedSpaces } = req.body;

    BoothModel.findById(boothId)
        .then(booth => {
            if (!booth) {
                res.status(404).json({ error: "Booth not found" });
                return;
            }

            // Update reservedSpaces field
            booth.reservedSpaces = reservedSpaces;

            // Save the updated booth
            return booth.save();
        })
        .then(updatedBooth => {
            res.status(200).json({ message: "Booth updated successfully", booth: updatedBooth });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        });
});


// Scheduling of Event Status
app.post('/updateEventStatus', async (req, res) => {
    try {
        // Find events with start date less than or equal to current date and status is not 'ongoing' or 'ended'
        const eventsToUpdate = await ExpoModel.find({
            $or: [
                { status: { $ne: 'upcoming' } },
                { status: { $ne: 'ongoing' } },
                { status: { $ne: 'ended' } }
            ]
        });

        // Update status of events
        eventsToUpdate.forEach(async (event) => {
            // Update event status based on logic
            if (new Date() >= event.startDate && new Date() <= event.endDate) {
                event.status = 'ongoing';
            } else if (new Date() > event.endDate) {
                event.status = 'ended';
            } else if (new Date() < event.startDate) {
                event.status = 'upcoming';
            }
            await event.save(); // Save updated event
        });
        // res.status(200).json({ message: 'Event status updated successfully' });
    } catch (error) {
        console.error('Error updating event statuses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

cron.schedule('* * * * * *', async () => {
    try {
        // Call the endpoint to update event statuses
        await axios.post('http://localhost:3000/updateEventStatus');
        console.log('Event status updated successfully');
    } catch (error) {
        console.error('Error updating event statuses:', error);
    }
});


app.listen(3000, () => {
    console.log("Server is running port 3000....");
})