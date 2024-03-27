const baseurl = 'https://ghar-pe-shiksha-backend.vercel.app';
let studentAppliedTutorPost = {};
async function postData(url = "", data = {}, token) {
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
    const isDataCorrect = signupError(phoneNumber.value.trim(), email.value.trim(),password.value.trim());
    if(isDataCorrect){
        const api = `${baseurl}/student/signup`;
        const data = {
            phoneNumber: phoneNumber.value.trim(),
            email: email.value.trim(),
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
                localStorage.setItem('studentToken', token);
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
    const currentToken = localStorage.getItem('studentToken');
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
    const currentToken = localStorage.getItem('studentToken');
    if(currentToken){
        const isUserAlreadyLogIn = await fetchPostApplied(currentToken);
        if(isUserAlreadyLogIn && isUserAlreadyLogIn.status === statusCode.ok){
            window.location.href = "http://127.0.0.1:5500/studentDashboard.html";
        }
    }
}

async function applyforTutor(event){
    const idsData = event.target.id.split("-");
    const url = `${baseurl}/student/studentAppliedTutor`;
    const data = {
        tutorPhoneNumber: idsData[1],
        studentrequirementId: idsData[0]
    }
    try{
        const response = await postData(url, data, getToken());
        if(response.status === statusCode.ok){
            const applyButton = document.getElementById(`${idsData[0]}-${idsData[1]}`);
            disableApply(applyButton);
        }
    }catch(error){
        console.log(error);
    }
}


function getToken(){
    const token = localStorage.getItem('studentToken');
    return {
        Authorization: `Bearer ${token}`
    }
}

function resetTutorPostForm(classSelected, subjects, mode, address , noOfClass, budget){
    const subjectSelector = ['one', 'two', 'three','four', 'five', 'six', 'seven','eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen'];
    for(let subject of subjectSelector){
        const subjectMarked = document.getElementById(subject);
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
async function resetPassword(){
    const oldp = document.getElementById('oldpwd');
    const newpwd = document.getElementById('newpwd');
    const cnfnewpwd = document.getElementById('cnfnewpwd');
    const isDataCorrect = checkStudentChangePasswordData(oldp.value.trim(), newpwd.value.trim(), cnfnewpwd.value.trim());
    if(isDataCorrect){
        const url = `${baseurl}/student/passwordUpdate`;
        const data = {
            oldPassword: oldp.value.trim(),
            password: newpwd.value.trim()
        }
        const response = await postData(url, data, getToken());
        if(response.status === statusCode.Unauthorized){
            showError('oldpwder');
        }
        if(response.status === statusCode.ok){
            showSuccessMessage('pwdupd');
            resetPasswordField(oldp, newpwd, cnfnewpwd)
        }
    }
}