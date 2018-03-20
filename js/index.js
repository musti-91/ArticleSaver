import SavedArticle from "./components/SavedArticle";
import SearchArticle from "./components/SearchArticle";
const searchHolder = document.getElementById("searchHolder");
const savedHolder = document.getElementById("savedHolder");
// initilizing firebase

const savedArticles = [];
const savedArticle = new SavedArticle(savedArticles, savedHolder);
const searchArticle = new SearchArticle(searchHolder, savedArticle);
