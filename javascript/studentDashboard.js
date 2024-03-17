let matchedTutorData = []; 
let appliedTutorEmail = [];
async function matchedTutorAsStudentRequirement(){
    const url = `${baseurl}/student/matchedTutor`;
    const urlStudentAppliedTutor = `${baseurl}/student/tutorApplied`;
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
        if(matchedTutorData.length < 1){
            const response = await postData(url, data, getToken());
            let studentResponse = await getData(urlStudentAppliedTutor, getToken());
            studentResponse = await studentResponse.json();
            for(let post of studentResponse.data){
                if(post.studentApplied === 't'){
                    appliedTutorEmail.push(post.tutorPhoneNumber)
                }
            }
            const responsejson = await response.json();
            matchedTutorData = responsejson.data;
        }
        const parent = document.getElementsByClassName('tutors-list')[0];
        parent.innerHTML = '';
        parent.appendChild(appendTutorsHeading('Based on your recent requirement we found the following tutors'));
        for(let idx = 0 ; idx < matchedTutorData.length ; idx++){
            createPostTemplate(matchedTutorData[idx], true, idx, appliedTutorEmail.includes(matchedTutorData[idx].phoneNumber));
        }
    }catch(error){
        console.log(error);
    }
}
function changeDashboard(selectedTab){
    const appliedPost = document.getElementsByClassName('applied-posts')[0];
    const newRequirement = document.getElementsByClassName('tutors-list')[0];
    const postRequirement = document.getElementsByClassName('post-requirement')[0];
    const passwordChange = document.getElementsByClassName('password-change')[0];

    switch(selectedTab){
        case 'postedReq':
            appliedPost.style.display = 'revert';
            newRequirement.style.display = 'none';
            postRequirement.style.display = 'none';
            passwordChange.style.display = 'none';
            break;
        case 'newRequirement':
            appliedPost.style.display = 'none';
            newRequirement.style.display = 'none';
            postRequirement.style.display = 'revert';
            passwordChange.style.display = 'none';
            break;
        case 'responded':
            appliedPost.style.display = 'none';
            newRequirement.style.display = 'revert';
            postRequirement.style.display = 'none';
            passwordChange.style.display = 'none';
            break;
        case 'responded1':
            matchedTutorAsStudentRequirement();
            appliedPost.style.display = 'none';
            newRequirement.style.display = 'revert';
            postRequirement.style.display = 'none';
            passwordChange.style.display = 'none';
            break;
        case 'passwordChange':
            appliedPost.style.display = 'none';
            newRequirement.style.display = 'none';
            postRequirement.style.display = 'none';
            passwordChange.style.display = 'flex';
            break;
    }
    document.getElementsByClassName('postedReq')[0].classList.remove('active');
    document.getElementsByClassName('newRequirement')[0].classList.remove('active');
    document.getElementsByClassName('responded1')[0].classList.remove('active');
    document.getElementsByClassName('responded')[0].classList.remove('active');
    if(selectedTab !== 'passwordChange')
     document.getElementsByClassName(selectedTab)[0].classList.add('active');
}
