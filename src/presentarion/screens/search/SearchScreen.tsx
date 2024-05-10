
import { FlatList,  View } from "react-native"
import { globalTheme } from "../../../config/theme/global-theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ActivityIndicator, TextInput, Text } from "react-native-paper"
import { PokemonCard } from "../../components/pokemons/PokemonCard"
import { Pokemon } from "../../../domain/entities/pokemon"
import { useQuery } from "@tanstack/react-query"
import { getPokemonNamesWithId, getPokemonsByIds } from "../../../actions/pokemons"
import { useMemo, useState } from "react"
import { FullScreenLoader } from "../../components/ui/FullScreenLoader"
import { useDebounceValue } from "../../hooks/useDebounceValue"

export const SearchScreen = () => {

  const { top } = useSafeAreaInsets()
  const [term, setTerm] = useState('');
  const debounceValue = useDebounceValue(term);

  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId()
  });




  //todo: Aplicar luego Debouncer
  const pokemonNameIdList = useMemo(() => {
    if( !isNaN(Number(debounceValue))){
      const pokemon = pokemonNameList.find( pokemon => pokemon.id === Number(debounceValue))
      return pokemon ? [pokemon]: [];
    }

    if( debounceValue.length === 0) return [];
    if(debounceValue.length < 3 ) return [];

    return pokemonNameList.filter( pokemon =>
      pokemon.name.includes(debounceValue.toLocaleLowerCase()) 
    )

  }, [debounceValue])  

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () => getPokemonsByIds(pokemonNameIdList.map( poke => poke.id)),
    staleTime: 1000 * 60* 5,
  })


  if( isLoading ) {
    return (<FullScreenLoader />)
  }

  return (
    <View style={[ globalTheme.globalMargin, { paddingTop: top + 10}]}>
      <TextInput 
        placeholder="Buscar Pokemon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={ setTerm }
        value={term}
      />
      {
        isLoadingPokemons &&(
          <ActivityIndicator style={{ paddingTop: 20 }} />

        )
      }

      <FlatList 
        data={ pokemons }
        keyExtractor={ ( pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={ ({ item }) => (
          <PokemonCard pokemon={ item } />
        )}
        onEndReachedThreshold={ 0.6 }
        ListFooterComponent={ <View style={{height: 100}} />}
      />

    </View>
  )
}
