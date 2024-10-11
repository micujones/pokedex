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
        if (typeof pokemon == "object") {
            pokemonList.push(pokemon);
        }
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function buttonShowsDetails (pokemon, button) {
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('ul');

        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemonListItem')
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        // Show details of current pokemon
        buttonShowsDetails(pokemon, button);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };
})();

pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
});