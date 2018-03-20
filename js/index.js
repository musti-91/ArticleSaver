import SaveArticle from "./components/SaveArticle";
import SearchArticle from "./components/SearchArticle";
const searchHolder = document.getElementById("searchHolder");
const savedHolder = document.getElementById("savedHolder");
// initilizing firebase

const savedArticles = [];
const saveArticle = new SaveArticle(savedArticles, savedHolder);
const searchArticle = new SearchArticle(searchHolder, saveArticle);
