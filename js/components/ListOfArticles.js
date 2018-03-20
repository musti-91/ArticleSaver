import Axios from "axios";

export default class ListOfArticles {
  constructor(item) {
    this.item = item;
    this.init();
  }
  init() {
    let el = "";
    console.log(this.item);
    Axios.get(
      `https://nieuws.vtm.be/feed/articles?format=json&ids=${this.item}`
    )
      .then(response => {
        el += `<li>`;
        response.data.response.items.forEach(element => {
          el += `<img src='${element.image.uri}'>
                <h3>${element.title}</h3>`;
        });
        el += `</li>`;
      })
      .catch("Something went Wrong!");
    document.getElementById("listHolder").insertAdjacentHTML("beforeend", el);
  }
}
