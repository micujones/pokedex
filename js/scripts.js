let pokemonRepository = (function() {
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

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    return {
        getAll: getAll,
        add: add
    };
})();

alert(`There are ${pokemonRepository.getAll().length} pokémon going to be printed.`);

pokemonRepository.getAll().forEach(pokemon => {
    document.write('<p>');
    document.write(`${pokemon.name} (Height: ${pokemon.height}\'\')`);
    if (pokemon.height >= 5) {
        document.write(' ... that\'s big!');
    }
    document.write('</p>');
});