import Axios from "axios";
import Scrollbar from "smooth-scrollbar";
export default class ListOfArticles {
  constructor(id, holder, firebaseRef) {
    this.id = id;
    this.firebaseRef = firebaseRef;
    this.holder = holder;
    this.article = "";
    this.getArticle();
    // this.init();  https://nieuws.vtm.be/feed/articles?format=json&ids=
    this.events();
  }
  getArticle() {
    Axios.get(`https://nieuws.vtm.be/feed/articles?format=json&ids=${this.id}`)
      .then(response => {
        this.article = response.data.response.items[0];
        this.init();
      })
      .catch(error => {
        console.log(error);
      });
  }
  init() {
    let el = `<li data-id="${this.article.id}">`;
    el += `<img src='${this.article.image.full}'>
                <h3>${this.article.title.replace(/"/g, "")}(id: ${
      this.article.id
    })</h3>
                <span id="trash_delete"></span>`;
    el += `</li>`;
    this.holder.insertAdjacentHTML("beforeend", el); // ul
  }
  events() {
    this.holder.addEventListener("click", e => {});
  }
}
