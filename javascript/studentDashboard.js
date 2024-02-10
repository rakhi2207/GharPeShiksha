let toggleAccountSettings = true;
function changeDashboard(selectedTab){
    const appliedPost = document.getElementsByClassName('applied-posts')[0];
    const newRequirement = document.getElementsByClassName('tutors-list')[0];
    const postRequirement = document.getElementsByClassName('post-requirement')[0];
    const passwordChange = document.getElementsByClassName('password-change')[0];

    switch(selectedTab){
        case 'posted':
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
        case 'passwordChange':
            appliedPost.style.display = 'none';
            newRequirement.style.display = 'none';
            postRequirement.style.display = 'none';
            passwordChange.style.display = 'flex';
            break;
    }
}

function openAccountSettings(){
    const settingsMenu = document.getElementsByClassName('account-setting')[0];
    if(toggleAccountSettings){
        settingsMenu.style.display = 'revert';
    }else{
        settingsMenu.style.display = 'none';
    }
    toggleAccountSettings = !toggleAccountSettings;
}

function hideDropDown(e) {
    const mode = document.querySelector(".navbar-items");
    const drodownMode = document.querySelector(".account-setting");
    if(mode && !mode.contains(e.target)){
        drodownMode.style.display = "none";
        toggleAccountSettings = true;
    }
}

window.addEventListener("click", hideDropDown);
