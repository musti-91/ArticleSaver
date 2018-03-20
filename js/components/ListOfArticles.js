import Axios from "axios";

export default class ListOfArticles {
  constructor(item) {
    this.item = item;
    this.init();
  }
  init() {
    let el = "<li>";
    Axios.get(
      `https://nieuws.vtm.be/feed/articles?format=json&ids=${this.item}`
    )
      .then(response => {
        response.data.response.items.forEach(element => {
          el += `<img src='${element.image.thumb}'>
                <h3>${element.title.replace(/"/g, "")}</h3>
                <span id="trash_delete"></span>`;
        });
        el += `</li>`;
        document
          .getElementById("listHolder")
          .insertAdjacentHTML("beforeend", el);
      })
      .catch("Something went Wrong!");
  }
}
