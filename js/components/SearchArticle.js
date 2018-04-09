import SearchResults from "./subSearch/SearchResults";
import Axios from "axios";
import SuggestBox from "./subSearch/SuggestBox";

export default class SearchArticle {
  constructor(holder, savedArticlesList, firebaseRef) {
    this.holder = holder;
    this.savedArticlesList = savedArticlesList;
    this.firebaseRef = firebaseRef;
    this.input = "";
    this.articleHolder = "";
    this.button = "";
    this.createHTML();
    this.eventsListener();
  }
  createHTML() {
    let el = `<h2 class="title">Search Article</h2><hr>`;
    el += `<form id="form">
            <input type="text" id="in_val" class="input" autocomplete="off" autofocus>
            <button class="button animated infinite flipInX" id="search">Search</button>
          </form>
          <ul id="resultsHolder"></ul>
          `;
    this.holder.insertAdjacentHTML("beforeend", el);
    this.input = document.getElementById("in_val");
    this.articleHolder = document.getElementById("resultsHolder");
    this.button = document.getElementById("search");
  }
  eventsListener() {
    this.holder.querySelector("form").addEventListener("submit", e => {
      e.preventDefault();
      this.articleHolder.innerHTML = "";
      if (this.validate(this.input)) {
        this.button.style.display = "none";
        this.input.style.width = "100%";
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
      }
    });
    this.input.addEventListener("input", () => {
      this.articleHolder.innerHTML = "";
      this.input.classList.remove("error");
      this.button.style.display = "block";
      if (this.validate(this.input)) {
        new SuggestBox(this.input, this.articleHolder);
      }
    });
  }
  validate(input) {
    if (input.value.length <= 2) {
      this.input.classList.add("error");
      this.button.classList.add("infinite");
      return false;
    }
    this.button.classList.remove("infinite");
    this.input.classList.remove("error");
    return true;
  }
}
