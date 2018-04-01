import ListOfArticles from "./subSave/ListOfArticles";
import Axios from "axios";
import { parse } from "url";
let popupS = require("popups");
export default class SaveArticle {
  constructor(savedArticles, holder, firebaseRef) {
    this.savedArticles = savedArticles;
    this.holder = holder;
    this.firebaseRef = firebaseRef;
    this.artcileId = "";
    this.ulHolder = "";
    this.createHTML();
    this.getData();
    this.events();
  }
  createHTML() {
    let el = `<h2 class="title">Saved Articles</h2><hr>`;
    el += `<ul id="listHolder" data-scrollbar>`;
    el += `</ul>`;
    this.holder.insertAdjacentHTML("afterbegin", el);
    this.ulHolder = this.holder.querySelector("ul#listHolder");
  }
  getData() {
    this.firebaseRef.once("value", snapshot => {
      for (let property in snapshot.val()) {
        this.artcileId = snapshot.val()[property];
        this.savedArticles.push(snapshot.val()[property]);
        new ListOfArticles(this.artcileId, this.ulHolder, this.firebaseRef);
      }
    });
  }
  events() {
    this.ulHolder.addEventListener("click", e => {
      let id = e.target.parentElement.dataset.id;
      if (e.target.id == "trash_delete") {
        // remove from Array
        let pos = this.savedArticles.indexOf(id);
        this.savedArticles.splice(pos, 1);
        // remove from DOM
        e.target.parentElement.remove();
        // remove from firebase
        this.firebaseRef.set(this.savedArticles);
        // remove class  active from searchresults list
        document
          .getElementById(`search-${parseInt(id)}`)
          .childNodes[7].classList.remove("active");
      } else if (e.target.parentElement.nodeName == "LI") {
        //  popups
        popupS.window({
          mode: "text",
          content: "data doesn't loaded...",
          className: "animated bounceOut",
          onOpen: function() {
            Axios.get(
              // todo later
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
          },
          onSubmit: function(val) {},
          onClose: function() {}
        });
      }
    });
  }
}
