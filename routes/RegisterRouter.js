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
    // console.log(req.body);
  })

  .post("/", (req, res, next) => {
    const { email, password, name, institution } = req.body;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var uid = userCredential.user.uid;
        const token = getToken(uid);
        db.collection("users")
          .doc(uid)
          .set({
            name: name,
            email: email,
            institution: institution,
          })
          .then(() => {
            console.log("User Data successfully written!");
            res.status(201).send({ token });
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            res.status(500).send({ errorMessage: "Server Error" });
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        res.send({ errorMessage });
      });
  });

module.exports = router;
