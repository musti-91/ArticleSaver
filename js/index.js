import SaveArticle from "./components/SaveArticle";
import SearchArticle from "./components/SearchArticle";
import Scrollbar from "smooth-scrollbar";
import * as firebase from "firebase";
const searchHolder = document.getElementById("searchHolder");
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
const firebaseRef = firebase.database().ref("articles");
const savedArticles = [];
const saveArticle = new SaveArticle(savedArticles, savedHolder, firebaseRef);
const searchArticle = new SearchArticle(
  searchHolder,
  savedArticles,
  firebaseRef
);
// TODO: click to heart should delete the right element from saved artciles
//     : delete element from  save list should delete the hearty from search results list
// add scrollbar for body  :: needs to be on the eveny component.
Scrollbar.init(document.body);
