import Axios from "axios";
import FavouriteItem from "./FavouriteItem";
import PerfectScrollbar from "perfect-scrollbar";
export default class SearchResults {
  constructor(item, articleHolder, saveArticle) {
    this.item = item;
    this.saveArticle = saveArticle;
    this.articleHolder = articleHolder;
    this.favItem = "";
    this.ps = "";
    this.addScrollbar();
    this.createResult();
    this.events();
  }
  addScrollbar() {
    this.ps = new PerfectScrollbar(this.articleHolder.parentElement, {
      wheelSpeed: 2,
      wheelPropagation: false,
      minScrollbarLength: 10
    });
  }
  createResult() {
    let el = `<li>`;
    el += ` <h3>${this.item.title}</h3>
            <p>${this.item.snippets.content}</p>
            <span id="${this.item.fields.entity_id}"></span>
           </li>`;
    this.articleHolder.insertAdjacentHTML("beforeend", el);
    this.favItem = document.getElementById(`${this.item.fields.entity_id}`);
    this.ps.update();
  }
  events() {
    this.favItem.addEventListener("click", e => {
      new FavouriteItem(e.target, this.saveArticle);
    });
  }
}
