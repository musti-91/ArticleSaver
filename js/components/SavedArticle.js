export default class SavedArticle {
  constructor(savedArticles, holder) {
    this.savdedArticles = savedArticles;
    this.holder = holder;
    this.init();
  }
  init() {
    console.log("hello! this is init function");
  }
}
