'use strict';

const toArrayInsert = superhero => [
    +superhero.heroID,
    superhero.name,
    superhero.strength,
    superhero.superproperty,
    +superhero.yearOfBirth
];

const toArrayUpdate = superhero => [
    superhero.name,
    superhero.strength,
    superhero.superproperty,
    +superhero.yearOfBirth,
    +superhero.heroID
]