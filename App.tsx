import PublicationScreen from "./screens/PublicationScreen";
import { PublicationProvider } from "./context/PublicationProvider";

export default function App() {
	return (
		<PublicationProvider>
			<PublicationScreen />
		</PublicationProvider>
	)
}