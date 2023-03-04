import { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Platform,
	StatusBar,
} from "react-native";
import { getUsersPublications } from "./services/publicationService";
import { UserPublications } from "./interfaces/PublicationInterfaces";
import Header from "./components/Header";
import PublicationList from "./components/PublicationList";

export default function App() {
	const [usersPublications, setUsersPublications] = useState<UserPublications[]>([]);
	const [filteredUsersPublications, setFilteredUsersPublications] = useState<UserPublications[]>([]);
	const [search, setSearch] = useState<string>("");

	useEffect(() => {
		let isCanceled: boolean = false;
		
		getUsersPublications().then((res: UserPublications[]) => {
			if(isCanceled) return;

			setUsersPublications(res);
			setFilteredUsersPublications(res);
		});

		return () => {
			isCanceled = true;
		};
	}, []);

	const searchFilter = (text: string) => {
		if (text.trim() == "") {
			setFilteredUsersPublications(usersPublications);
		} else {
			const newPublications: UserPublications[] = usersPublications
				.filter((item) =>
					item.data.some((d) => d.title.includes(text.toLowerCase()))
				)
				.map((item) => ({
					userId: item.userId,
					data: item.data.filter((d) =>
						d.title.includes(text.toLowerCase())
					),
				}));

			setFilteredUsersPublications(newPublications);
		}

		setSearch(text);
	};

	return (
		<SafeAreaView style={styles.androidSafeArea}>
			<Header search={search} searchFilter={searchFilter} />
			<View style={styles.body}>
				{filteredUsersPublications &&
					filteredUsersPublications.length > 0 && (
						<PublicationList
							filteredUsersPublications={
								filteredUsersPublications
							}
							setUsersPublications={setUsersPublications}
							setFilteredUsersPublications={
								setFilteredUsersPublications
							}
							setSearch={setSearch}
						/>
					)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	androidSafeArea: {
		flex: 1,
		backgroundColor: "black",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	body: {
		backgroundColor: "#CCCCCC",
		flex: 1,
	},
});
