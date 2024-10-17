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


// A MODAL NEEDS TO...
// display when a button is clicked (showModal)
// be centered on the screen (createModal)
// have title and text (createModal, showModal)
// close when 'ESC', 'close' button, or outside the modal is pressed
// work on mobile devices

let modalFunctions = (function() {

    function createModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');
        
        let modal = document.createElement('div')
        modal.classList.add('modal');

        let hideButton = document.createElement('button');
        hideButton.classList.add('hide-modal');
        hideButton.innerText = 'x';

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
        pokemon.types.forEach(function(item) {            
            let typeSprite = document.createElement('img');
            typeSprite.src = getTypeSprite(item.url);
            typesContainer.appendChild(typeSprite);
        });

        // Add modal elements and modal to modal container
        modal.appendChild(hideButton);
        modal.appendChild(sprite);
        modal.appendChild(title);
        modal.appendChild(statsContainer);
        modal.appendChild(typesContainer);
        modalContainer.appendChild(modal);
    }

    function getTypeSprite(url) {        
        fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            return details.sprites['generation-iii'].colosseum.name_icon;
        });
    }


    function showModal(pokemon) {
        createModal(pokemon)

        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.add('is-visible');
    }

    // hideModal

    return {
        showModal: showModal,
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    });
});