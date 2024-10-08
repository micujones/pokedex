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

alert(`There are ${pokemonList.length} pokémon going to be printed.`);

for (i = 0; i < pokemonList.length; i++) {
    document.write('<p>');
    document.write(`${pokemonList[i].name} (Height: ${pokemonList[i].height}\'\')`);
    if (pokemonList[i].height >= 5) {
        document.write(' ... that\'s big!');
    }
    document.write('</p>');
}