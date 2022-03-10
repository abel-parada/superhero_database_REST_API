'use strict';

(function (){
    let heroIdField;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        heroIdField = document.getElementById('heroid');

        document.getElementById('submit').addEventListener('click',send);
    }//end of init

    async function send(){
        clearMessage();
        const heroID = heroIdField.value;

        try{
            const options = {
                method: 'POST',
                body: JSON.stringify({heroID}),
                headers:{
                    'Content-Type':'application/json'
                }
            }

            const data = await fetch('/remove', options);

            const result = await data.json();
            if(result.message){
                updateMessageArea(result.message, 'error');
            }
        }
        catch(error){
            updateMessageArea(error.message, 'error');
        }
    }

})();