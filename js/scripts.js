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

        // w/ Bootstrap classes
        let listItem = document.createElement('li');
        let button = document.createElement('button'); 
        button.innerText = pokemon.name;
        listItem.classList.add('list-group-item');
        button.classList.add('btn', 'btn-light');

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

    async function showModal(pokemon) {
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');

        modalTitle.empty();
        modalBody.empty();

        modalTitle.text(pokemon.name);
        modalBody.css('text-align', 'center');

        // Create pokemon sprite
        let sprite = document.createElement('img');
        sprite.src = pokemon.imageUrl;
        sprite.alt = 'Sprite of ' + pokemon.name;

        // Create stats
        let statsContainer = document.createElement('div');
        statsContainer.classList.add('stats');

        let height = document.createElement('p');
        let heightVal = pokemon.height * 10;
        height.innerText = heightVal + ' cm';
        let weight = document.createElement('p');
        weight.innerText = pokemon.weight + ' kg';

        statsContainer.appendChild(height);
        statsContainer.appendChild(weight);

        // Create types
        let typesContainer = document.createElement('div');
        typesContainer.classList.add('types');
        for (i = 0; i < pokemon.types.length; i++) {
            let typeSprite = document.createElement('img');
            typeSprite.src = await getTypeSprite(pokemon.types[i].url)
            typesContainer.appendChild(typeSprite);
        }

        modalBody.append(sprite);
        modalBody.append(statsContainer);
        modalBody.append(typesContainer);

        $('#pokemon-modal').modal('show');
    }

    async function getTypeSprite(url) { 
        let response = await fetch(url);
        let typeInfo = await response.json();
        return typeInfo.sprites['generation-viii']['sword-shield'].name_icon;
    }

    // Show pokemon's name, types, height, weight, and sprite
    function showDetails(pokemon) {

        loadDetails(pokemon).then(function(pokemon) {
            showModal(pokemon);
            // modalFunctions.showModal(pokemon);
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