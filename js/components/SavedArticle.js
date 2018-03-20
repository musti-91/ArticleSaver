import ListOfArticles from "./ListOfArticles";

export default class SavedArticle {
  constructor(savedArticles, holder, databaseRef) {
    this.savdedArticles = savedArticles;
    this.holder = holder;
    this.databaseRef = databaseRef;
    this.orderSaveElement = "";
    this.firebaseInit();
    // make new SavedListItem= new
  }
  firebaseInit() {
    let el = `<h2 class="title">Saved Articles</h2>`;
    el += `<ul id="listHolder">`;
    this.databaseRef.once("value", snapshot => {
      for (let item in snapshot.val()) {
        new ListOfArticles(snapshot.val()[item]);
      }
    });
    el += `</ul>`;
    this.holder.insertAdjacentHTML("afterbegin", el);
  }
}
