import {
	ChakraBaseProvider,
	extendBaseTheme,
 } from '@chakra-ui/react'
import BeerPage from './Pages/BeerPage';
import { Global, css } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const globalStyles = css`
	@import url('https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@300..700&family=Pacifico&display=swap');
	body {
		font-family: "Overpass Mono", monospace;
	}
`;

const theme = extendBaseTheme({})
const queryClient = new QueryClient();

function App() {
	return (
		<ChakraBaseProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<Global styles={globalStyles} />
				<BeerPage />
			</QueryClientProvider>
		</ChakraBaseProvider>
	)
}

export default App;