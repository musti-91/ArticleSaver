export default class FavouriteItem {
  constructor(target, saveArticleObject) {
    this.target = target;
    this.saveArticleObject = saveArticleObject;
    this.init();
  }
  init() {
    this.target.classList.add("active");
    this.saveArticleObject.databaseRef.push(this.target.id);
  }
}
