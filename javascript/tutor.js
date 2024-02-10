function hideDropDown(e) {
    const dropdown = document.querySelector(".dropdown");
    const dropdownSubject = document.querySelector(".dropdown-subject");
    const classSelect = document.querySelector("#class");
    const subject = document.querySelector("#subjects");
    const mode = document.querySelector(".select-mode");
    const drodownMode = document.querySelector("#mode");
    if (dropdown && !dropdown.contains(e.target)) {
        classSelect.style.display = "none";
        showCheckBoxes = true;
    }
    if(dropdownSubject && !dropdownSubject.contains(e.target)){
        subject.style.display = "none";
        showSubjects = true;
    }
    if(mode && !mode.contains(e.target)){
        drodownMode.style.display = "none";
        showMode = true;
    }
    const showSubjectsData = document.getElementById("subjectList");
    if(subjectList.size == 0){
        subjectList.add("Select Subjects");
        showSubjectsData.style.color = "grey";
    } else if(subjectList.size > 0 && !subjectList.has("Select Subjects")){
        showSubjectsData.style.color = "black";       
    }

    if(subjectList.size > 4){
        showSubjectsData.style.fontSize = "xx-small";
    }else{
        showSubjectsData.style.fontSize = "15px";
    }
    const data = Array.from(subjectList).join(", ")
    showSubjectsData.innerText = data;
}

window.addEventListener("click", hideDropDown);
