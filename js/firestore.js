const FirestoreInit = (function (){
    var instance;
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDfTk27pmcHhtAlk4av7vQrI1dJ4OxX3JE",
        authDomain: "some-news-app.firebaseapp.com",
        databaseURL: "https://some-news-app.firebaseio.com",
        projectId: "some-news-app",
        storageBucket: "some-news-app.appspot.com",
        messagingSenderId: "980718396780"
    };
    firebase.initializeApp(config);
    
    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();
    
    function getDb() {
        return db;
    }

    function createInstance() {
        return {
            getDb
        }
    }

    return {
        getInstance() {
            return instance || (instance = createInstance());
        }
    }
})();