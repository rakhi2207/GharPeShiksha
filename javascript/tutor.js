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