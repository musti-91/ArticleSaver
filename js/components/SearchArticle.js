import SearchResults from "./subSearch/SearchResults";
import Axios from "axios";
import SuggestBox from "./subSearch/SuggestBox";

/**
 * @param  {HTML Element} holder: parent Element holds all html
 * @param  {Array} savedArticlesList
 * @param  {Reference} firebaseRef
 */
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
            <button class="button animated zoomIn" id="search">Search</button>
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
        this.input.style.width = "100%";
        this.input.style.marginRight = 0;
        this.button.style.display = "none";
        let searchVal = this.input.value.replace(" ", ",");
        Axios.get(
          `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${searchVal}`
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
          .catch(error => {
            alert(error);
          });
      }
    });
    this.input.addEventListener(
      "input",
      () => {
        let timer;
        this.articleHolder.innerHTML = "";
        this.input.classList.remove("error");
        this.button.style.display = "block";
        this.input.style.marginRight = "10px";
        clearInterval(timer);
        timer = setTimeout(() => {
          if (this.validate(this.input)) {
            new SuggestBox(this.input, this.articleHolder);
          }
        });
      },
      300
    );
  }
  validate(input) {
    if (input.value.length <= 2) {
      this.input.classList.add("error");
      return false;
    }
    this.input.classList.remove("error");
    return true;
  }
}
