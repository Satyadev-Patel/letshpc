const express = require("express");
const User = require("../Models/Users");
const errors = require("restify-errors");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const dotnev = require("dotenv");

// Load Config
dotnev.config({ path: "./config/config.env" });

router.post("/login", passport.authenticate("local"), (req, res, next) => {
    console.log("HELLO")
    const obj = {
        msg: "success",
        user: req.user,
    };
    res.send(obj);
    next();
});

router.post("/register", (req, res, next) => {
    if (!req.is("application/json")) {
        return next(new errors.InvalidContentError("Expects 'application/json'"));
    }
    try {
        const data = req.body;
        User.count({}).then((totalSize) => {
            if (totalSize === 1) {
                res.send("Only 1 admin allowed!");
            }
            else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(data["password"], salt, (err, hash) => {
                        if (err) throw err;
                        data["password"] = hash;
                        User.create(data).then(() => {
                            res.sendStatus(201);
                        });
                    });
                });
            }
        });
    } catch (err) {
        res.render("error/500");
    }
});

module.exports = router;