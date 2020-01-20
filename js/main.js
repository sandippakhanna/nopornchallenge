// default jquary dependancy 
$(document).ready(function () {
    $('.dropdown-button').dropdown({
      constrainWidth: false,
      hover: true,
      belowOrigin: true,
      alignment: 'left'
    });

    // JAVASCRIPT START HERE //
    $('.button-collapse').sideNav({
        clickOnClose:true
    });

    $('.scrollspy').scrollSpy();
});


/*********************
 * global vars
 * ******************* */ 
// Uis
const noOfSucessUI = document.getElementById('noofsuccess');
const noOfFailureUI = document.getElementById('nooffailure');
let allSwitches = document.getElementsByClassName('myswitch');
const daysLeftUI = document.getElementById('daysleft');

// value vars
let noOfSucess = 0;
let noOfFailure = 0;
let hasAcceptChallenge;

/*************************************
 * All Function Dependency
 * *********************************** */

// make a rows of date
const createNewDateRow = (dateString, isOn) =>{
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.appendChild(document.createTextNode(dateString));
    tr.appendChild(td1);
    let td2 = document.createElement('td');
    let div = document.createElement('div');
    div.className = "switch";
    let label = document.createElement('label');
    label.appendChild(document.createTextNode("Failure"));
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "myswitch";
    if(isOn){
        checkbox.checked = true
    }else{
        checkbox.checked = false
    }
    label.appendChild(checkbox);
    let span = document.createElement('span');
    span.className = "lever";
    label.appendChild(span);
    label.appendChild(document.createTextNode("Success"));
    div.appendChild(label);
    td2.appendChild(div);
    tr.appendChild(td2);
    document.querySelector('tbody').appendChild(tr);
}

// sucess and failure points update
const pointsChange = ()=> {
    // let allSwitches = document.getElementsByClassName('myswitch');
    noOfSucess = 0;
    noOfFailure = 0;
    for(let i=0;i<allSwitches.length;i++){
        if(allSwitches[i].checked === true){
            noOfSucess += 1;
        }else{
            noOfFailure += 1;
        }
    }
    noOfFailureUI.innerText = noOfFailure;
    noOfSucessUI.innerText = noOfSucess;
    // save all data to ls
    saveAllDataToLs();
}

// save data to localstroage function
const saveAllDataToLs = () => {
    data = []
    for(let i=0; i<allSwitches.length; i++){
        let date = allSwitches[i].parentElement.parentElement.parentElement.previousElementSibling.textContent;
        let seperateObject = {};
        seperateObject["date"] = date
        seperateObject["checked"] = allSwitches[i].checked;
        data.push(seperateObject)
    }
    localStorage.setItem('data', JSON.stringify(data));
}

// fetch all data from localstroage
const fetchDataFromLs = () => {
    data = JSON.parse(localStorage.getItem('data'));
    for(let i = 0; i<data.length; i++){
        createNewDateRow(data[i].date,data[i].checked)
    }
    let daysLeft = localStorage.getItem('daysLeft');
    daysLeftUI.innerHTML = daysLeft;
}

// check for update 
const checkForUpdate = () => {
    let today = new Date();
    data = JSON.parse(localStorage.getItem('data'));
    let todayString = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
    if(todayString == data[data.length - 1].date){
        return false;
    }else{
        return true;
    }
}

// update till today
const updateToToday = () =>{
    let daysLeft;
    let data = JSON.parse(localStorage.getItem('data'));
    let lastDateString = data[data.length - 1].date.split("/");
    let newDateString = `${lastDateString[1]}/${lastDateString[0]}/${lastDateString[2]}`
    let lastDate = new Date(newDateString);
    do{
        let tomorrowDate = new Date(newDateString);
        tomorrowDate.setDate(lastDate.getDate() + 1);
        let tomorrowString = `${tomorrowDate.getDate()}/${tomorrowDate.getMonth()+1}/${tomorrowDate.getFullYear()}`;
        // save the data into localstroage
        createNewDateRow(tomorrowString, false);
        // days left 
        daysLeft = localStorage.getItem('daysLeft');
        localStorage.setItem('daysLeft',daysLeft-1);
        daysLeftUI.innerHTML = daysLeft;
        console.log("update")
        if(daysLeft>=150){
            alert("Your 150 days challange is complete")
        }
        // console.log(tomorrowDate.setDate(lastDate.getDate() + 1))
        // console.log(tomorrowDate)
        saveAllDataToLs();
        data = JSON.parse(localStorage.getItem('data'));
        lastDateString = data[data.length - 1].date.split("/");
        newDateString = `${lastDateString[1]}/${lastDateString[0]}/${lastDateString[2]}`
        lastDate = new Date(newDateString);
    }while(checkForUpdate());
    pointsChange();
    daysLeftUI.innerHTML = localStorage.getItem('daysLeft');
}


/**********
 * Main code start from here
 * *********/
// if the user is new then hasAcceptChallenge is false;
if(localStorage.getItem('hasAcceptChallenge') === null){
    hasAcceptChallenge = false;
}else{
    hasAcceptChallenge = true;
}
// if the user is new
// then first show today's value
if(!hasAcceptChallenge){
    let today = new Date();
    let todayString = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
    // let tomorrowString = `${today.getDate() + 1}/${today.getMonth()+1}/${today.getFullYear()}`;
    createNewDateRow(todayString, false);
    // createNewDateRow(tomorrowString);
    // then saved to the localstroage
    localStorage.setItem('hasAcceptChallenge',true);
    localStorage.setItem('daysLeft',150);
    // save the data into localstroage
    saveAllDataToLs();
    pointsChange();
}else{
    // console.log("old is gold!");
    // fetch data from localstroage
    fetchDataFromLs();
    pointsChange();
    // update to today
    if(!checkForUpdate()){
        console.log("ok")
    }else{
        console.log("not ok");
        // update to todate
        updateToToday();
    }
}



/************************
 * add event listener
 * ********************** */
// Switches event listener
for(let i=0;i<allSwitches.length;i++){
    allSwitches[i].addEventListener('change', pointsChange);
}

