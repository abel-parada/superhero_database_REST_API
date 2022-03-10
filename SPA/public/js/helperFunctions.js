'use strict';

const updateMessageArea = (message,type) =>{
    const messagearea = document.getElementById('messagearea');
    messagearea.textContent = message;
    messagearea.setAttribute('class',type);//this is for the styling
}

const clearMessage = () =>{
    const messagearea = document.getElementById('messagearea');
    messagearea.textContent = '';
    messagearea.removeAttribute('class');
}