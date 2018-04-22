import Axios from "axios";
import Scrollbar from "smooth-scrollbar";
export default class ListOfArticles {
  /**
   * @param  {Number} id
   * @param  {HTMLElement} holder
   * @param  {Reference} firebaseRef
   */
  constructor(id, holder, firebaseRef) {
    this.id = id;
    this.firebaseRef = firebaseRef;
    this.holder = holder;
    this.date = "";
    this.article = "";
    this.getArticle();
  }
  getArticle() {
    Axios.get(
      `https://nieuws.vtm.be/feed/articles?format=json&fields=html&ids=${
        this.id
      }`
    )
      .then(response => {
        this.article = response.data.response.items[0];
        this.artcileText = this.article.text_html;
        this.init();
      })
      .catch(error => {
        console.log(error);
      });
  }
  init() {
    let el = `<li data-id="${this.article.id}" id="save-${
      this.article.id
    }"class="animated fadeInDownBig">`;
    el += `     <img src='${this.article.image.thumb}'>
                <h3>${this.article.title}
                  </br>
                  <p id="timer">${this.clcualteReadTime()} read</p>
                </h3>
                <span id="trash_delete"></span>`;
    el += `</li>`;
    this.holder.insertAdjacentHTML("beforeend", el); // ul
  }
  clcualteReadTime() {
    let readTime = Math.floor(this.artcileText.length / 60);
    if (readTime != 0) {
      readTime = readTime.toString();
      if (readTime.startsWith("0")) {
        return readTime.substring(0, readTime.length - 1) + " sec";
      } else {
        return readTime.substring(0, readTime.length - 1) + " min";
      }
    }
    return "no text to";
  }
}
