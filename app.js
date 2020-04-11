import {EmailsInput} from './components/emails-input.js';
let inputContainerNode = document.querySelector('#emails-input');
let options = {
    emailList: [
        "sdfds@dfd.df",
        "dsfsdfds@dfd.gf",
        "sdfsdf@dfdf",
        "fdsgfdlfghfg@dfds.df"
    ]
};
let btn1 = document.getElementById('addEmail');
let btn2 = document.getElementById('showCountEmail');
let emailsInput = new EmailsInput(inputContainerNode, options);

const getCountEmails = () => {
    console.log(emailsInput.getEmails().length);
};

const addRandomEmail = () => {
    let email = Math.random().toString(36).substr(4, 10) + '@gmail.com';
    emailsInput.addChip(email);
};

btn1.onclick = addRandomEmail;
btn2.onclick = getCountEmails;