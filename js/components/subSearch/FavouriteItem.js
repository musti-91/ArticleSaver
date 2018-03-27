export default class FavouriteItem {
  constructor(target, isChecked) {
    this.target = target;
    this.isChecked = isChecked;
    this.init();
  }
  init() {
    if (this.isChecked) {
      this.target.classList.add("active");
    } else {
      this.target.classList.remove("active");
    }
  }
}
