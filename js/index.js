import SaveArticle from "./components/SaveArticle";
import SearchArticle from "./components/SearchArticle";
import Scrollbar from "smooth-scrollbar";
import * as firebase from "firebase";
const searchHolder = document.getElementById("searchHolder");
const savedHolder = document.getElementById("savedHolder");
Scrollbar.init(document.body);
// initilizing firebase
//********************** */
let config = {
  apiKey: "AIzaSyCi7x0Yqp42bjHxr_yABn7fXZ-ioqpHRyo",
  authDomain: "articles-saver.firebaseapp.com",
  databaseURL: "https://articles-saver.firebaseio.com",
  projectId: "articles-saver",
  storageBucket: "",
  messagingSenderId: "1099130202177"
};

firebase.initializeApp(config);
const firebaseRef = firebase.database().ref("articles");
function showArticles() {
  const savedArticles = [];
  const saveArticle = new SaveArticle(savedArticles, savedHolder, firebaseRef);
  const searchArticle = new SearchArticle(
    searchHolder,
    savedArticles,
    firebaseRef
  );
}
const user_email = document.getElementById("email");
const user_password = document.getElementById("password");
const signin_form = document.getElementById("signin_form");
const signup_form = document.getElementById("signup_form");
const signup_link = document.getElementById("signup_link");
const authElement = document.getElementById("auth");
const log_out = document.getElementById("logout");
const handleErrors = document.getElementById("handleErrors");
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // style display for form
    document.getElementById("auth").style.display = "none";
    document.getElementById("content").style.display = "block";
    // link function
    var user = firebase.auth().currentUser;
    if (user != null) {
      let loggedEmail = user.email;
      let name = user.displayName;
      document.getElementById("user_info").innerHTML = loggedEmail;
    }
    if (user.sendEmailVerification()) {
    }
    showArticles();
  } else {
    // logout.styling
    document.getElementById("content").style.display = "none";
    document.getElementById("auth").style.display = "block";
  }
});
signin_form.addEventListener("submit", () => login());
log_out.addEventListener("click", () => logout());
signup_link.addEventListener("click", () => {
  // show sign up area
  setTimeout(() => {
    document.getElementById("signin_form").classList.add("zoomOut");
  }, 300);
  document.getElementById("signin_form").style.display = "none";
  signup_form.style.display = "block";
});
signup_form.addEventListener("submit", () => signup());
function signup() {
  const newUserName = document.getElementById("newUserName");
  const newEmail = document.getElementById("newUserEmail");
  const newPass = document.getElementById("newUserPassword");
  firebase
    .auth()
    .createUserWithEmailAndPassword(newEmail.value, newPass.value)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById("message").style.display = "inline";
      document.getElementById("message").innerHTML = errorMessage;
    });
}
function login() {
  firebase
    .auth()
    .signInWithEmailAndPassword(user_email.value, user_password.value)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      handleErrors.innerHTML = errorMessage;
      handleErrors.style.display = "inline";
    });
}
function logout() {
  firebase
    .auth()
    .signOut()
    .then(function() {})
    .catch(error => {
      alert(error);
    });
}
