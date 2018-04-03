import SaveArticle from "./components/SaveArticle";
import SearchArticle from "./components/SearchArticle";
import Scrollbar from "smooth-scrollbar";
import * as firebase from "firebase";
const searchHolder = document.getElementById("searchHolder");
const savedHolder = document.getElementById("savedHolder");
// initilizing firebase
//********************** */
// todo: firebase intrface login auth
// add favicon
// add time since save it in the list
let config = {
  apiKey: "AIzaSyCi7x0Yqp42bjHxr_yABn7fXZ-ioqpHRyo",
  authDomain: "articles-saver.firebaseapp.com",
  databaseURL: "https://articles-saver.firebaseio.com",
  projectId: "articles-saver",
  storageBucket: "",
  messagingSenderId: "1099130202177"
};

firebase.initializeApp(config);
const firebaseRef = firebase.database().ref("articles");
const savedArticles = [];
const saveArticle = new SaveArticle(savedArticles, savedHolder, firebaseRef);
const searchArticle = new SearchArticle(
  searchHolder,
  savedArticles,
  firebaseRef
);
Scrollbar.init(document.body);
