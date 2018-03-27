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
    this.isChecked = true;
    this.addScrollbar();
    this.createResult();
    this.events();
  }
  addScrollbar() {
    this.ps = Scrollbar.init(this.articleHolder);
  }
  createResult() {
    let el = `<li data-id="${this.item.fields.entity_id}">`;
    el += `     <img src="${this.item.fields.image_path}">
                <h3>${this.item.title} <p>${this.item.fields.ds_created
      .replace("T", " ")
      .replace("Z", " ")}</p></h3>
                <p>${this.item.snippets.content} <a href='${
      this.item.fields.url
    }' target="_blank">Read more</a></p>
                <span></span>
           </li>`;
    this.articleHolder.insertAdjacentHTML("beforeend", el);
    this.favItem = this.articleHolder.querySelector(
      `li[data-id="${this.item.fields.entity_id}"]`
    );
  }
  events() {
    this.favItem.addEventListener("click", this.handleClick.bind(this));
    // this.favItems.forEach(element => {
    //   element.addEventListener("click", this.handleClick.bind(this));
    // });
  }
  handleClick(e) {
    if (e.target.nodeName == "SPAN") {
      let id = e.target.parentElement.dataset.id;
      this.saveArticle.databaseRef.equalTo(id).once("value", snapshot => {
        new FavouriteItem(e.target, this.isChecked);
        // remove from database
        // remove from array
        console.log(this.isChecked);
      });
    } else {
      this.isChecked = false;
      new FavouriteItem(e.target, this.isChecked);
      this.saveArticle.savedArticles.push(e.target);
    }
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
