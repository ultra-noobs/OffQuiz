const express = require("express");
const router = express.Router();
const { authRequired } = require("../middleware/auth");
var firebase = require("firebase/app");
const app = require("../fire");
const db = firebase.firestore(app);
const nodemailer = require("nodemailer");

router.get("/", authRequired, (req, res) => {
  const token = req.token;
  var docRef = db.collection("users").doc(token);
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        res.send(doc.data());
      } else {
        // doc.data() will be undefined in this case
        // this should not be the case if user already registered
        res.status(401).send("User Not Found");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      res.status(500).send("Server Error");
    });
});

router
  .post("/setbatch", authRequired, (req, res) => {
    try {
      const { gmail, batchno } = req.body;
      const token = req.token;
      if (gmail && gmail.trim() !== "") {
        const link = `http://localhost:3000/formRegister/${token}/${batchno}`;
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.email,
            pass: process.env.password,
          },
        });

        var mailOptions = {
          from: process.env.email,
          to: gmail,
          subject: `Please Fill The Form To Join Batch ${batchno}`,
          html: `<p>Hello</p> <p>Click on below link to fill the form to join batch ${batchno}</p> <button style="background-color:#0a1d37;padding:13px; border:none;"><a href=${link} style="font-size:22px;color:white;text-decoration:none;">Click Here</a></button>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error.message);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }
      db.collection("users").doc(token).collection("batch").doc(batchno).set({
        name: batchno,
        students: [],
      });

      res.send({ token, success: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: error.message });
    }
  })

  .get("/batch/:batchid", authRequired, (req, res) => {
    const batchid = req.params;
    const token = req.token;
    console.log(token);
    let studentsInfo = [];
    db.collection("users")
      .doc(token)
      .collection("batch")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          studentsInfo.push(doc.data());
        });
        let response = studentsInfo.filter(
          (element) => element.name === batchid.batchid
        );
        res.send(response);
      });
  })

  .get("/batch/delete/:id", authRequired, (req, res) => {
    db.collection("users")
      .doc(req.token)
      .collection("batch")
      .doc(req.params.id)
      .delete()
      .then(() => {
        res.send("deleted");
        console.log("dleted");
      });
  });

router.get("/getBatch", authRequired, (req, res) => {
  const token = req.token;
  const finalResult = [];
  try {
    db.collection("users")
      .doc(token)
      .collection("batch")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const batchName = doc.data().name;
          const link = `http://localhost:3000/formRegister/${token}/${batchName}`;
          const size = doc.data().students.length;
          finalResult.push({
            link,
            batchName,
            size,
          });
        });
        res.send({ batch: finalResult });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
