const baseurl = 'https://ghar-pe-shiksha-backend.vercel.app';
let tutorClassesAvailable = {};
let alreadyAppliedStudentsPost = [];  
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

function getToken(){
  const token = localStorage.getItem('tutorToken');
  return {
      Authorization: `Bearer ${token}`
  }
}

const statusCode = {
    ok: 200,
    Unauthorized: 401
}

function signupTutorError(phoneNumber, email, password, education, teaching, address, selectedClass, subject, mode){
  let signupTutorErrorExist = false;
  const classArray = ['I', 'II', 'III', 'IV', 'V' , 'VI', 'VII', 'VIII', 'IX', 'X'];
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const subjectList = subject.split(',');
  const modeArray = ['Online Mode', 'Offline Mode', 'Video Mode'];

  if(phoneNumber.length !== 10){
    showPostError('phnum');
    signupTutorErrorExist = true;
  }
  if(subjectList.length < 1 || subjectList[0] === 'Select Subjects'){
    showPostError('subjectData')
    signupTutorErrorExist = true;
  }
  const matchedEmail = email.match(mailformat);
  if(matchedEmail === null){
    showPostError('email');
    signupTutorErrorExist = true;
  }
  if(password.length < 1){
    showPostError('password');
    signupTutorErrorExist = true;  
  }
  if(education.length < 1){
    showPostError('education');
    signupTutorErrorExist = true;  
  }
  if(teaching.length < 1){
    showPostError('teaching');
    signupTutorErrorExist = true;  
  }
  if(address.length < 1){
    showPostError('address');
    signupTutorErrorExist = true;    
  }
  if(!classArray.includes(selectedClass) ){
    showPostError('classData');
    signupTutorErrorExist = true;  
  }
  if(!modeArray.includes(mode)){
    showPostError('modeData')
    signupTutorErrorExist = true;
  }
  return signupTutorErrorExist;
}

async function signupTutor() {
    const phoneNumber = document.getElementById('phnum')
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const education = document.getElementById('education');
    const teaching = document.getElementById('teaching');
    const address = document.getElementById('address');
    const selectedClass = document.getElementById('showClass');
    const subject = document.getElementById('subjectList');
    const mode = document.getElementById('showMode');
    const isDataCorrect = signupTutorError(phoneNumber.value.trim(), email.value.trim(), password.value.trim(), education.value.trim(), teaching.value.trim(), address.value.trim(), selectedClass.innerText.trim(), subject.innerText.trim(), mode.innerText.trim());
    if(!isDataCorrect){
        const url = `${baseurl}/tutor/signup`;
        const data = {
            phoneNumber: phoneNumber.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
            education: education.value.trim(),
            experience: teaching.value.trim(),
            address: address.value.trim(),
            selectedClass: selectedClass.innerText.trim(),
            subjects: subject.innerText.trim(),
            mode: mode.innerText.trim()
        }
        try{
          const response  = await postData(url, data);
          if(response.status === statusCode.ok){
            email.value = '';
            phoneNumber.value= '';
            password.value = '';
            education.value = '';
            teaching.value = '';
            address.value = '';
            selectedClass.innerText = 'Select Class'
            moveToLogin();
            resetTutorSignupForm(phoneNumber, email, password, education, teaching, address, selectedClass, subject, mode);
            showSuccessMessage('signupSuccess');
          }else{
              showError('errorUser')
          }
        }catch(error){
          console.log(error);
        }
    }
}
function resetTutorSignupForm(phoneNumber, email, password, education, teaching, address, selectedClass, subject, mode){
  const subjectSelector = ['one', 'two', 'three','four', 'five', 'six', 'seven','eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen'];
  for(let subject of subjectSelector){
      const subjectMarked = document.getElementById(subject);
      subjectMarked.checked = false;
  }
  phoneNumber.value = 'Phone Number';
  phoneNumber.style.color = 'gray';
  email.value = 'Email Address';
  email.style.color = 'gray';
  password.placeholder = 'Password';
  password.style.color = 'gray';
  education.value = 'Education';
  education.style.color = 'gray';
  teaching.value = 'Experience of Teaching';
  teaching.style.color = 'gray';
  selectedClass.innerText = 'Select Class';
  selectedClass.style.color = 'gray';
  subject.innerText = 'Select Subjects';
  subject.style.color = 'gray';
  mode.innerText = 'Select Mode';
  mode.style.color = 'gray';
  address.value = 'Residential Address';
  address.style.color = 'gray';
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

async function loginTutor(){
  const phoneNumber =  document.getElementById('phoneNumber');
  const password = document.getElementById('pwd');
  const loginDataCorrect = loginError(phoneNumber.value.trim(), password.value.trim());
  if(loginDataCorrect){
    const url = `${baseurl}/tutor/login`;
    const data = {
        phoneNumber: phoneNumber.value.trim(),
        password: password.value.trim()
    }
    try{
      const response = await postData(url, data);
      if(response.status === statusCode.ok){
        const responseValue = await response.json();
        const token = responseValue.token;
        localStorage.setItem('tutorToken', token);
        window.location.href = "http://127.0.0.1:5500/tutorDashboard.html"
      }else{
        showError('loginerror')
      }
    }catch(error){
      console.log(error);
    }
  }
}

async function fetchClassesAvailable(token){
  const url = `${baseurl}/tutor/classesAvailable`;
  try{
      tutorClassesAvailable = await getData(url, {
          Authorization: `Bearer ${token}`
      })
      return tutorClassesAvailable;
  }catch (error){
      console.log(error);
  }
}

function fillCurrentAddress(){
  let url = document.location.href;
  let params = url.split('?')[1];
  if(params){
    let address = params.split("=")[1];
    if(address){
      document.getElementById('address').value = decodeURI(address);
    }
  }
}
async function checkTutorAlreadyLoggedIn(){
  fillCurrentAddress();
  const currentToken = localStorage.getItem('tutorToken');
  if(currentToken){
      const isUserAlreadyLogIn = await fetchClassesAvailable(currentToken);
      if(isUserAlreadyLogIn && isUserAlreadyLogIn.status === statusCode.ok){
          window.location.href = "http://127.0.0.1:5500/tutorDashboard.html";
      }
  }
}

async function tutorAppliedStudent(){
  const urlStudentAppliedTutor = `${baseurl}/tutor/studentApplied`;
  try{
      let studentResponse = await getData(urlStudentAppliedTutor, getToken());
      studentResponse = await studentResponse.json();
      for(let post of studentResponse.data){
          if(post.tutorApplied === 't'){
              alreadyAppliedStudentsPost.push(`${post.requirementid}-${post.studentPhoneNumber}`)
          }
      }
  }catch(error){
      console.log(error);
  }
}

async function listClassAvailable(data){
  const response = await data.json();
  tutorClassesAvailable = response;
  await tutorAppliedStudent();
  const posts = response.data;
  const parent = document.getElementsByClassName('applied-posts')[0];
  parent.innerHTML = '';
  parent.appendChild(appendTutorsHeading('Classes Available'));
  const postedReqCount = document.getElementById('postedReqCount');
  postedReqCount.innerText = `${posts.length} Requirements Posted`
  for(let idx = 0;idx < posts.length ; idx++){
      createPostTemplate(posts[idx], false, alreadyAppliedStudentsPost.includes(`${posts[idx].requirementid}-${posts[idx].phoneNumber}`), false, true);
  }
}
async function checkTutorAuthenticated(){
    const currentToken = localStorage.getItem('tutorToken');
    if(currentToken === null){
        window.location.href = "http://127.0.0.1:5500/tutor.html";
    } else {
        const userAuthentication = await fetchClassesAvailable(currentToken);
        if(userAuthentication.status !== statusCode.ok){
            window.location.href = "http://127.0.0.1:5500/tutor.html";
            localStorage.clear();
        }else{
          listClassAvailable(userAuthentication);
        }
    }
}

async function resetTutorPassword(){
  const oldp = document.getElementById('oldpwd');
  const newpwd = document.getElementById('newpwd');
  const cnfnewpwd = document.getElementById('cnfnewpwd');
  const isDataCorrect = checkStudentChangePasswordData(oldp.value.trim(), newpwd.value.trim(), cnfnewpwd.value.trim());
  if(isDataCorrect){
      const url = `${baseurl}/tutor/passwordUpdate`;
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

function logout(){
  localStorage.clear();
  window.location.href = `http://127.0.0.1:5500/student.html`;
}

