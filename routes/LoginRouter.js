var express = require("express");
var router = express.Router();
var firebase = require("firebase/app");
const jwt = require("jsonwebtoken");
const app = require("../fire");
const db = firebase.firestore(app);

const MAXAGE = 10 * 60 * 60 * 24;

const getToken = (id) => {
  return jwt.sign({ id }, process.env.SESSION_SECRET, {
    expiresIn: MAXAGE,
  });
};

router
  .get("/", function (req, res, next) {
    console.log("get req at login");
  })

  .post("/", (req, res, next) => {
    let { email, password } = req.body;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var uid = userCredential.user.uid;
        const token = getToken(uid);
        res.status(200).send({ token });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.send({ errorMessage });
      });
  });

module.exports = router;
