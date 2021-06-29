const firebase = require('firebase');
var config = {
    apiKey: "AIzaSyDX3uaARoqhVxGG6A6ixuHmtWUD7kfY2Wk",
    authDomain: "offquiz-2d066.firebaseapp.com",
    projectId: "offquiz-2d066",
    storageBucket: "offquiz-2d066.appspot.com",
    messagingSenderId: "537811044010",
    appId: "1:537811044010:web:2f99d34dea541055ceb2d3"
};
let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp(config);
}else {
    app = firebase.app(); // if already initialized, use that one
}

module.exports = app;
