'use strict';

(function(){
    let resultarea;
    let heroIdField;

    document.addEventListener('DOMContentLoaded', init);

    function init(){

        resultarea = document.getElementById('resultarea');
        heroIdField = document.getElementById('heroid');
        document.getElementById('submit').addEventListener('click',send);

    } // end of init

    async function send(){
        clearMessage();
        resultarea.innerHTML = '';
        const heroID = heroIdField.value;

        try{
            const options = {
                method:'POST',
                body:JSON.stringify({heroID:heroID}),
                headers:{
                    'Content-Type':'application/json'
                }
            };
            console.log(options);
            const data = await fetch('/getOne',options);
            const resultJson = await data.json();
            console.log(resultJson);
            updatePage(resultJson);
        }
        catch (error){
            updateMessageArea(error.message, 'error');
        };
    };//end of send

})();