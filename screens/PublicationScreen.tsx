import {
	StyleSheet,
	SafeAreaView,
	Platform,
	StatusBar,
} from "react-native";
import Header from "../components/Header";
import PublicationList from "../components/PublicationList";

const PublicationScreen: React.FC = () => {
	return (
		<SafeAreaView style={styles.androidSafeArea}>
			<Header />
			<PublicationList />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	androidSafeArea: {
		flex: 1,
		backgroundColor: "black",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
});

export default PublicationScreen;
