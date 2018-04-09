export default class Heart {
  constructor(isChecked, list) {
    this.isChecked = isChecked;
    this.list = list;
    this.id = "";
    this.init();
  }
  init() {
    if (this.isChecked != true) {
      this.list.querySelector("span#heart").classList.remove("active");
    } else {
      this.list.querySelector("span#heart").classList.add("active");
    }
  }
}
