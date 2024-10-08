let pokemonList = [
    {
        name: 'Charmander',
        height: 2,
        types: ['fire'],
        weaknesses: ['water', 'ground', 'rock']
    },
    {
        name: 'Cyndaquil',
        height: 2,
        types: ['fire'],
        weaknesses: ['water', 'ground', 'rock']
    },
    {
        name: 'Dragonite',
        height: 7,
        types: ['dragon', 'flying'],
        weaknesses: ['ice', 'rock', 'dragon', 'fairy']
    },
    {
        name: 'Gengar',
        height: 5,
        types: ['ghost', 'poison'],
        weaknesses: ['ground', 'psychic', 'ghost', 'dark']
    },
    {
        name: 'Machop',
        height: 3,
        types: ['fighting'],
        weaknesses: ['flying', 'psychic', 'fairy']
    },
    {
        name: 'Mewtwo',
        height: 6,
        types: ['psychic'],
        weaknesses: ['bug', 'ghost', 'dark']
    }
];

alert(pokemonList[3].name);
document.write(pokemonList[3].name);