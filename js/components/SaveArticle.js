import ListOfArticles from "./subSave/ListOfArticles";
import * as firebase from "firebase";

export default class SaveArticle {
  constructor(savedArticles, holder) {
    this.savedArticles = savedArticles;
    this.holder = holder;
    this.databaseRef = "";
    this.orderSaveElement = "";
    this.artcileId = "";
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
    this.databaseRef.on("value", snapshot => {
      for (let item in snapshot.val()) {
        this.artcileId = snapshot.val()[item];
        this.savedArticles.push(this.artcileId);
        new ListOfArticles(this.artcileId);
      }
    });
    el += `</ul>`;
    this.holder.insertAdjacentHTML("afterbegin", el);
  }
}
