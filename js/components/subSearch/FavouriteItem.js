export default class FavouriteItem {
  constructor(target, saveArticleObject) {
    this.target = target;
    this.saveArticleObject = saveArticleObject;
    this.init();
  }
  init() {
    console.log("target: ", this.target.id);
    this.saveArticleObject.savedArticles.forEach(elementId => {
      console.log(elementId);
      // if (elementId == this.target.id) {
      //   console.log("matched");
      // } else {
      //   console.log("not matched");
      // }
      // todo :
      // 1- check if the element is Exist in array ==>add class if not
      // connect firebase to add id
    });
  }
}
