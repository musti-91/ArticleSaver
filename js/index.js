import SaveArticle from "./components/SaveArticle";
import SearchArticle from "./components/SearchArticle";
import Scrollbar from "smooth-scrollbar";
import Login from "./Login/login";
import PerfectScrollbar from "perfect-scrollbar";
import Slider from "./components/Slider";

/**
 * @param  {function} document.body  add scrollbar to the body via smooth scrollbar npm package
 */
Scrollbar.init(document.body);
Login(showArticles);

/**
 * @param  {callback} firebase: Getting firebase as callback
 */
function showArticles(firebase) {
  // const sliderHolder = document.querySelector(".slider");
  // new Slider(sliderHolder);
  const firebaseRef = firebase.database().ref("articles");
  const searchHolder = getElement("searchHolder");
  const savedHolder = getElement("savedHolder");
  const savedArticles = [];
  const saveArticle = new SaveArticle(savedArticles, savedHolder, firebaseRef);
  const searchArticle = new SearchArticle(
    searchHolder,
    savedArticles,
    firebaseRef
  );
}
/**
 * @param  {function getElement(id) {
   
 }} id
 */
function getElement(id) {
  return document.getElementById(id);
}
