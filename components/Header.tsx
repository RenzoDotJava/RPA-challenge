import { useContext } from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { PublicationContext } from "../context/PublicationContext";

const Header: React.FC = () => {
	const { search, searchFilter } = useContext(PublicationContext);

	return (
		<View style={styles.header}>
			<View style={styles.container}>
				<TextInput
					style={styles.searchInput}
					onChangeText={(text) => searchFilter(text)}
					value={search}
				/>
				<AntDesign name="search1" size={20} color="white" />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 8,
		backgroundColor: "black",
	},
	container: {
		flexDirection: "row",
		marginHorizontal: 12,
		marginTop: 10,
		marginBottom: 1,
		borderBottomColor: "white",
		borderBottomWidth: 2,
	},
	searchInput: {
		flex: 1,
		color: "white",
		paddingBottom: Platform.OS === "android" ? 4 : 15,
	},
});

export default Header;
