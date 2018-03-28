import SearchResults from "./subSearch/SearchResults";
import Axios from "axios";

export default class SearchArticle {
  constructor(holder, savedArticlesList, firebaseRef) {
    this.holder = holder;
    this.savedArticlesList = savedArticlesList;
    this.firebaseRef = firebaseRef;
    this.input = "";
    this.articleHolder = "";
    this.createHTML();
    this.eventsListener();
  }
  createHTML() {
    let el = `<h2 class="title">Search Article</h2><hr>`;
    el += `<form id="form">
            <input type="text" id="in_val" class="input" autocomplete="off">
            <button class="button">Search</button>
          </form>
          <ul id="resultsHolder" data-scrollbar></ul>
          `;
    this.holder.insertAdjacentHTML("beforeend", el);
    this.input = document.getElementById("in_val");
    this.articleHolder = document.getElementById("resultsHolder");
  }
  eventsListener() {
    this.holder.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      this.articleHolder.innerHTML = "";
      Axios.get(
        `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${
          this.input.value
        }`
      )
        .then(response => {
          response.data.response.items.forEach(item => {
            new SearchResults(
              item,
              this.articleHolder,
              this.savedArticlesList,
              this.firebaseRef
            );
          });
        })
        .catch("Error!");
    });
  }
}
