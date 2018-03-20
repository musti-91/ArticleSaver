import ListOfArticles from "./ListOfArticles";
import * as firebase from "firebase";

export default class SavedArticle {
  constructor(savedArticles, holder) {
    this.savdedArticles = savedArticles;
    this.holder = holder;
    this.databaseRef = "";
    this.orderSaveElement = "";
    this.firebaseInit();
    this.createHTML();
  }
  firebaseInit() {
    let config = {
      apiKey: "AIzaSyCi7x0Yqp42bjHxr_yABn7fXZ-ioqpHRyo",
      authDomain: "articles-saver.firebaseapp.com",
      databaseURL: "https://articles-saver.firebaseio.com",
      projectId: "articles-saver",
      storageBucket: "",
      messagingSenderId: "1099130202177"
    };
    firebase.initializeApp(config);
    this.databaseRef = firebase.database().ref("articles");
  }
  createHTML() {
    let el = `<h2 class="title">Saved Articles</h2><hr>`;
    el += `<ul id="listHolder">`;
    this.databaseRef.once("value", snapshot => {
      for (let item in snapshot.val()) {
        new ListOfArticles(snapshot.val()[item]);
        this.savdedArticles.push(snapshot.val()[item]);
      }
    });
    el += `</ul>`;
    this.holder.insertAdjacentHTML("afterbegin", el);
  }
}
