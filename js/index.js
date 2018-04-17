import SaveArticle from "./components/SaveArticle";
import SearchArticle from "./components/SearchArticle";
import Scrollbar from "smooth-scrollbar";
import Login from "./Login/login";
import PerfectScrollbar from "perfect-scrollbar";

Scrollbar.init(document.body);
Login(showArticles);
/** TODO/
 * first article added three times
 *
 */
function showArticles(firebase) {
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
function getElement(id) {
  return document.getElementById(id);
}
