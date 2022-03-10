'use strict';

(function (){
    let heroIdField;
    let nameField;
    let strengthField;
    let superpropertyField;
    let yearOfBirthField;
    document.addEventListener('DOMContentLoaded', init);

    function init() {

        heroIdField = document.getElementById('heroid');
        nameField = document.getElementById('name');
        strengthField = document.getElementById('strength');
        superpropertyField = document.getElementById('superproperty');
        yearOfBirthField = document.getElementById('yearOfBirth');

        document.getElementById('submit').addEventListener('click', send);
    }

    async function send(){
        clearMessage();
        const superhero = {
            heroID: heroIdField.value,
            name: nameField.value,
            strength: strengthField.value,
            superproperty: superpropertyField.value,
            yearOfBirth: yearOfBirthField.value
        };

        try{
            const options = {
                method:'POST',
                body:JSON.stringify(superhero),
                headers: {
                    'Content-Type':'application/json'
                }
            };

            const data = await fetch('/add',options);
            const resultJson = await data.json();
            if(resultJson.message){
                updateMessageArea(resultJson.message, resultJson.type)
            }
        }
        catch(error){
            updateMessageArea(error.message, 'error')
        }

    }

})();