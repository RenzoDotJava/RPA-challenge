import { IPublication } from "../interfaces/publication.interface";

export class PublicationService {
	getPublicationsByUserId = (userId: number = 1): Promise<IPublication[]> => {
		return new Promise((resolve, reject) => {
			fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
				.then((res) => res.json())
				.then((data: IPublication[]) => resolve(data.slice(0, 3)))
				.catch(() =>
					resolve([])
				);
		});
	};
}
