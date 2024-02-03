let output = document.getElementById('output');
let showCheckBoxes = true;
let showSubjects = true;
let showMode = true;
let subjectList = new Set();

function showOptions(optionType) {
   let options =
      document.getElementById(`${optionType}`);
   if (showCheckBoxes && optionType === "class") {
      options.style.display = "flex";
      showCheckBoxes = !showCheckBoxes;
   } else if(optionType === "class") {
      options.style.display = "none";
      showCheckBoxes = !showCheckBoxes;
   }
   
   if (showSubjects && optionType === "subjects") {
      options.style.display = "flex";
      showSubjects = !showSubjects;
   } else if(optionType === "subjects") {
      options.style.display = "none";
      showSubjects = !showSubjects;
   }

   if (showMode && optionType === "mode") {
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
function hideDropDown(e) {
    const dropdown = document.querySelector(".dropdown");
    const dropdownSubject = document.querySelector(".dropdown-subject");
    const classSelect = document.querySelector("#class");
    const subject = document.querySelector("#subjects");
    const mode = document.querySelector(".select-mode");
    const drodownMode = document.querySelector("#mode");
    if (dropdown && !dropdown.contains(e.target)) {
        classSelect.style.display = "none";
        showCheckBoxes = true;
    }
    if(dropdownSubject && !dropdownSubject.contains(e.target)){
        subject.style.display = "none";
        showSubjects = true;
    }
    if(mode && !mode.contains(e.target)){
        drodownMode.style.display = "none";
        showMode = true;
    }
    const showSubjectsData = document.getElementById("subjectList");
    if(subjectList.size == 0){
        subjectList.add("Select Subjects");
        showSubjectsData.style.color = "grey";
    } else if(subjectList.size > 0 && !subjectList.has("Select Subjects")){
        showSubjectsData.style.color = "black";       
    }

    if(subjectList.size > 4){
        showSubjectsData.style.fontSize = "xx-small";
    }else{
        showSubjectsData.style.fontSize = "15px";
    }
    const data = Array.from(subjectList).join(", ")
    showSubjectsData.innerText = data;
}

function getClass(value){
    const classData = document.getElementById("showClass");
    classData.innerText = value;
    classData.style.color = "black"
}

window.addEventListener("click", hideDropDown);
