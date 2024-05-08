import { MainStack } from './presentarion/navigator/StackNavigator'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeContextProvider } from './presentarion/context/ThemeContext'

const queryClient = new QueryClient()

const Pokedex = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider >
        <MainStack />
      </ThemeContextProvider>
    </QueryClientProvider>
  )
}

export default Pokedex