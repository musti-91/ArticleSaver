import SavedArticle from "./components/SavedArticle";

// import { config } from "./components/firebase";
const articlesHolder = document.getElementById("articlesHolder");
const savedHolder = document.getElementById("savedHolder");
const listHolder = document.getElementById("savedHolder");
// firebse ref
let config = {
  apiKey: "AIzaSyCi7x0Yqp42bjHxr_yABn7fXZ-ioqpHRyo",
  authDomain: "articles-saver.firebaseapp.com",
  databaseURL: "https://articles-saver.firebaseio.com",
  projectId: "articles-saver",
  storageBucket: "",
  messagingSenderId: "1099130202177"
};
firebase.initializeApp(config);
let database = firebase.database().ref("articles-saver");
loadData.on("value", getData, errorData);

const savedArticles = ["123", "650", "400"];

const savedArticle = new SavedArticle(savedArticles, savedHolder);
