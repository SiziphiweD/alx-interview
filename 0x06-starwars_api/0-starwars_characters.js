#!/usr/bin/node
const request = require('request');

// Function to fetch characters for a given movie ID
function fetchMovieCharacters(movieId) {
  const url = `https://swapi.dev/api/films/${movieId}/`;

  request(url, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
    } else {
      try {
        const film = JSON.parse(body);
        const characters = film.characters;

        // Fetch and print each character's name
        fetchCharacterNames(characters, 0);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  });
}

// Function to fetch and print character names recursively
function fetchCharacterNames(characters, index) {
  if (index >= characters.length) {
    return;
  }

  request(characters[index], (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      return;
    }

    try {
      const character = JSON.parse(body);
      console.log(character.name);
      fetchCharacterNames(characters, index + 1);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });
}

// Check if the script is provided with a movie ID as a command-line argument
if (process.argv.length !== 3) {
  console.error('Usage: node 0-starwars_characters.js <movie_id>');
} else {
  const movieId = process.argv[2];
  fetchMovieCharacters(movieId);
}

