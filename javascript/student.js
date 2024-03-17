const baseurl = 'http://localhost:5000';
let studentAppliedTutorPost = {};
async function postData(url = "", data = {}, token) {
    console.log(url);
    console.log(data);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ... token
      },
      body: JSON.stringify(data),
    });
    return response; 
}
async function getData(url = "", token) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ... token
      },
    });
    return response; 
}

const statusCode = {
    ok: 200,
    Unauthorized: 401
}

function signupStudent() {
    const phoneNumber = document.getElementById('phoneNumber')
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const isDataCorrect = signupError(phoneNumber.value.trim(), email.value,password.value.trim());
    if(isDataCorrect){
        const api = `${baseurl}/student/signup`;
        const data = {
            phoneNumber: phoneNumber.value.trim(),
            email: email.value,
            password: password.value.trim()
        }
        postData(api, data)
        .then(response => {
            if(response.status === statusCode.ok){
                email.value = '';
                phoneNumber.value= '';
                password.value = '';
                moveToLogin();
                const success = document.getElementById('signupSuccess');
                success.style.display = 'block';
            }else{
                showError('errorUser')
            }
        })
        .catch(err=> {
            console.log(err);
        });
    }
}
function loginStudent() {
    const phoneNumber = document.getElementById('loginph');
    const password = document.getElementById('loginpw');
    const isDataValid = loginError(phoneNumber.value, password.value.trim());
    if(isDataValid){
        const api = `${baseurl}/student/login`;
        const data = {
            phoneNumber: phoneNumber.value,
            password: password.value.trim()
        }
        postData(api, data)
        .then(async (response) => {
            if(response.status === statusCode.ok){
                const responseValue = await response.json();
                const token = responseValue.token;
                localStorage.setItem('token', token);
                window.location.href = "http://127.0.0.1:5500/studentDashboard.html"
            }else{
                showError('loginerror')
            }
        })
        .catch(err=> {
            console.log(err);
        });   
    }
}

function showError(field){
    const ephnum = document.getElementById(field);
    ephnum.style.display = 'block'
    ephnum.style.color = 'red'
}

function hideError(field){
    const ephnum = document.getElementById(field);
    ephnum.style.display = 'none'
    const user = document.getElementById('errorUser');
    user.style.display = 'none'
}

function signupError(phoneNumber, email, password){
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let dataError = false;
    if(phoneNumber.length !== 10){
        showError('errorPhNum');
        dataError = true;
    }
    const matchedEmail = email.match(mailformat);
    if(matchedEmail === null){
        showError('errorEmail');
        dataError = true;
    }

    if(password.length < 1){
        showError('errorPass');
        dataError = true;
    }

    if(dataError){
        return false;
    }
    return true;
}
function loginError(phoneNumber, password){
    if(phoneNumber.length !== 10){
        showError('loginerror');
        return false;
    }

    if(password.length < 1){
        showError('loginerror');
        return false;
    }
    return true;
}

async function fetchPostApplied(token){
    console.log('fetchPostApplied')
    const url = `${baseurl}/student/postApplied`;
    try{
        studentAppliedTutorPost = await getData(url, {
            Authorization: `Bearer ${token}`
        })
        return studentAppliedTutorPost;
    }catch (error){
        console.log(error);
    }
}
async function checkUserAuthenticated(){
    const currentToken = localStorage.getItem('token');
    if(currentToken === null){
        window.location.href = "http://127.0.0.1:5500/student.html";
    } else {
        const userAuthentication = await fetchPostApplied(currentToken);
        if(userAuthentication.status !== statusCode.ok){
            window.location.href = "http://127.0.0.1:5500/student.html";
            localStorage.clear();
        }else{
            listPostAppliedByStudent(userAuthentication);
        }
    }
}

async function checkUserAlreadyLoggedIn(){
    const currentToken = localStorage.getItem('token');
    if(currentToken){
        const isUserAlreadyLogIn = await fetchPostApplied(currentToken);
        if(isUserAlreadyLogIn && isUserAlreadyLogIn.status === statusCode.ok){
            window.location.href = "http://127.0.0.1:5500/studentDashboard.html";
        }
    }
}

function disableApply(applyButton){
    applyButton.style.cursor = 'auto';
    applyButton.style.opacity = '0.2';
}
function createApplyButton(id, isStudentAlreadyApplied){
    const applyDiv= document.createElement('div');
    applyDiv.classList.add('applying-button');
    const applyButton = document.createElement('button');
    applyButton.innerText = 'Apply';
    applyButton.classList.add('apply-tutor');
    applyButton.setAttribute('id', id);
    applyDiv.appendChild(applyButton);
    applyButton.addEventListener('click', applyforTutor)
    if(isStudentAlreadyApplied){
        disableApply(applyButton);
    }
    return applyDiv;
}

async function applyforTutor(event){
    const tutorId = event.target.id;
    const url = `${baseurl}/student/studentAppliedTutor`;
    const data = {
        tutorPhoneNumber: matchedTutorData[tutorId].phoneNumber
    }
    try{
        const response = await postData(url, data, getToken());
        if(response.status === statusCode.ok){
            const applyButton = document.getElementById(tutorId);
            disableApply(applyButton);
        }
    }catch(error){
        console.log(error);
    }
}

function createPostTemplate(post, isMatchedTutorPage , id, isStudentAlreadyApplied){
    const parentClass = isMatchedTutorPage ? 'tutors-list' : 'applied-posts';
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
    if(isMatchedTutorPage){
        const applyButton = createApplyButton(id, isStudentAlreadyApplied);
        thirdDiv.appendChild(applyButton);
    }
    parent.appendChild(firstDiv);
}

function appendTutorsHeading(data){
    const p = document.createElement('p');
    p.classList.add('tutors-list-title');
    p.innerHTML = data;
    return p;
}

async function listPostAppliedByStudent(data){
    const response = await data.json();
    studentAppliedTutorPost = response;
    console.log('check', studentAppliedTutorPost);
    const posts = response.data;
    const parent = document.getElementsByClassName('applied-posts')[0];
    parent.innerHTML = '';
    parent.appendChild(appendTutorsHeading('Your Requirements'));
    for(let post of posts){
        createPostTemplate(post, false,0, false);
    }
    console.log(response);
}   

function getToken(){
    const token = localStorage.getItem('token');
    return {
        Authorization: `Bearer ${token}`
    }
}

function resetTutorPostForm(classSelected, subjects, mode, address , noOfClass, budget){
    const subjectSelector = ['one', 'two', 'three','four', 'five', 'six', 'seven','eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen'];
    for(let subject of subjectSelector){
        const subjectMarked = document.getElementById(subject);
        console.log(subjectMarked);
        subjectMarked.checked = false;
    }
    classSelected.innerText = 'Select Class';
    classSelected.style.color = 'gray';
    subjects.innerText = 'Select Subjects';
    subjects.style.color = 'gray';
    mode.innerText = 'Select Mode';
    mode.style.color = 'gray';
    address.value = 'Residential Address';
    address.style.color = 'gray';
    noOfClass.value = 'No of classes in week';
    noOfClass.style.color = 'gray';
    budget.value = 'Budget for month in Rs';
    budget.style.color = 'gray';
}
async function applyTutorPost(){
    const classSelected = document.getElementById('showClass');
    const subjects = document.getElementById('subjectList');
    const mode = document.getElementById('showMode');
    const address = document.getElementById('address');
    const noOfClass = document.getElementById('classes');
    const budget = document.getElementById('budget');
    const isDataCorrect = checkTutorPostData(classSelected.innerText, subjects.innerText, mode.innerText, address.value, noOfClass.value, budget.value);
    if(isDataCorrect){
        try{
            const data = {
                class: classSelected.innerText,
                subjects: subjects.innerText,
                mode: mode.innerText,
                address: address.value,
                noOfClasses: noOfClass.value,
                budget: budget.value,
            }
            console.log('post data', data);
            const url = `${baseurl}/student/studentTutorRequirement`;
            const response = await postData(url, data, getToken());
            if(response.status === statusCode.ok){
                resetTutorPostForm(classSelected, subjects, mode, address, noOfClass, budget);
                changeDashboard('postedReq');
                checkUserAuthenticated();
            }
        } catch(error){

        }
    }
}

function showPostError(field){
    const error = document.getElementById(field);
    error.style.border = '1px solid red';
}

function hidePostError(field){
    const error = document.getElementById(field);
    error.style.border = '1px solid grey';
}
function checkTutorPostData(classSelected, subjects, mode, address, noOfClass, budget){
    const classArray = ['I', 'II', 'III', 'IV', 'V' , 'VI', 'VII', 'VIII', 'IX', 'X'];
    const modeArray = ['Online Mode', 'Offline Mode', 'Video Mode'];
    const subjectList = subjects.split(',');
    let isDataCorrect = true;

    if(!classArray.includes(classSelected)){
        showPostError('classData');
        isDataCorrect = false;
    }
    if(subjectList.length < 1 || subjectList[0] === 'Select Subjects'){
        showPostError('subjectData')
        isDataCorrect = false;
    }
    if(!modeArray.includes(mode)){
        showPostError('modeData')
        isDataCorrect = false;
    }
    if(address.length < 1){
        showPostError('address')
        isDataCorrect = false;
    }
    if(+noOfClass < 1){
        showPostError('classes')
        isDataCorrect = false;
    }
    if(+budget < 500){
        showPostError('budget')
        isDataCorrect = false;
    }

    return isDataCorrect;
}

function resetPassword(){
    
}