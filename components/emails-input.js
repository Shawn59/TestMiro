const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

class EmailsInput {
    doc = document;
    blockEmail = ''; // сюда емейлы добавляем
    input = '';
    emailList = [];

    //колбеки
    onAddChipCallback = '';
    onDeleteChipCallback = '';

    constructor(parentNode, options) {
        this.init(parentNode, options);
    }

    init = (parentNode, options = {}) => {
        this.onAddChipCallback = options.onAddChip;
        this.onDeleteChipCallback = options.onDeleteChip;

        this.blockEmail = this.doc.createElement("div");
        this.blockEmail.classList.add("insert-block");
        parentNode.appendChild(this.blockEmail);

        this.input = this.doc.createElement("input");
        this.input.type = "text";
        this.input.classList.add("input-field");
        this.input.placeholder = 'add more emails...';
        this.input.onkeyup = this.handleInputKeyUp;
        this.input.onblur = this.handleInputBlur;
        this.input.oninput = this.handleInputOnInput;

        this.blockEmail.appendChild(this.input);

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

            chipDivEl.classList.add("chip");
            chipDivEl.classList.add(isValid ? "chip-valid" : "chip-invalid");
            spanEl.textContent = email;
            imgEl.src = "./components/images/remove.svg";
            imgEl.classList.add("closed-img");
            imgEl.onclick = () => this.deleteChip(chipDivEl, email);

            chipDivEl.appendChild(spanEl);
            chipDivEl.appendChild(imgEl);

            this.blockEmail.insertBefore(chipDivEl, this.input);

            this.emailList.push(email);

            this.onAddChip(chipDivEl, email);
        }
    };

    deleteChip = (chipElem, email) => {
        chipElem.parentNode.removeChild(chipElem);
        let indexEmail = this.emailList.indexOf(email);

        if (indexEmail !== -1) {
            this.emailList.splice(indexEmail, 1);
        }

        this.onDeleteChip(email);
    };

    deleteAllChips = () => {
        let chipList = this.blockEmail.getElementsByClassName("chip");
        let chipListLength = chipList.length;
        for (let i = 0; i < chipListLength; i++) {
            this.deleteChip(chipList[0], chipList[0].textContent);
        }
    };

    //API

    onGetEmails = () => {
        return this.emailList;
    };

    onSetNewEmailList = (emailList) => {
        if (emailList && Array.isArray(emailList)) {
           this.deleteAllChips();
            emailList.forEach(item => {
                this.addChip(item);
            });
        }
    };

    onAddChip = (chipElem, email) => {
        if (this.onAddChipCallback) {
            if (typeof(this.onAddChipCallback) === "function") {
                this.onAddChipCallback(chipElem, email);
            } else {
                // не стал выкидывать исключение, чтобы не завершать выполнение скрипта
                console.error("onAddChipCallback - колбек должен быть функцией");
            }
        }
    };

    onDeleteChip = (email) => {
        if (this.onDeleteChipCallback) {
            if (typeof(this.onDeleteChipCallback) === "function") {
                this.onDeleteChipCallback(email);
            } else {
                console.error("onAddChipCallback - колбек должен быть функцией");
            }
        }
    };
}

export {EmailsInput};

