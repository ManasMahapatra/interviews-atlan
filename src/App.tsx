import {
	ChakraBaseProvider,
	extendBaseTheme,
 } from '@chakra-ui/react'
import UserSearchPage from './Pages/UserPage';
import { Global, css } from '@emotion/react';

const globalStyles = css`
	@import url('https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@300..700&family=Pacifico&display=swap');
	body {
		font-family: "Overpass Mono", monospace;
	}
`;

const theme = extendBaseTheme({})

function App() {
	return (
		<ChakraBaseProvider theme={theme}>
			<Global styles={globalStyles} />
			<UserSearchPage />
		</ChakraBaseProvider>
	)
}

export default App;