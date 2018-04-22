import Siema from "siema";
import Axios from "axios";
/**
 * @param  {HTMLElement} holder
 */

export default class Slider {
  constructor(holder) {
    this.holder = holder;
    this.slider = "";
    this.articles = [];
    this.getData();
  }
  getData() {
    Axios.get("https://vtm.be/feed/articles")
      .then(response => {
        response.data.response.items.forEach(article => {
          this.insertLayer(article);
        });
        this.addSieme();
      })
      .catch(error => {
        alert(error);
      });
  }
  insertLayer(article) {
    let html = `<div>`;
    html += `<img src="${article.image.large}">`;
    this.holder.insertAdjacentHTML("beforeEnd", html);
  }
  addSieme() {
    new Siema({
      selector: ".slider",
      duration: 200,
      easing: "ease-out",
      perPage: 1,
      startIndex: 0,
      draggable: true,
      multipleDrag: true,
      threshold: 20,
      loop: true,
      rtl: false,
      onInit: () => {},
      onChange: () => {}
    });
  }
}
