import './style.css';
import 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';

const body = document.getElementById('body');
const dialog = document.getElementById('dialog');
const dialogWrapper = dialog.parentNode
const inputField = document.getElementById('inputField');
const inputBtn = document.getElementById('inputBtn');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const scrollHold = (isScrolledToBottom) => {
    if (isScrolledToBottom) {  // Удержание скролла чата в нижнем положении
        dialogWrapper.scrollTop = dialogWrapper.scrollHeight - dialogWrapper.clientHeight;
    }
}

const updateScrollPosition = () => {
    return dialogWrapper.scrollTop >= dialogWrapper.scrollHeight - dialogWrapper.clientHeight - 70;
}

const setMessagesToLocalStorage = (messages) => {
    localStorage.setItem('messages', JSON.stringify(messages));
}

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

if (messages.length > 0) {
    body.classList.remove('initial')
    messages.forEach((message) => {
        if (message.role === 'user') {
            dialog.innerHTML = dialog.innerHTML + userMessageHtml(message.text);
        } else if (message.role === 'assistant') {
            dialog.innerHTML = dialog.innerHTML + assistantMessageHtml(message.text);
        }
    })
}

inputBtn.addEventListener('click', event => {
    event.preventDefault();

    if (inputField.value.trim()) {
        // Проверка того, что скролл чата находится в нижнем положении:
        let isScrolledToBottom;

        const query = inputField.value
        inputField.value = '';
        body.classList.remove('initial')

        isScrolledToBottom = updateScrollPosition();
        dialog.innerHTML = dialog.innerHTML + userMessageHtml(query);
        scrollHold(isScrolledToBottom);
        messages.push({
            role: 'user',
            text: query,
        })
        setMessagesToLocalStorage(messages);

        // $.post("https://intensive-backend-technium.replit.app/ask", {
        //     prompt: `${query}`,
        // }, function(data) {
        //     const response = data.answer
        //     dialog.innerHTML = dialog.innerHTML + assistantMessageHtml(response);
        // })

        const talk = function (data, success) {
            return $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: 'https://intensive-backend-technium.replit.app/talk',
                data: JSON.stringify({
                    messages: data
                }),
                success: success,
            })
        }

        talk(messages, function (data) {
            const response = data.answer
            isScrolledToBottom = updateScrollPosition();
            dialog.innerHTML = dialog.innerHTML + assistantMessageHtml(response);
            scrollHold(isScrolledToBottom);
            messages.push({
                role: 'assistant',
                text: response,
            })
            setMessagesToLocalStorage(messages);
        })
    }
})