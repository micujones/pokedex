let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === "object") {
            pokemonList.push(pokemon);
        }
    }

    function createLoadingMessage() {
        let loadingContainer = document.createElement('div');
        loadingContainer.classList.add('loading');

        let loadingMessage = document.createElement('p');
        loadingMessage.innerText = 'Loading that pokémon';

        loadingContainer.appendChild(loadingMessage);

        return loadingContainer;
    }

    function showLoadingMessage() {
        let pokemonList = document.querySelector('.pokemon-list');
        let loadingMessage = createLoadingMessage();
        
        pokemonList.appendChild(loadingMessage);
    }

    function hideLoadingMessage() {
        let pokemonList = document.querySelector('.pokemon-list');
        let loadingContainer = document.querySelector('.loading');
        pokemonList.removeChild(loadingContainer);
    }

    // Add pokemon to ul
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

    function buttonShowsDetails (pokemon, button) {
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function loadList () {
        showLoadingMessage();

        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            hideLoadingMessage();
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            })
        }).catch(function(e) {
            hideLoadingMessage();
            console.error(e);
        })
    }

    function createNewPokemon (pokemon) {
        return pokemonData = {
            name: pokemon.name,
            imageUrl: null,
            height: null,
            types: null
        };
    }

    function loadDetails (pokemon) {
        showLoadingMessage();

        let pokemonData = createNewPokemon(pokemon);

        return fetch(pokemon.detailsUrl).then(function(response) {
            return response.json();
        }).then(function(details) {
            hideLoadingMessage();

            pokemonData.imageUrl = details.sprites.front_default;
            pokemonData.height = details.height;
            pokemonData.types = [];
            
            details.types.forEach(function(item) {
                pokemonData.types.push(item.type.name);
            });

            return pokemonData;
        }).catch(function(e) {
            hideLoadingMessage();
            return console.error(e);
        })
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function(pokemon) {
            console.log(pokemon);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    });
});