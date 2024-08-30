import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import './PokemonDetails.css';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);

    async function downloadPokemon() {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                weight: response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) => t.type.name)
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching the Pokemon details:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pokemon-details-wrapper">
            <img src={pokemon.image} className="pokemon-details-image" alt={`${pokemon.name}`} />
            <div className="pokemon-details-name"> <span>{pokemon.name}</span></div>
            <div className="pokemon-details">Weight&nbsp;: <span>{pokemon.weight}</span></div>
            <div className="pokemon-details">Height : <span>{pokemon.height}</span></div>
            <div className="pokemon-details-types">
                {
                    pokemon.types && pokemon.types.map((t, index) => (
                        <div key={index}>{t}</div>
                    ))
                }
            </div>
        </div>
    );
}

export default PokemonDetails;