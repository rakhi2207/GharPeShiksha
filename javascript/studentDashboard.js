let matchedTutorData = []; 
let appliedTutorEmail = [];
let tutorAppliedData = [];
async function studentAppliedTutor(){
    const urlStudentAppliedTutor = `${baseurl}/student/tutorApplied`;
    try{
        let studentResponse = await getData(urlStudentAppliedTutor, getToken());
        studentResponse = await studentResponse.json();
        for(let post of studentResponse.data){
            if(post.studentApplied === 't'){
                appliedTutorEmail.push(post.tutorPhoneNumber)
            }
        }
    }catch(error){
        console.log(error);
    }
}
async function matchedTutorAsStudentRequirement(countCall){
    const url = `${baseurl}/student/matchedTutor`;
    const subjects = [];
    const classes = [];
    for(let post of studentAppliedTutorPost.data){
        classes.push(post.studyClass);
        subjects.push(post.subjects);
    }
    const data = {
        subject: subjects,
        class: classes
    }
    try{
        console.log(matchedTutorData);
        if(matchedTutorData.length < 1){
            const response = await postData(url, data, getToken());
            const responsejson = await response.json();
            matchedTutorData = responsejson.data;
            const matchTutorCount = document.getElementById('matchTutorCount');
            matchTutorCount.innerText = `${matchedTutorData.length} Matching Tutors`
        }
        if(!countCall){
            await studentAppliedTutor();
            const parent = document.getElementsByClassName('tutors-list')[0];
            parent.innerHTML = '';
            parent.appendChild(appendTutorsHeading('Based on your recent requirement we found the following tutors'));
            for(let idx = 0 ; idx < matchedTutorData.length ; idx++){
                createPostTemplate(matchedTutorData[idx], true, idx, appliedTutorEmail.includes(matchedTutorData[idx].phoneNumber));
            }
        }
    }catch(error){
        console.log(error);
    }
}

async function appliedTutorList(callCount){
    const url = `${baseurl}/student/tutorAppliedDetails`;
    try{
        if(tutorAppliedData.length < 1){
            const response = await getData(url, getToken());
            const data = await response.json();
            tutorAppliedData = data.data;
            const respondedTutorCount = document.getElementById('respondedTutorCount');
            respondedTutorCount.innerText = `${tutorAppliedData.length} Responded Tutors`
        }
        if(!callCount){
            matchedTutorData = tutorAppliedData ;
            await studentAppliedTutor();
            const parent = document.getElementsByClassName('applied-tutors-list')[0];
            parent.innerHTML = '';
            parent.appendChild(appendTutorsHeading('Tutor Applied as per your requirement'));
            for(let idx = 0 ; idx < tutorAppliedData.length ; idx++){
                createPostTemplate(tutorAppliedData[idx], true, idx, appliedTutorEmail.includes(tutorAppliedData[idx].phoneNumber), true);
            }
        }
    }catch(error){
        console.log(error);
    }
}

async function listPostAppliedByStudent(data){
    const response = await data.json();
    studentAppliedTutorPost = response;
    await matchedTutorAsStudentRequirement(true)
    await appliedTutorList(true);
    const posts = response.data;
    const parent = document.getElementsByClassName('applied-posts')[0];
    parent.innerHTML = '';
    parent.appendChild(appendTutorsHeading('Your Requirements'));
    const postedReqCount = document.getElementById('postedReqCount');
    postedReqCount.innerText = `${posts.length} Requirements Posted`
    for(let post of posts){
        createPostTemplate(post, false,0, false, false);
    }
}   

function changeDashboard(selectedTab){
    const appliedPost = document.getElementsByClassName('applied-posts')[0];
    const newRequirement = document.getElementsByClassName('tutors-list')[0];
    const appliedTutorRequirement = document.getElementsByClassName('applied-tutors-list')[0];
    const postRequirement = document.getElementsByClassName('post-requirement')[0];
    const passwordChange = document.getElementsByClassName('password-change')[0];

    switch(selectedTab){
        case 'postedReq':
            appliedPost.style.display = 'revert';
            newRequirement.style.display = 'none';
            postRequirement.style.display = 'none';
            passwordChange.style.display = 'none';
            appliedTutorRequirement.style.display = 'none';
            hideError('pwdupd');
            break;
        case 'newRequirement':
            appliedPost.style.display = 'none';
            newRequirement.style.display = 'none';
            postRequirement.style.display = 'revert';
            passwordChange.style.display = 'none';
            appliedTutorRequirement.style.display = 'none';
            hideError('pwdupd');
            break;
        case 'responded':
            appliedPost.style.display = 'none';
            newRequirement.style.display = 'none';
            postRequirement.style.display = 'none';
            passwordChange.style.display = 'none';
            appliedTutorRequirement.style.display = 'revert';
            hideError('pwdupd');
            appliedTutorList(false);
            break;
        case 'responded1':
            matchedTutorAsStudentRequirement(false);
            appliedPost.style.display = 'none';
            newRequirement.style.display = 'revert';
            postRequirement.style.display = 'none';
            passwordChange.style.display = 'none';
            appliedTutorRequirement.style.display = 'none';
            hideError('pwdupd');
            break;
        case 'passwordChange':
            appliedPost.style.display = 'none';
            newRequirement.style.display = 'none';
            postRequirement.style.display = 'none';
            passwordChange.style.display = 'flex';
            appliedTutorRequirement.style.display = 'none';
            hideError('pwdupd');
            break;
    }
    document.getElementsByClassName('postedReq')[0].classList.remove('active');
    document.getElementsByClassName('newRequirement')[0].classList.remove('active');
    document.getElementsByClassName('responded1')[0].classList.remove('active');
    document.getElementsByClassName('responded')[0].classList.remove('active');
    if(selectedTab !== 'passwordChange')
     document.getElementsByClassName(selectedTab)[0].classList.add('active');
}

function logout(){
    localStorage.clear();
    window.location.href = `http://127.0.0.1:5500/student.html`;
}