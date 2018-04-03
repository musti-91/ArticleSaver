import ListOfArticles from "../subSave/ListOfArticles";
import popupS from "popups";
import Axios from "axios";
export default class Heart {
  constructor(isChecked, list, firebaseRef, savedArticles) {
    this.isChecked = isChecked;
    this.list = list;
    this.firebaseRef = firebaseRef;
    this.savedArticles = savedArticles;
    this.id = "";
    this.init();
    this.events();
  }
  init() {
    if (this.isChecked != true) {
      this.id = this.list.id.substring(
        this.list.id.indexOf("-") + 1,
        this.list.id.length
      );
    } else {
      this.list.querySelector("span#heart").classList.add("active");
    }
  }
  events() {
    this.list.addEventListener("click", this.handleClick.bind(this));
  }
  handleClick(e) {
    if (e.target.nodeName == "SPAN") {
      if (e.target.classList.contains("active")) {
        e.target.classList.remove("active");
        document.getElementById("trash_delete").click();
      } else {
        e.target.classList.add("active");
        this.savedArticles.push(parseInt(this.id));
        new ListOfArticles(
          parseInt(this.id),
          document.getElementById("listHolder"),
          this.firebaseRef
        );
        this.firebaseRef.set(this.savedArticles);
      }
    } else if (e.target.nodeName == "LI") {
      e.target.classList.add("infinite");
    } else {
      let index = e.target.parentElement.id.indexOf("-");
      let id = e.target.parentElement.id.substring(
        index + 1,
        e.target.parentElement.id.length
      );
      popupS.window({
        mode: "text",
        content: "data doesn't loaded...",
        className: "animated bounceOut",
        onOpen: function() {
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
              html += `<a href='${item.url}'>Source in vtm.be</a></div></div>`;
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
  }
}
