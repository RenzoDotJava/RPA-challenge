interface Publication {
	id: number;
	userId?: number;
	title: string;
	body: string;
}

interface UserPublications {
	userId?: number;
	data: Publication[];
}

export { Publication, UserPublications };
