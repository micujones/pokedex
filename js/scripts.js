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
            detailsUrl: pokemon.detailsUrl,
            name: pokemon.name,
            imageUrl: null,
            height: null,
            weight: null,
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
            pokemonData.weight = details.weight;
            pokemonData.types = [];
            
            details.types.forEach(function(item) {
                pokemonData.types.push(item.type);
            });

            return pokemonData;
        }).catch(function(e) {
            hideLoadingMessage();
            return console.error(e);
        })
    }

    // Show pokemon's name, types, height, and sprite
    function showDetails(pokemon) {

        loadDetails(pokemon).then(function(pokemon) {
            modalFunctions.showModal(pokemon);
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

let modalFunctions = (function() {

    async function createModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) { hideModal(); }
        });
        
        let modal = document.createElement('div')
        modal.classList.add('modal');

        let hideButton = document.createElement('button');
        hideButton.classList.add('hide-modal');
        hideButton.innerText = 'x';
        hideButton.addEventListener('click', () => {
            hideModal();
        })

        let sprite = document.createElement('img');
        sprite.src = pokemon.imageUrl;
        sprite.alt = 'Sprite of ' + pokemon.name;

        let title = document.createElement('h1');
        title.innerText = pokemon.name;

        // Stats container
        let statsContainer = document.createElement('div');
        statsContainer.classList.add('stats');
        
        let height = document.createElement('p');
        height.innerText = pokemon.height + ' cm';
        let weight = document.createElement('p');
        weight.innerText = pokemon.weight + ' kg';

        statsContainer.appendChild(height);
        statsContainer.appendChild(weight);

        // Types container
        let typesContainer = document.createElement('div');
        typesContainer.classList.add('types');
        for (i = 0; i < pokemon.types.length; i++) {
            let typeSprite = document.createElement('img');
            typeSprite.src = await getTypeSprite(pokemon.types[i].url)
            typesContainer.appendChild(typeSprite);
        }

        // Add modal elements and modal to modal container
        modal.appendChild(hideButton);
        modal.appendChild(sprite);
        modal.appendChild(title);
        modal.appendChild(statsContainer);
        modal.appendChild(typesContainer);
        modalContainer.appendChild(modal);
    }

    async function getTypeSprite(url) { 
        let response = await fetch(url);
        let typeInfo = await response.json();
        return typeInfo.sprites['generation-viii']['sword-shield'].name_icon;
    }

    function showModal(pokemon) {
        createModal(pokemon)

        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');

        let modal = document.querySelector('.modal');
        modalContainer.removeChild(modal);
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    return {
        showModal: showModal,
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    });
});