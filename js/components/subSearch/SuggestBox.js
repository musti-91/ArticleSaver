import Axios from "axios";

export default class SuggestBox {
  constructor(input, holder) {
    this.input = input;
    this.holder = holder;
    this.suggestions = [];
    this.nr = 0;
    this.selectIndex = 0;
    this.liElement = "";
    this.getData();
    this.events();
  }
  getData() {
    Axios.get(
      `https://nieuws.vtm.be/feed/articles/solr?format=json&query=${
        this.input.value
      }`
    )
      .then(response => {
        const data = response.data.response;
        data.items.forEach(item => {
          this.suggestions.push(item);
        });
        this.createHtml();
      })
      .catch(error => {
        console.log(error);
      });
  }
  createHtml() {
    let html = "";
    this.holder.innerHTML = "";
    this.suggestions.forEach(element => {
      this.nr++;
      html += `<li id="suggestItem-${this.nr}" class="animated lightSpeedIn">
                    <h4>${element.title}</h4>
          </li>`;
    });
    this.holder.insertAdjacentHTML("beforeend", html);
    this.liElement = document.getElementById(`suggestItem-${this.nr}`);
  }
  events() {
    this.holder.addEventListener("click", this.handleClick.bind(this));
    this.input.addEventListener("keydown", this.handleKeydown.bind(this));
  }
  handleClick(e) {
    if (e.target.nodeName == "H4") {
      this.choose(e.target.innerHTML);
    }
  }
  handleKeydown(e) {
    if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 13) {
      if (e.keyCode == 13) {
        this.choose(
          document.getElementById(`suggestItem-${this.selectIndex}`)
            .childNodes[1].innerHTML
        );
      }
      if (e.keyCode == 40) {
        this.selectIndex++;
        if (this.holder.querySelector("li.chosen")) {
          this.holder.querySelector("li.chosen").classList.remove("chosen");
        }
        this.holder
          .querySelector(`li:nth-child(${this.selectIndex})`)
          .classList.add("chosen");
        if (this.selectIndex == this.holder.childElementCount) {
          this.selectIndex = 0;
        }
      }
      if (e.keyCode == 38) {
        this.selectIndex--;
        if (this.holder.querySelector("li.chosen")) {
          this.holder.querySelector("li.chosen").classList.remove("chosen");
        }
        this.holder
          .querySelector(`li:nth-child(${this.selectIndex})`)
          .classList.add("chosen");
        if (this.selectIndex == 1) {
          this.selectIndex = this.holder.childElementCount + 1;
        }
      }
    }
  }
  choose(value) {
    this.input.value = value;
    this.holder.innerHTML = "";
    this.selectIndex = 0;
  }
}
