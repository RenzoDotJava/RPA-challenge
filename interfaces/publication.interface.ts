interface IPublication {
	id: number;
	userId?: number;
	title: string;
	body: string;
}

interface IUserPublications {
	userId?: number;
	data: IPublication[];
}

export { IPublication, IUserPublications };
