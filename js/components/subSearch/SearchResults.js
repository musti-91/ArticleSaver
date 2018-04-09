import Axios from "axios";
import Scrollbar from "smooth-scrollbar";
import popupS from "popups";
import Heart from "./Heart";
import ListOfArticles from "../subSave/ListOfArticles";
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
    this.events();
  }
  addScrollbar() {
    Scrollbar.init(document.getElementById("resultsHolder"));
  }
  createResult() {
    let el = `<li data-id="${this.item.fields.entity_id}" id="search-${
      this.item.fields.entity_id
    }" class="animated slideInDown">`;
    el += `     <img src="${this.item.fields.image_path}">
                <h3>${this.item.title} <p>${this.item.fields.ds_created
      .replace("T", " ")
      .replace("Z", " ")}</p></h3>
                <p>${this.item.snippets.content} <a href='${
      this.item.fields.url
    }' target="_blank">Read more</a></p>
                <span id="heart" class="animated jello"></span>
           </li>`;
    this.articleHolder.insertAdjacentHTML("beforeend", el);
    this.isSaved = this.inArray(this.item.fields.entity_id, this.savedArticles);
    this.list = document.getElementById(`search-${this.item.fields.entity_id}`);
    this.heart = new Heart(this.isSaved, this.list);
  }
  events() {
    this.list.addEventListener("click", this.handleClick.bind(this));
  }
  handleClick(e) {
    let id = parseInt(this.list.dataset.id);
    if (e.target.nodeName == "SPAN") {
      if (e.target.classList.contains("active")) {
        e.target.classList.remove("active");
        document.getElementById(`save-${id}`).childNodes[5].click();
      } else {
        e.target.classList.add("active");
        this.savedArticles.push(id);
        new ListOfArticles(
          id,
          document.getElementById("listHolder"),
          this.firebaseRef
        );
        this.firebaseRef.set(this.savedArticles);
      }
    } else {
      popupS.window({
        mode: "text",
        content: `<a href="#" id="loadingIcon"></a>`,
        labelOk: "",
        className: "animated bounceOut",
        onOpen: function() {
          setTimeout(() => {
            Axios.get(
              `https://nieuws.vtm.be/feed/articles?format=json&fields=html&ids=${id}`
            )
              .then(response => {
                let item = response.data.response.items[0];
                let html = `<div class="bigArticle animated bounceIn" id="big-${
                  item.id
                }">`;
                html += `<img src="${item.image.full}">
                        <div><h2>${item.title}</h2>
                    <p>${item.airdate.formatted}</p>`;
                html += `<p>${item.text_html}</p>`;
                html += `<a href='${
                  item.url
                }'>Source in vtm.be</a></div></div>`;
                this.$contentEl.innerHTML = html;
              })
              .catch(error => {
                console.log(error);
              });
          }, 450);
        }
      });
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
