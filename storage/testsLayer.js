const Datastorage = require('./dataStorageLayer')

const variable = new Datastorage();

const newSuperHero = {
    heroID: 4,
    name:'WonderWoman',
    strength: 'high',
    superproperty: 'superstrengh',
    yearOfBirth: 1975

}


// console.log(variable);
// variable.getAll().then(console.log).catch(console.log);
// variable.get(2).then(console.log).catch(console.log);
// variable.insert(newSuperHero).then(console.log).catch(console.log);
// variable.get(3).then(console.log).catch(console.log);
// variable.get(4).then(console.log).catch(console.log);
// variable.update(4,newSuperHero).then(console.log).catch(console.log);
// variable.get(4).then(console.log).catch(console.log);
variable.getAll().then(console.log).catch(console.log);
// variable.remove(4).then(console.log).catch(console.log);