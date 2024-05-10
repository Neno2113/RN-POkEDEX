import { pokeApi } from "../../config/api/pokaApi";
import { PokeAPIPaginatedResponse } from "../../infrastructure/interfaces/pokeapi.interfaces";




export const getPokemonNamesWithId = async() => {

    const url = `pokemon?limit=1000`;
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    return data.results.map( (info) => ({
        id: Number(info.url.split('/')[6]),
        name: info.name
    }))


}