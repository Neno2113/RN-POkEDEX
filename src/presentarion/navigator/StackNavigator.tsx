import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { SearchScreen } from '../screens/search/SearchScreen';
import { PokemonScreen } from '../screens/pokemon/PokemonScreen';


export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: { pokemonId: number};
  SearchScreen: undefined;
}


const Stack = createStackNavigator<RootStackParams>();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
}