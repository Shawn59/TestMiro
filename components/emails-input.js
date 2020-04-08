export default class EmailsInput {
    doc = document;
    headElem = '';
    blockEmail = ''; // сюда емейлы добавляем
    input = '';
    constructor(parentNode, options) {
        this.init(parentNode, options);
    }

    init = (parentNode, options) => {
        this.headElem = this.doc.createElement('div');
        this.headElem.classList.add("insert-email");
        this.headElem.innerHTML = "<div>" +
            "<span> Share <strong>Board name</strong> with others</span>" +
                "<div class='error-block'>" +
                    "<div class='insert-block'>" +
                        "<input type='text' class='input-field' placeholder='add more emails...'>" +
                    "</div>" +
                "</div>" +
            "</div>";
        parentNode.appendChild(this.headElem);
        this.blockEmail = this.headElem.getElementsByClassName("insert-block")[0];
        this.input = this.blockEmail.getElementsByClassName("input-field")[0];
        this.input.onkeyup = this.addChip;
        console.log(this.input);
    };

    addChip = (event) => {
        if(event.key === 'Enter'){
            let el = this.doc.createElement("div");
            el.textContent = event.currentTarget.value;
            this.blockEmail.insertBefore(el, this.input);
        }
    }
};

