// default jquary dependancy 
$(document).ready(function () {
    $('.dropdown-button').dropdown({
      constrainWidth: false,
      hover: true,
      belowOrigin: true,
      alignment: 'left'
    });

    // JAVASCRIPT START HERE //
    $('.button-collapse').sideNav();

    $('.scrollspy').scrollSpy();
});


/*************************************
 * All Function Dependency
 * *********************************** */

// make a rows of date
const createNewDateRow = (dateString) =>{
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
    let allSwitches = document.getElementsByClassName('myswitch');
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
}
pointsChange();


/*********************
 * global vars
 * ******************* */ 
// Uis
const noOfSucessUI = document.getElementById('noofsuccess');
const noOfFailureUI = document.getElementById('nooffailure');

// value vars
let noOfSucess = 0;
let noOfFailure = 0;
let hasAcceptChallenge;
if(localStorage.getItem('hasAcceptChallenge') === null){
    hasAcceptChallenge = false;
}else{
    hasAcceptChallenge = true;
}


// if the user is new
// then first show today's value
let today = new Date();
let todayString = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
createNewDateRow(todayString);



/************************
 * add event listener
 * ********************** */
// Switches event listener
let allSwitches = document.getElementsByClassName('myswitch');
for(let i=0;i<allSwitches.length;i++){
    allSwitches[i].addEventListener('change', pointsChange);
}

