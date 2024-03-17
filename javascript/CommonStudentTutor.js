function moveToSignup() {
    const login = document.getElementsByClassName("login")[0];
    const signup = document.getElementsByClassName("signup")[0];
    const loginButton = document.getElementsByClassName("toggle-button1")[0];
    const signupButton = document.getElementsByClassName("toggle-button2")[0];
    login.style.display = "none";
    signup.style.display = "flex";
    loginButton.style.backgroundColor = "white";
    loginButton.style.borderColor = "#337ab7";
    loginButton.style.color = "#337ab7";
    signupButton.style.backgroundColor = "#337ab7";
    signupButton.style.color = "white";
}

function moveToLogin(){
    const login = document.getElementsByClassName("login")[0];
    const signup = document.getElementsByClassName("signup")[0];
    const loginButton = document.getElementsByClassName("toggle-button1")[0];
    const signupButton = document.getElementsByClassName("toggle-button2")[0];
    login.style.display = "flex";
    signup.style.display = "none";
    signupButton.style.backgroundColor = "white";
    signupButton.style.borderColor = "#337ab7";
    signupButton.style.color = "#337ab7";
    loginButton.style.backgroundColor = "#337ab7";
    loginButton.style.color = "white";
}
let output = document.getElementById('output');
let showCheckBoxes = true;
let showSubjects = true;
let showMode = true;
let subjectList = new Set();
function showOptions(optionType) {
   let options =
      document.getElementById(`${optionType}`);
   if (showCheckBoxes && optionType === "class") {
      hidePostError('classData');
      options.style.display = "flex";
      showCheckBoxes = !showCheckBoxes;
   } else if(optionType === "class") {
      options.style.display = "none";
      showCheckBoxes = !showCheckBoxes;
   }
   
   if (showSubjects && optionType === "subjects") {
      hidePostError('subjectData');
      options.style.display = "flex";
      showSubjects = !showSubjects;
   } else if(optionType === "subjects") {
      options.style.display = "none";
      showSubjects = !showSubjects;
   }

   if (showMode && optionType === "mode") {
      hidePostError('modeData');
      options.style.display = "flex";
      showMode = !showMode;
   } else if(optionType === "mode") {
      options.style.display = "none";
      showMode = !showMode;
   }
}

function getMode(mode){
    const classData = document.getElementById("showMode");
    classData.innerText = mode;
    classData.style.color = "black"
}
function getSubjects(value){
   subjectList = new Set();
   const one = document.getElementById("one");
   const two = document.getElementById("two");
   const three = document.getElementById("three");
   const four = document.getElementById("four");
   const five = document.getElementById("five");
   const six = document.getElementById("six");
   const seven = document.getElementById("seven");
   const eight = document.getElementById("eight");
   const nine = document.getElementById("nine");
   const ten = document.getElementById("ten");
   const eleven = document.getElementById("eleven");
   const twelve = document.getElementById("twelve");
   const thirteen = document.getElementById("thirteen");
   if(one.checked){
    subjectList.add("English");
   }
   if(two.checked){
    subjectList.add("Hindi");
   } 
   if(three.checked){
    subjectList.add("Maths");
   }
   if(four.checked){
    subjectList.add("Physics");
   }
   if(five.checked){
    subjectList.add("Chemistry");
   }
   if(six.checked){
    subjectList.add("Social Science");
   }
   if(seven.checked){
    subjectList.add("General Knowledge");
   }
   if(eight.checked){
    subjectList.add("Computer Science");
   }
   if(nine.checked){
    subjectList.add("Accounts");
   }
   if(ten.checked){
    subjectList.add("Geography");
   }
   if(eleven.checked){
    subjectList.add("French");
   }
   if(twelve.checked){
    subjectList.add("Political Science");
   }
   if(thirteen.checked){
    subjectList.add("Economics");
   }
}

function getClass(value){
    const classData = document.getElementById("showClass");
    classData.innerText = value;
    classData.style.color = "black"
}

