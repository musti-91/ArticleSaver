import Axios from "axios";
import Scrollbar from "smooth-scrollbar";
import Heart from "./Heart";
export default class SearchResults {
  constructor(item, articleHolder, savedArticles, firebaseRef) {
    this.item = item;
    this.savedArticles = savedArticles;
    this.articleHolder = articleHolder;
    this.firebaseRef = firebaseRef;
    this.list = "";
    this.isSaved = "";
    this.heart = "";
    this.addScrollbar();
    this.createResult();
  }
  addScrollbar() {
    this.ps = Scrollbar.init(this.articleHolder);
  }
  createResult() {
    let el = `<li data-id="${this.item.fields.entity_id}" id="search-${
      this.item.fields.entity_id
    }">`;
    el += `     <img src="${this.item.fields.image_path}">
                <h3>${this.item.title} <p>${this.item.fields.ds_created
      .replace("T", " ")
      .replace("Z", " ")}</p></h3>
                <p>${this.item.snippets.content} <a href='${
      this.item.fields.url
    }' target="_blank">Read more</a></p>
    <p>${this.item.fields.entity_id}</p>
                <span id="heart"></span>
           </li>`;
    this.articleHolder.insertAdjacentHTML("beforeend", el);
    this.isSaved = this.inArray(this.item.fields.entity_id, this.savedArticles);
    this.list = document.getElementById(`search-${this.item.fields.entity_id}`);
    this.heart = new Heart(
      this.isSaved,
      this.list,
      this.firebaseRef,
      this.savedArticles
    );
  }

  inArray(needle, heystack) {
    let length = heystack.length;
    for (let i = 0; i < length; i++) {
      if (heystack[i] === needle) {
        return true;
      }
    }
    return false;
  }
}
