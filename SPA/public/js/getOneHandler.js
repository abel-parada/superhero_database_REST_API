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

    function updatePage(result){
        if(result){
            if(result.message){
                updateMessageArea(result.message,result.type);
            }
            else{
                updateSuperhero(result);
            }

        }
        else{
            updateMessageArea('Error: Not found', 'error')
        }
    } //end of updatePage

    function updateSuperhero(superhero){

        resultarea.innerHTML = `
            <p><span class="legend">Id:</span> ${superhero.heroID}</p>
            <p><span class="legend">Name:</span> ${superhero.name}</p>
            <p><span class="legend">Strength:</span> ${superhero.strength}</p>
            <p><span class="legend">Superproperty:</span> ${superhero.superproperty}</p>
            <p><span class="legend">Year Of Birth:</span> ${superhero.yearOfBirth}</p>
            `;
    } //end of updateSuperhero

})();