// Rick and Morty API: https://rickandmortyapi.com/

// Function that fetches our characters based on the name from the input field
function fetchCharacters() {
  const inputValue = document.getElementById('character-input').value;

  // using Fetch to get the api characters
  fetch(`https://rickandmortyapi.com/api/character/?name=${inputValue}`)
    .then(resp => resp.json())
    .then(data => {
      formatCharacters(data.results);
    });
}

// Function that fetches characters based on the location from the input field
function fetchCharactersByLocation() {
  const inputValue = document.getElementById('location-input').value;

  // Using Fetch to get the API characters
  fetch(`https://rickandmortyapi.com/api/location/?name=${inputValue}`)
    .then(resp => resp.json())
    .then(data => {
      if (data.results.length > 0) {
        const locationId = data.results[0].id;
        fetch(`https://rickandmortyapi.com/api/location/${locationId}`)
          .then(resp => resp.json())
          .then(locationData => {
            const characterIds = locationData.residents.map(characterUrl => {
              const characterId = characterUrl.split('/').pop();
              return characterId;
            });
            fetch(`https://rickandmortyapi.com/api/character/${characterIds.join(',')}`)
              .then(resp => resp.json())
              .then(charData => {
                formatCharacters(charData);
              });
          });
      } else {
        formatCharacters([]);
      }
    });
}




function formatCharacters(characters) {
  const charDiv = document.getElementById('characters');
  charDiv.innerHTML = '';

  characters.forEach(character => {
    // Fetch the location data for the character
    fetch(character.location.url)
      .then(resp => resp.json())
      .then(locationData => {
        charDiv.innerHTML += `<div>
          
          <h2>${character.name}</h2>
		  <img src="${character.image}">
          <p>Status: ${character.status}</p>
          <p>Species: ${character.species}</p>
          <p>Gender: ${character.gender}</p>
          <p>Location: ${locationData.name}</p>
        </div>`;
      });
  });
}


