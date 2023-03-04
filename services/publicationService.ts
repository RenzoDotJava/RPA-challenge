import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	Publication,
	UserPublications,
} from "../interfaces/PublicationInterfaces";

const getPublicationsByUserId = (
	userId: number = 1
): Promise<Publication[]> => {
	return new Promise((resolve, reject) => {
		fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
			.then((res) => res.json())
			.then((data: Publication[]) => resolve(data.slice(0, 3)))
			.catch(() =>
				reject(
					"Hubo un error al obtener las publicaciones del usuario" +
						userId
				)
			);
	});
};

const groupPublicationsByUserId = (
	publications: Publication[]
): UserPublications[] => {
	return publications.reduce((acc: UserPublications[], val: Publication) => {
		let publication: Publication = {
			id: val.id,
			title: val.title,
			body: val.body.replace(/\n|\r/g, ""),
		};

		const existingUser: UserPublications | undefined = acc.find(
			(group: UserPublications) => group.userId === val.userId
		);

		if (existingUser) {
			existingUser.data.push(publication);
		} else {
			acc.push({
				userId: val.userId,
				data: [publication],
			});
		}

		return acc;
	}, []);
};

const getPublicationsByUsersAmount = (
	amount: number = 5
): Promise<UserPublications[]> => {
	let indexes: number[] = Array.from({ length: amount }, (val, i) => i);

	return Promise.all(
		indexes.map((index) => {
			return getPublicationsByUserId(index + 1);
		})
	).then(async (res: Publication[][]) => {
		const groupedPublications: UserPublications[] =
			groupPublicationsByUserId(res.flat());

		await AsyncStorage.setItem(
			"usersPublications",
			JSON.stringify(groupedPublications)
		);

		return groupedPublications;
	});
};

const getUsersPublications = async (
	refresh: boolean = false
): Promise<UserPublications[]> => {
	let json: string | null = "";
	let usersPublications: UserPublications[] = [];

	if (refresh) json = await AsyncStorage.getItem("usersPublications");

	if (!json || json == "") {
		await getPublicationsByUsersAmount().then((res) => {
			usersPublications = res;
		});
	} else {
		usersPublications = JSON.parse(json);
	}

	return usersPublications;
};

export {
	getPublicationsByUserId,
	getPublicationsByUsersAmount,
	getUsersPublications,
};
