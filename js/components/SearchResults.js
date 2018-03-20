import Axios from "axios";

export default class SearchResults {
  constructor(item, articleHolder) {
    this.item = item;
    this.articleHolder = articleHolder;
    this.favItem = "";
    this.createResult();
    this.events();
  }
  createResult() {
    let el = `<li>`;
    el += `<h3>${this.item.title}</h3>
           <span id="fav_article"></span></li>`;
    this.articleHolder.insertAdjacentHTML("beforeend", el);
    this.favItem = document.getElementById("fav_article");
  }
  events() {
    this.favItem.addEventListener("click", e => {});
  }
}
