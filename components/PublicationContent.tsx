import { View, Text, Platform, StyleSheet } from "react-native";

interface PublicationContentProps {
	index: number;
	title: string;
	body: string;
}

const PublicationContent = ({
	index,
	title,
	body,
}: PublicationContentProps) => {
	return (
		<View style={styles.container}>
			<View
				style={[
					styles.titleWrapper,
					{ borderTopWidth: index == 0 ? 0 : 2 },
				]}
			>
				<Text style={styles.title}>{title}</Text>
			</View>
			<Text style={styles.body}>{body}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#DFDFDF",
		paddingHorizontal: 13,
	},
	titleWrapper: {
		paddingTop: 15,
		borderTopColor: "#C9C9C9",
	},
	title: {
		color: "#32373A",
		fontWeight: "bold",
		fontSize: 16,
		fontFamily: Platform.OS === "android" ? "serif" : "Arial",
	},
	body: {
		fontSize: 14,
		paddingRight: 30,
		color: "#737475",
		fontWeight: "500",
		marginTop: 8,
		paddingBottom: 15,
	},
});

export default PublicationContent;
