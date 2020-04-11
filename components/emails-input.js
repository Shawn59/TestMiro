const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

class EmailsInput {
    doc = document;
    headElem = '';
    blockEmail = ''; // сюда емейлы добавляем
    input = '';
    emailList = [];

    constructor(parentNode, options) {
        this.init(parentNode, options);
    }

    init = (parentNode, options = {}) => {
        //клонируем
        this.headElem = this.doc.createElement("div");
        this.headElem.classList.add("insert-email");
        this.headElem.innerHTML =
            "<div class='error-block'>" +
                "<div class='insert-block'>" +
                    "<input type='text' class='input-field' placeholder='add more emails...'>" +
                "</div>" +
            "</div>";
        parentNode.appendChild(this.headElem);

        this.blockEmail = this.headElem.getElementsByClassName("insert-block")[0];

        this.input = this.blockEmail.getElementsByClassName("input-field")[0];
        this.input.onkeyup = this.handleInputKeyUp;
        this.input.onblur = this.handleInputBlur;
        this.input.oninput = this.handleInputOnInput;

        this.setChipList(options.emailList);
    };

    setChipList = (sourceEmailList) => {
        sourceEmailList.forEach(item => {
            this.addChip(item)
        });
    };

    // Добавляем емейл при нажатии клавишь "Enter" и ","
    handleInputKeyUp = (event) => {
        let email = event.currentTarget.value;

        // убираем запятую
        if (event.key === ",") {
            email = email.replace(',', '');
        }

        if (email.trim() !== "" && (event.key === "Enter" || event.key === ",")) {
            this.addChip(email);
            event.currentTarget.value = "";
        }
    };

    // Добавляем емейл при потере фокуса
    handleInputBlur = (event) => {
        if (event.currentTarget.value.trim() !== "") {
            this.addChip(event.currentTarget.value);
            event.currentTarget.value = "";
        }
    };

    //Добавляем емейлы при вставке
    handleInputOnInput = (event) => {
        if (event.inputType === "insertFromPaste" && event.currentTarget.value.trim() !== "") {
            let emailsList = event.currentTarget.value.split(',');

            emailsList.forEach(item => {
                this.addChip(item)
            });

            event.currentTarget.value = "";
        }
    };

    addChip = (value) => {
        let email = value.trim();

        if (email) {
            let isValid = emailPattern.test(email);
            let chipDivEl = this.doc.createElement("div");
            let spanEl = this.doc.createElement("span");
            let imgEl = this.doc.createElement("img");

            chipDivEl.classList.add(isValid ? "chip" : "chip-invalid");
            spanEl.textContent = email;
            imgEl.src = "./components/images/remove.svg";
            imgEl.classList.add("closed-img");
            imgEl.onclick = () => this.deleteChip(chipDivEl, email);

            chipDivEl.appendChild(spanEl);
            chipDivEl.appendChild(imgEl);

            this.blockEmail.insertBefore(chipDivEl, this.input);

            this.emailList.push(email);
        }
    };

    deleteChip = (chipElem, email) => {
        chipElem.parentNode.removeChild(chipElem);
        let indexEmail = this.emailList.indexOf(email);

        if (indexEmail !== -1) {
            this.emailList.splice(indexEmail, 1);
        }
    };

    getEmails = () => {
        return this.emailList;
    };

};

export {EmailsInput};

