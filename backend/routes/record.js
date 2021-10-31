const express = require("express");

const recordRoutes = express.Router();

const dbo = require("/db/conn");

const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/record/add").post(function (req, res) {
    let db_connect = dbo.getDb();
    let myobj = {
        firstName: req.body.firstName,
        lastName: req.body.LastName,
        Email: req.body.Email,
        phoneNumber: req.body.phoneNumber
    };
    db_connect.collection("Users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});