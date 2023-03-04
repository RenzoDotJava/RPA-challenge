import { View, Text, Platform, StyleSheet } from "react-native";

interface PublicationTitleProps {
	userId?: number;
}

const PublicationTitle = ({ userId }: PublicationTitleProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>User {userId}</Text>
			<View style={styles.line}></View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#DFDFDF",
		marginTop: 10,
		paddingHorizontal: 13,
	},
	title: {
		marginTop: 15,
		marginBottom: 8,
		color: "#32373A",
		fontWeight: "bold",
		fontSize: 25,
		fontFamily: Platform.OS === "android" ? "serif" : "Arial",
	},
	line: {
		backgroundColor: "#32373A",
		height: 4,
		width: 45,
	},
});

export default PublicationTitle;
