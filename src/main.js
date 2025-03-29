import './style.css';
import 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
import logoSrc from './assets/logo.png';
import profileImgSrc from './assets/profile.png';

const logoPage = document.getElementById('logo');
const profileImgPage = document.getElementById('profileImg');

const body = document.getElementById('body');
const dialog = document.getElementById('dialog');
const dialogWrapper = dialog.parentNode
const inputField = document.getElementById('inputField');
const inputBtn = document.getElementById('inputBtn');

logoPage.src = logoSrc;
profileImgPage.src = profileImgSrc;

const userMessageHtml = (inputValue) => {
    return `
    <div class="message user-message">
        <span>${inputValue}</span>
    </div>
    `
}

const assistantMessageHtml = (inputValue) => {
    return `
    <div class="message assistant-message">
        <span>${inputValue}</span>
    </div>
    `
}

inputBtn.addEventListener('click', event => {
    event.preventDefault();

    if (inputField.value.trim()) {

        // Удержание скролла чата в нижнем положении:
        const isScrolledToBottom = dialogWrapper.scrollHeight - dialogWrapper.clientHeight <= dialogWrapper.scrollTop + 1

        const newMessageNode = document.createElement('span');
        newMessageNode.innerHTML = userMessageHtml(inputField.value);

        dialog.appendChild(newMessageNode);

        const newReplyNode = document.createElement('span');
        newReplyNode.innerHTML = assistantMessageHtml(`Ищу ответ на ${inputField.value}`);

        dialog.appendChild(newReplyNode);

        body.classList.remove('initial')

        if (isScrolledToBottom) { // Только если чат уже в нижнем положении
            dialogWrapper.scrollTop = dialogWrapper.scrollHeight - dialogWrapper.clientHeight
        }

        inputField.value = '';
    }
})