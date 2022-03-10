'use strict';

(function(){

    document.addEventListener('DOMContentLoaded', init);

    const populateCell = (data) =>{
        const td= document.createElement('td');
        td.textContent = data;
        return td;
    }

    async function init(){
        try{
            const data = await fetch('/getAll');
            const superheros = await data.json();
            // console.log(superheros);
            const resultSet = document.getElementById('resultset');

            for( let hero of superheros){
                const tr = document.createElement('tr');
                tr.appendChild(populateCell(hero.heroID));
                tr.appendChild(populateCell(hero.name));
                tr.appendChild(populateCell(hero.strength));
                tr.appendChild(populateCell(hero.superproperty));
                tr.appendChild(populateCell(hero.yearOfBirth));
                resultSet.appendChild(tr);
            };
        }
        catch(error){
            document.getElementById('messagearea').innerHTML = `<div class='error'>${error.message}</div>`;
        };
    };

})();