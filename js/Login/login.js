import { config } from "./config";
import * as firebase from "firebase";
/**
 * @param  {function Login(callback= firebase) {
   // sign in and sign up fuction
 }} callback
 */
export default function Login(callback) {
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // style display for form
      getElement("auth").style.display = "none";
      getElement("content").style.display = "block";
      // link function
      let userInfo = firebase.auth().currentUser;
      if (userInfo != null) {
        getElement("user_info").innerHTML = userInfo.email;
      }
      callback(firebase);
    } else {
      // logout.styling
      getElement("content").style.display = "none";
      getElement("auth").style.display = "block";
    }
  });
  getElement("refresh_page").addEventListener("click", () =>
    window.location.reload()
  );
  getElement("signin_form").addEventListener("click", () => signin(firebase));
  getElement("logout").addEventListener("click", () => signout(firebase));
  getElement("signup_form").addEventListener("submit", () => signup(firebase));
  getElement("signup_link").addEventListener("click", e => {
    setTimeout(() => {
      getElement("signin_form").classList.add("zoomOut");
    }, 300);
    getElement("signin_form").style.display = "none";
    getElement("signup_form").style.display = "block";
  });

  function getElement(id) {
    return document.getElementById(id);
  }

  function signin() {
    const user_email = getElement("email").value;
    const user_password = getElement("password").value;
    firebase
      .auth()
      .signInWithEmailAndPassword(user_email, user_password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        getElement("handleErrors").innerHTML = errorMessage;
        getElement("handleErrors").style.display = "inline";
      });
  }
  function signout() {
    firebase
      .auth()
      .signOut()
      .then(function() {})
      .catch(error => {
        alert(error);
      });
  }
  function signup() {
    const newUserName = getElement("newUserName");
    const newEmail = getElement("newUserEmail");
    const newPass = getElement("newUserPassword");
    firebase
      .auth()
      .createUserWithEmailAndPassword(newEmail.value, newPass.value)
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        getElement("message").style.display = "inline";
        getElement("message").innerHTML = errorMessage;
      });
  }
}
