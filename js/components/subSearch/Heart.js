/**
 * @param  {boolean} isChecked return true if the list is Exist in Array
 * @param  {HTMLLIElement} list li elment
 */ export default class Heart {
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
