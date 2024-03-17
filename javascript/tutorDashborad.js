function changeDashboard(selectedTab){
    const appliedPost = document.getElementsByClassName('applied-posts')[0];
    const newRequirement = document.getElementsByClassName('tutors-list')[0];
    const passwordChange = document.getElementsByClassName('password-change')[0];

    switch(selectedTab){
        case 'postedReq':
            appliedPost.style.display = 'revert';
            newRequirement.style.display = 'none';
            passwordChange.style.display = 'none';
            break;
        case 'responded':
            appliedPost.style.display = 'none';
            newRequirement.style.display = 'revert';
            passwordChange.style.display = 'none';
            break;
        case 'passwordChange':
            appliedPost.style.display = 'none';
            newRequirement.style.display = 'none';
            passwordChange.style.display = 'flex';
            break;
    }
    document.getElementsByClassName('postedReq')[0].classList.remove('active');
    document.getElementsByClassName('responded')[0].classList.remove('active');
    if(selectedTab !== 'passwordChange')
        document.getElementsByClassName(selectedTab)[0].classList.add('active');
}