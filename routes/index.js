var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
var firebase = require("firebase/app");
const app = require("../fire");
const db = firebase.firestore(app);

router.get("/", function (req, res, next) {
  res.send("listening your request ");
});

router.get("/checkAuth", async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    jwt.verify(token, process.env.SESSION_SECRET, async (err, decoded) => {
      if (err) res.send(false);
      const userDocRef = await db.collection("users").doc(decoded.id);
      const doc = await userDocRef.get();
      if (!doc.exists) {
        res.send(false);
      } else {
        res.send(true);
      }
    });
  } catch (err) {
    console.log(err);
    res.send(false);
  }
});

router.put("/addStudent", async (req, res) => {
  const { token, batch, name, phone, id } = req.body;
  try {
    const docRef = await db
      .collection("users")
      .doc(token)
      .collection("batch")
      .doc(batch);
    const doc = await docRef.get();
    if (!doc.exists) {
      res
        .status(404)
        .send({ errorMessage: "Link is Broken, Please Recheck The Link." });
    } else {
      await docRef.update({
        students: firebase.firestore.FieldValue.arrayUnion({
          name,
          phone,
          id,
        }),
      });
      console.log("Successfully student added");
      res.send({ success: true });
    }
  } catch (error) {
    console.log(error.message);
    res.status(501).send({ errorMessage: "Server Error" });
  }
});

module.exports = router;
