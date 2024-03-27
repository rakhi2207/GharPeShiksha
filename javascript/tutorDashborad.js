function changeDashboard(selectedTab){
    const newRequirement = document.getElementsByClassName('applied-posts')[0];
    const passwordChange = document.getElementsByClassName('password-change')[0];

    switch(selectedTab){
        case 'responded':
            newRequirement.style.display = 'revert';
            passwordChange.style.display = 'none';
            hideError('pwdupd');
            break;
        case 'passwordChange':
            newRequirement.style.display = 'none';
            passwordChange.style.display = 'flex';
            break;
    }
    document.getElementsByClassName('responded')[0].classList.remove('active');
    if(selectedTab !== 'passwordChange')
        document.getElementsByClassName(selectedTab)[0].classList.add('active');
}