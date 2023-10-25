const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/users");
const mongoConnection = require("./db");
require('dotenv').config()


const app = express();

// Add this middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());





// Define a route for the root URL
app.post('/', (req, res) => {
    const apiData = req.body;
    if (apiData.controller === 'products' && apiData.action === 'saveProduct') {
        // console.log({apiData})


    }
    if (apiData.action === 'login') {
        User.findOne(
            {
                email: apiData.email,
                password: apiData.password
            }
        ).then((user) => {
            if (user) {
                res.send(user);
            } else {
                res.status(404).send('Invalid credentials');
            }
        }).catch((err) => {
            console.error('Error while searching for a user:', err);
            res.status(500).send('Internal Server Error');
        });
    }
    else if (apiData.action === "Register") {
        User.findOne({
            userName: apiData.userName,
            email: apiData.email
        }).then((user) => {
            if (user !== null) {
                res.send('userName or email is already registered')
            }
            else {
                const newUser = new User(
                    {
                        userName: apiData.userName,
                        password: apiData.password,
                        email: apiData.email,
                    }
                )
                newUser.save().then(
                    async (newUser) => {
                        res.send('Welcome ' + newUser.userName + ' you have been successfully registered!')
                    }
                )
            }

        })
    }
    else if (apiData.action === 'updateUser') {
        console.log(apiData)
        User.updateOne({
            _id: apiData.userId
        },
            {
                $set: apiData
            }
        ).then(
            (resp) => {
                if (resp.modifiedCount === 1) { res.send('Your profile has been successfully updated') }
                else { res.send('No record has been updated') }
            }
        )
    }
    // else if(apiData.action === "deleteUser"){
    //     User.deleteOne({
    //        _id: apiData.userId
    //     }).then((resp)=>{
    //         if(resp.deletedCount===1)

    //         res.send('Sorry to see you leave, you can always register as a new user')

    //     else res.send('No record has been deleted')
    // })
    // }
    else {
        res.status(400).send('Invalid action');
    }

});

// Start the server
app.listen(process.env.PORT, () => {
    mongoConnection()
    console.log(`Server is listening on port ${process.env.PORT}`);
});
