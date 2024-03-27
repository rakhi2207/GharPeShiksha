let output = document.getElementById('output');
let showCheckBoxes = true;
let showSubjects = true;
let showMode = true;
let subjectList = new Set();

function hidePostError(field){
   const error = document.getElementById(field);
   error.style.border = '1px solid grey';
   const user = document.getElementById('errorUser');
   if(user){
       user.style.display = 'none';
   }
}
function showPostError(field){
    const error = document.getElementById(field);
    error.style.border = '1px solid red';
}

function showError(field){
    const ephnum = document.getElementById(field);
    ephnum.style.display = 'block'
    ephnum.style.color = 'red'
}
function showSuccessMessage(field){
    const ephnum = document.getElementById(field);
    ephnum.style.display = 'block'
    ephnum.style.color = '	#32CD32'
}

function hideError(field){
    const ephnum = document.getElementById(field);
    if(ephnum){
        ephnum.style.display = 'none'
    }
    const user = document.getElementById('errorUser');
    if(user){
        user.style.display = 'none';
    }
}
 
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
   if(subjectList.size == 0 && showSubjectsData){
       subjectList.add("Select Subjects");
       showSubjectsData.style.color = "grey";
   } else if(subjectList.size > 0 && !subjectList.has("Select Subjects") && showSubjectsData){
       showSubjectsData.style.color = "black";       
   }

   if(subjectList.size > 4 && showSubjectsData){
       showSubjectsData.style.fontSize = "xx-small";
   }else if(showSubjectsData){
       showSubjectsData.style.fontSize = "15px";
   }
   if(showSubjectsData){
    const data = Array.from(subjectList).join(", ")
    showSubjectsData.innerText = data;
   }
}

window.addEventListener("click", hideDropDown);

async function applyStudentClasses(event){
    const tutorsdata = event.target.id.split("-");
    const url = `${baseurl}/tutor/tutorApplied`;
    const data = {
        studentPhoneNumber: tutorsdata[1],
        studentrequirementId:  tutorsdata[0]
    }
    try{
        const response = await postData(url, data, getToken());
        if(response.status === statusCode.ok){
            const applyButton = document.getElementById(event.target.id);
            disableApply(applyButton);
        }
    }catch(error){
        console.log(error);
    }
}

function disableApply(applyButton){
    applyButton.style.cursor = 'auto';
    applyButton.style.opacity = '0.2';
}
function createApplyButton(id, phoneNumber, isStudentAlreadyApplied, isTutorPage){
    const applyDiv= document.createElement('div');
    applyDiv.classList.add('applying-button');
    const applyButton = document.createElement('button');
    applyButton.innerText = 'Apply';
    applyButton.classList.add('apply-tutor');
    applyButton.setAttribute('id', `${id}-${phoneNumber}`);
    applyDiv.appendChild(applyButton);
    applyButton.addEventListener('click',isTutorPage ? applyStudentClasses : applyforTutor)
    if(isStudentAlreadyApplied){
        disableApply(applyButton);
    }
    return applyDiv;
}

function appendTutorsHeading(data){
    const p = document.createElement('p');
    p.classList.add('tutors-list-title');
    p.innerHTML = data;
    return p;
}

function createPostTemplate(post, isMatchedTutorPage , isStudentAlreadyApplied, issAppliedTutorPage, isTutorPage){
    let parentClass = isMatchedTutorPage ? 'tutors-list' : 'applied-posts';
    parentClass = issAppliedTutorPage ? 'applied-tutors-list' : parentClass;
    const parent = document.getElementsByClassName(parentClass)[0];
    const firstDiv = document.createElement('div');
    firstDiv.classList.add('tutors-data');
    const secondDiv = document.createElement('div');
    secondDiv.classList.add('card');
    secondDiv.classList.add('mb-3')
    const thirdDiv = document.createElement('div');
    thirdDiv.classList.add('card-body');
    thirdDiv.classList.add('tutor-info');
    const heading = document.createElement('h5');
    heading.classList.add('card-title');
    const locationP = document.createElement('div');
    const locationSpan = document.createElement('span');
    locationSpan.classList.add('details')
    locationP.classList.add('info');
    const locationImg = document.createElement('img');
    locationImg.src = './assets/images/icons8-location-48.png';
    locationImg.classList.add('mock-img');
    locationP.appendChild(locationImg);
    const locationPText = document.createElement('p');
    locationP.appendChild(locationPText);
    locationP.appendChild(locationSpan);

    const locationP1 = document.createElement('div');
    const locationSpan1 = document.createElement('span');
    locationSpan1.classList.add('details')
    locationP1.classList.add('info');
    const locationImg1 = document.createElement('img');
    locationImg1.src = './assets/images/icons8-experience-48.png';
    locationImg1.classList.add('mock-img');
    locationP1.appendChild(locationImg1);
    const locationPText1 = document.createElement('p');
    locationP1.appendChild(locationPText1);
    locationP1.appendChild(locationSpan1);

    const locationP2 = document.createElement('div');
    const locationSpan2 = document.createElement('span');
    locationSpan2.classList.add('details')
    locationP2.classList.add('info');
    const locationImg2 = document.createElement('img');
    locationImg2.src = './assets/images/icons8-class-100.png';
    locationImg2.classList.add('mock-img');
    locationP2.appendChild(locationImg2);
    const locationPText2 = document.createElement('p');
    locationP2.appendChild(locationPText2);
    locationP2.appendChild(locationSpan2);

    const classData = isMatchedTutorPage ? post.selectedClass : post.studyClass;
    heading.innerText = `${post.mode} Tutor for ${post.subjects}, class ${classData}`;
    locationPText.innerText = `Area: `;
    locationSpan.innerText = post.address;
    locationPText1.innerText = isMatchedTutorPage ? `Experience: ` :`Budget: `;
    locationSpan1.innerText = isMatchedTutorPage ? `${post.experience} years` :`${post.budget} per month`;
    locationPText2.innerText = isMatchedTutorPage ? `Graduation: ` :`Classes: `;
    locationSpan2.innerText = isMatchedTutorPage ? `${post.education}` : `${post.noOfClass} per week`;

    thirdDiv.appendChild(heading);
    thirdDiv.appendChild(locationP);
    thirdDiv.appendChild(locationP1);
    thirdDiv.appendChild(locationP2);
    secondDiv.appendChild(thirdDiv);
    firstDiv.appendChild(secondDiv);
    if(isMatchedTutorPage || isTutorPage){
        const applyButton = createApplyButton(post.requirementid, post.phoneNumber,isStudentAlreadyApplied, isTutorPage);
        thirdDiv.appendChild(applyButton);
    }
    parent.appendChild(firstDiv);
}

function checkStudentChangePasswordData(oldp, newpwd, cnfnewpwd){
    let isDataCorrect = true;
    if(oldp.length < 1){
        showError('oldpwder');
        isDataCorrect = false;
    }
    if(newpwd.length < 1 || cnfnewpwd.length < 1 || newpwd !== cnfnewpwd){
        showError('newpwder');
        isDataCorrect = false;
    }
    return isDataCorrect;
}

function resetPasswordField(oldp, newpwd, cnfnewpwd){
    oldp.value = '';
    newpwd.value = '';
    cnfnewpwd.value = '';
}