import Axios from "axios";
import PerfectScrollbar from "perfect-scrollbar";
export default class ListOfArticles {
  constructor(item) {
    this.item = item;
    this.deleteButton = "";
    this.listHolder = "";
    this.ps = "";
    this.addScrollbar();
    this.init();
    this.eventsListener();
  }
  addScrollbar() {
    this.ps = new PerfectScrollbar("#listHolder", {
      wheelSpeed: 2,
      wheelPropagation: false,
      minScrollbarLength: 10
    });
  }
  init() {
    let el = `<li>`;
    Axios.get(
      `https://nieuws.vtm.be/feed/articles?format=json&ids=${this.item}`
    )
      .then(response => {
        response.data.response.items.forEach(element => {
          el += `<img src='${element.image.full}'>
          <h3>${element.title.replace(/"/g, "")}</h3>
                <span id="trash_delete"></span>`;
        });
        el += `</li>`;
        document
          .getElementById("listHolder")
          .insertAdjacentHTML("beforeend", el);
      })
      .catch("Something went Wrong!");
    this.listHolder = document.getElementById("listHolder");
    this.ps.update();
    this.deleteButton = document.getElementById("trash_delete");
  }
  eventsListener() {}
}
