import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
//   ref,
//   push,
//   onValue,
//   remove,

const appSettings = {
  databaseURL: "https://champions-af948-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app); 
const endorsementsInDB = ref(database, "endorsements");//ref take two arguments, the database and the path to the data(endorsements)

const endorsementsEl = document.getElementById("endorsements-el");
const endorserEl = document.getElementById("from");
const endorsedEl = document.getElementById("to");
const publishEl = document.getElementById("button-el");
const publishedEndorsements = document.getElementById("output-el");


let endorsement = ""

function printEndorsements(endorsements) {
  console.log("endorsement rome Db: ", endorsements);
  let endorsementID = endorsements[0];
  let endorsementValue = endorsements[1];
  // Create a div, add it to the documet and set class
    const newEndorsements = document.createElement("div");
    newEndorsements.setAttribute("class", "endorsements");
    // Add the endorsement to the div
    newEndorsements.appendChild(document.createTextNode(endorsementValue));
    publishedEndorsements.appendChild(newEndorsements);
  
    // remove endorsement from the database
    newEndorsements.addEventListener("click", () => {
      let exactLocationOfEndorsemenInDB = ref(database, `endorsements/${endorsementID}`);

      remove(exactLocationOfEndorsemenInDB, endorsementID);
      console.log("endorsementID: ", endorsementID);
    });}



publishEl.addEventListener("click", () => {
  push(endorsementsInDB, `${endorsementsEl.value}`)

  clearUserInput();
});

function clearUserInput(){
  endorsementsEl.value = "";
}


onValue(endorsementsInDB, function (snapshot){
  publishedEndorsements.innerHTML = "";

  let endorsementArray = Object.entries(snapshot.val()).reverse();
  
  for (let i = 0; i < endorsementArray.length; i++) {
    endorsement = endorsementArray[i];
    printEndorsements(endorsement);
}
});
