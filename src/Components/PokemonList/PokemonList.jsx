import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";



function PokemonList() {

    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // const [pokedex_URL, setPokedex_URL] = useState('https://pokeapi.co/api/v2/pokemon');

    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedex_URL: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: '',
    })


    async function downloadPokemons() {
        setPokemonListState((pokemonListState) => ({ ...pokemonListState, isLoading: true }));
        const response = await axios.get(pokemonListState.pokedex_URL); // this downloads list of 20 pokemons

        const pokemonResults = response.data.results; // we get the array of pokemons from result

        // console.log(response.data.next)
        setPokemonListState((pokemonListState) => ({ ...pokemonListState, nextUrl: response.data.next, prevUrl: response.data.previous }));

        console.log(pokemonListState.nextUrl, pokemonListState.prevUrl, "hello")

        //iterating over the array of pokemons, and using their url, to create an array of promises that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemons detailed data
        console.log(pokemonData);

        // now iterate on the data of each pokemon, and extract id, name , image, types
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                type: pokemon.type
            }
        });
        console.log(res);
        setPokemonListState((pokemonListState) => ({ ...pokemonListState, pokemonList: res, isLoading: false }));
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedex_URL]);

    return (
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            <div className="pokemon-wrapper">
                {(pokemonListState.isLoading) ? <p>Loading....</p> :
                    pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)}
            </div>

            <div className="controls">
                <button disabled={pokemonListState.prevUrl ? false : true} onClick={() => {
                    const urlToSet = pokemonListState.prevUrl;
                    setPokemonListState((pokemonListState) => ({ ...pokemonListState, pokedex_URL: urlToSet }))
                }}>
                    Prev
                </button>
                <button disabled={pokemonListState.nextUrl ? false : true} onClick={() => {
                    const urlToSet = pokemonListState.nextUrl;
                    setPokemonListState((pokemonListState) => ({ ...pokemonListState, pokedex_URL: urlToSet }))
                }}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;