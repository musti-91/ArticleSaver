import Axios from "axios";
import Scrollbar from "smooth-scrollbar";
import FavouriteItem from "./FavouriteItem";
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
    this.ps = Scrollbar.init(this.articleHolder);
  }
  createResult() {
    let el = `<li>`;
    el += `   <img src="${this.item.fields.image_path}">
                <h3>${this.item.title} <p>${this.item.fields.ds_created
      .replace("T", " ")
      .replace("Z", " ")}</p></h3>
                <p>${this.item.snippets.content} <a href='${
      this.item.fields.url
    }' target="_blank">Read more</a></p>
                <span id="${this.item.fields.entity_id}"></span>
                
           </li>`;
    this.articleHolder.insertAdjacentHTML("beforeend", el);
    this.favItem = document.getElementById(`${this.item.fields.entity_id}`);
  }
  events() {
    this.favItem.addEventListener("click", e => {
      new FavouriteItem(e.target, this.saveArticle);
    });
  }
}
