let toggleAccountSettings = true;

function openAccountSettings(){
    const settingsMenu = document.getElementsByClassName('account-setting')[0];
    if(toggleAccountSettings){
        settingsMenu.style.display = 'revert';
    }else{
        settingsMenu.style.display = 'none';
    }
    toggleAccountSettings = !toggleAccountSettings;
}

function hideSettingDropDown(e) {
    const mode = document.querySelector(".navbar-items");
    const drodownMode = document.querySelector(".account-setting");
    if(mode && !mode.contains(e.target)){
        drodownMode.style.display = "none";
        toggleAccountSettings = true;
    }
}

window.addEventListener("click", hideSettingDropDown);
