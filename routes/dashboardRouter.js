const express = require("express")
const router = express.Router();
var firebase = require("firebase/app")
const app = require('../fire');
const db = firebase.firestore(app);
const {authRequired} = require("../middleware/auth")
const { questionFilter } = require('../utils/questionFilter')
const {encryptMessage } = require("../utils/encryption.js");
const {sendSms } = require("../utils/sendSms.js");

router.post("/saveQuiz",authRequired,(req,res)=> {
    const data = req.body.finalQnA;
    const { time, date, title, batch } = req.body;
    console.log(req.body);
    let isCirculated = false;
    console.log(batch);
    const finalQuizArray =data;
    db.collection('users').doc(req.token).collection("quiz").add( { time, date, title, batch, finalQuizArray, isCirculated})
    .then((doc) => console.log(doc.data()));
    console.log("Quiz Successfully Created");
    res.send("Quiz Successfully Created")
})


.get('/' , authRequired, async (req, res) => {
    const quizDocRef = db.collection('users').doc(req.token)
    console.log(req.token);
    var quizes = [];
    quizDocRef.collection("quiz").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            quizes.push({id:doc.id, data: doc.data() });
        });
        res.send(quizes);
    }); 
})

.get('/view/:id', authRequired, async (req, res) => {
    const quizDocRef = db.collection('users').doc(req.token);
    var quiz = {};
    quizDocRef.collection('quiz').doc(req.params.id).get().then((querySnapshot) => {
        const finalQuizArray = questionFilter(querySnapshot.data().finalQuizArray);
        res.send({
            batch:querySnapshot.data().batch,
            date:querySnapshot.data().date,
            time:querySnapshot.data().time,
            title:querySnapshot.data().title,
            finalQuizArray
        });
    });
})

.get('/quizbatches', authRequired, async (req, res) => {
    const quizDocRef = db.collection('users').doc(req.token).collection('batch');
    let batches = [];
    await quizDocRef.get().then((querySnapshot) => {
       querySnapshot.forEach((doc, index) => batches.push({value: doc.data().name ,  text: doc.data().name }));
    })
    res.send(batches);
})

.get('/editInfo/:id', authRequired, async (req, res) => {
    const quizDocRef = db.collection('users').doc(req.token);
    var quiz = {};
    let batches = [];
    let querySnapshot = await quizDocRef.collection('batch').get();
    querySnapshot.forEach((doc, index) => batches.push({value: doc.data().name ,  text: doc.data().name }));
    querySnapshot = await quizDocRef.collection('quiz').doc(req.params.id).get();
    res.send({
        batch:querySnapshot.data().batch,
        date:querySnapshot.data().date,
        time:querySnapshot.data().time,
        title:querySnapshot.data().title,
        finalQuizArray:querySnapshot.data().finalQuizArray,
        batchInfo:batches
    })
})
.get('/delete/:id', authRequired, async (req, res) => {
    db.collection('users').doc(req.token).collection('quiz').doc(req.params.id).delete()
    .then(() => {
        console.log("successfully deleted")
        res.send('deleted');
    })
    .catch((err) => {
        console.log("unknown error", err);
        res.send(err);
    })
})

router.get('/circulate/:id',authRequired,async(req,res)=>{
    try {
        const id = req.params.id;
        const token = req.token;
        let plainText = "";
        
        const quizDocRef = await db.collection('users').doc(token);
        const querySnapshot = await quizDocRef.collection('quiz').doc(id).get()
        plainText = "####" + querySnapshot.data().title + "####" + querySnapshot.data().time + "####" + querySnapshot.data().date;
        let array = querySnapshot.data().finalQuizArray
        for(let i=0;i<array.length;i++){
            plainText +="####"+array[i].question + "####" + array[i].answer;
        }
        const batch = querySnapshot.data().batch;
        const cipherText = encryptMessage(plainText);
        const batchSnapshot  = await quizDocRef.collection('batch').doc(batch).get();
        let numbers = [];
        const students = batchSnapshot.data().students;
        for(let i=0;i<students.length;i++){
            numbers.push(students[i].phone);
        }
        sendSms(numbers,cipherText);
        await quizDocRef.collection('quiz').doc(id).update({ isCirculated: true })
        res.send({msg:"Successfully Quiz Circulated"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error Occured While Circulating Quiz.")
    }
})

router.put('/updateQuiz/:id',authRequired,async(req,res)=>{
    try {
        const id = req.params.id;
        const token  = req.token;
        const {quizInfo} = req.body;
        await db.collection('users').doc(token).collection("quiz").doc(id).set(quizInfo)
        res.send("Quiz Saved")
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
})

module.exports = router;