import SearchResults from "./SearchResults";

export default class SearchArticle {
  constructor(holder, savedArticle) {
    this.holder = holder;
    this.savedArticle = savedArticle;
    this.input = "";
    this.articleHolder = "";
    this.createHTML();
    this.eventsListener();
  }
  createHTML() {
    let el = `<h2 class="title">Search Article</h2><hr>`;
    el += `<form id="form">
            <input type="text" id="in_val" class="input">
            <button class="button">Search</button>
          </form>
          <div id="articlesHolder" class="block"></div>
          `;
    this.holder.insertAdjacentHTML("beforeend", el);
    this.input = document.getElementById("in_val");
    this.articleHolder = document.getElementById("#articlesHolder");
  }
  eventsListener() {
    this.holder.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      new SearchResults(this.input, this.articleHolder);
    });
  }
}
