import './style.css';
import 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';

const body = document.getElementById('body');
const dialog = document.getElementById('dialog');
const dialogWrapper = dialog.parentNode
const inputField = document.getElementById('inputField');
const inputBtn = document.getElementById('inputBtn');

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
        const isScrolledToBottom = dialogWrapper.scrollHeight - dialogWrapper.clientHeight <= dialogWrapper.scrollTop + 10

        const query =  inputField.value

        dialog.innerHTML = dialog.innerHTML + userMessageHtml(query);
        inputField.value = '';
        body.classList.remove('initial')

        $.post("https://intensive-backend-technium.replit.app/ask", {
            prompt: `${query}`,
        }, function(data) {
            const response = data.answer
            dialog.innerHTML = dialog.innerHTML + assistantMessageHtml(response);
        })

        if (isScrolledToBottom) { // Только если чат уже в нижнем положении
            dialogWrapper.scrollTop = dialogWrapper.scrollHeight - dialogWrapper.clientHeight
        }
    }
})