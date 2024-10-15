// Here i select DOM elements to get altered on the js code 
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokeTypes = document.querySelector('.poke_types');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonReturn = document.querySelector('.btn_return')
const buttonNext = document.querySelector('.btn_next')
const checkShiny = document.querySelector('.shiny_switch')

let searchPokemon = 1 // Variable to keep track of the current Pokémon ID being searched

// Fetches Pokémon data from the PokeAPI based on the provided Pokémon name or ID
const fetchPokemon = async (pokemon)  => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200){ // If the API response is successful (status 200)
        const data = await APIResponse.json()
        return data; // Return the Pokémon data as a JSON object
    }

}

// Displays the type(s) of the Pokémon by creating and appending type icons
const showType = async (pokeinfo) => {  
    pokeinfo.types.forEach(typeInfo => { // Loop through each type in the Pokémon's type array
        const type = document.createElement('img');

         // Switch case to handle different Pokémon types and assign the correct type image
        switch (typeInfo.type.name.toLowerCase()) {
            case 'normal':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/1.png";
                break;
            case 'fighting':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/2.png";
                break;
            case 'flying':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/3.png";
                break;
            case 'poison':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/4.png";
                break;
            case 'ground':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/5.png";
                break;
            case 'rock':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/6.png";
                break;
            case 'bug':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/7.png";
                break;
            case 'ghost':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/8.png";
                break;
            case 'steel':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/9.png";
                break;
            case 'fire':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/10.png";
                break;
            case 'water':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/11.png";
                break;
            case 'grass':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/12.png";
                break;
            case 'electric':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/13.png";
                break;
            case 'psychic':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/14.png";// Adicione aqui o que você deseja fazer para o tipo Psíquico
                break;
            case 'ice':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/15.png";
                break;
            case 'dragon':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/16.png";
                break;
            case 'dark':
                type.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/17.png";
                    break;
        }
        //here is handled the creation of the img block on the html for the type image be put on
        type.alt = typeInfo.type.name;
        type.classList.add('pokemon_type');
        pokeTypes.appendChild(type); 
    });
}

// Sets the Pokémon image (default or shiny) based on whether the shiny switch is checked
const defineImage = async (pokeinfo) => {
    if (checkShiny.checked){
        pokemonImage.src = pokeinfo['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
    }
    else{
        pokemonImage.src = pokeinfo['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }
}

// Renders the Pokémon data including name, ID, image, and types
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    pokeTypes.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if (data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        await defineImage(data);
        await showType(data)
        searchPokemon = data.id;
        input.value = '';
    } 
    else {
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = '???'
        pokemonImage.src = "images/notfound.png"
    }
}



// Event listener for form submission to search for a Pokémon by name or ID
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());


});

// Event listener for the return button to fetch the previous Pokémon
buttonReturn.addEventListener('click', () =>{
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

// Event listener for the next button to fetch the next Pokémon
buttonNext.addEventListener('click', () =>{
    if(searchPokemon < 649){ 
        searchPokemon += 1;
        renderPokemon(searchPokemon)
    }
});

// Event listener for the shiny switch to toggle between shiny and default sprite by rendering the pokemon again when the switch is pressed
checkShiny.addEventListener('click', () =>{
    renderPokemon(searchPokemon)
})

// Initially render the first Pokémon when the page loads
renderPokemon(searchPokemon)
