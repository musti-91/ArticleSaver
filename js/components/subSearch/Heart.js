export default class Heart {
  constructor(isChecked, list, firebaseRef, savedArticles) {
    this.isChecked = isChecked;
    this.list = list;
    this.firebaseRef = firebaseRef;
    this.savedArticles = savedArticles;
    this.id = "";
    this.init();
    this.events();
  }
  init() {
    if (this.isChecked != true) {
      this.id = this.list.id.substring(
        this.list.id.indexOf("-") + 1,
        this.list.id.length
      );
    } else {
      this.list.querySelector("span#heart").classList.add("active");
    }
  }
  events() {
    this.list.addEventListener("click", this.handleClick.bind(this));
  }
  handleClick(e) {
    if (e.target.nodeName == "SPAN") {
      if (e.target.classList.contains("active")) {
        e.target.classList.remove("active");
        document.getElementById("trash_delete").click();
      } else {
        e.target.classList.add("active");
        this.savedArticles.push(this.id);
        this.firebaseRef.set(this.savedArticles);
      }
    } else if (e.target.nodeName == "H3") {
      console.log("h3 is clicked // play with -it later");
    }
  }
}
