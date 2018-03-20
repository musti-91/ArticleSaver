import Axios from "axios";

export default class SearchResults {
  constructor(input, articleHolder) {
    this.input = input;
    this.articleHolder = articleHolder;
    this.createResult();
  }
  createResult() {
    let el = `<ul>`;
    Axios.get(
      `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${
        this.input.value
      }`
    )
      .then(response => {
        console.log(this.input.value);
        console.log(response);
      })
      .catch("Error");
  }
}
