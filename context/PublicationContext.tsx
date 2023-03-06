import { createContext } from "react";
import { IUserPublications } from "../interfaces/publication.interface";

type PublicationContextProps = {
	filteredUsersPublications: IUserPublications[];
	search: string;
	loading: boolean;
	getUsersPublications: (refresh: boolean) => Promise<IUserPublications[]>;
	searchFilter: (text: string) => void;
	onRefreshPublications: () => void;
};

export const PublicationContext = createContext<PublicationContextProps>(
	{} as PublicationContextProps
);
