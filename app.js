import {EmailsInput} from './components/emails-input.js';
let inputContainerNode = document.querySelector('#emails-input');
let options = {
    emailList: [
        "sdfds@dfd.df",
        "dsfsdfds@dfd.gf",
        "sdfsdf@dfdf",
        "fdsgfdlfghfg@dfds.df"
    ],
    onAddChip: handleAddChip,
    onDeleteChip: handleDeleteChip
};
let btn1 = document.getElementById('addEmail');
let btn2 = document.getElementById('showCountEmail');
let btn3 = document.getElementById('addNewEmailList');
let emailsInput = new EmailsInput(inputContainerNode, options);

btn1.onclick = addRandomEmail;
btn2.onclick = getCountEmails;
btn3.onclick = addNewEmailList;

function getCountEmails () {
    alert(emailsInput.onGetEmails().length);
};

function addRandomEmail () {
    let email = Math.random().toString(36).substr(4, 10) + '@gmail.com';
    emailsInput.addChip(email);
};

function addNewEmailList () {
    let emailList = ["aaaa@aaa.aaa"];
    emailsInput.onSetNewEmailList(emailList);
};

function handleAddChip (chipEl, email) {
    console.log('add - ' + email);
};

function handleDeleteChip (email) {
    console.log('del - ' + email);
};