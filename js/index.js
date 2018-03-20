import SavedArticle from "./components/SavedArticle";
import * as firebase from "firebase";
const articlesHolder = document.getElementById("articlesHolder");
const savedHolder = document.getElementById("savedHolder");
// initilizing firebase
let config = {
  apiKey: "AIzaSyCi7x0Yqp42bjHxr_yABn7fXZ-ioqpHRyo",
  authDomain: "articles-saver.firebaseapp.com",
  databaseURL: "https://articles-saver.firebaseio.com",
  projectId: "articles-saver",
  storageBucket: "",
  messagingSenderId: "1099130202177"
};
firebase.initializeApp(config);
let databaseRef = firebase.database().ref("articles");

const savedArticles = [];
const savedArticle = new SavedArticle(savedArticles, savedHolder, databaseRef);
