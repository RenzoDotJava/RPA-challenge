import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useCallback } from "react";
import { IPublication, IUserPublications } from "../interfaces/publication.interface";
import { PublicationContext } from "./PublicationContext";
import { PublicationService } from "../services/publicationService";

export const PublicationProvider: React.FC<any> = ({ children }) => {
	const [usersPublications, setUsersPublications] = useState<IUserPublications[]>([]);
	const [filteredUsersPublications, setFilteredUsersPublications] = useState<IUserPublications[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const publicationService: PublicationService = new PublicationService();

  useEffect(() => {
		let isCanceled: boolean = false;

		getUsersPublications().then((res: IUserPublications[]) => {
			if (isCanceled) return;

			setUsersPublications(res);
			setFilteredUsersPublications(res);
		});

		return () => {
			isCanceled = true;
		};
	}, []);

  const groupPublicationsByUserId = (
    publications: IPublication[]
  ): IUserPublications[] => {
    return publications.reduce((acc: IUserPublications[], val: IPublication) => {
      let publication: IPublication = {
        id: val.id,
        title: val.title,
        body: val.body.replace(/\n|\r/g, ""),
      };
  
      const existingUser: IUserPublications | undefined = acc.find(
        (group: IUserPublications) => group.userId === val.userId
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
  ): Promise<IUserPublications[]> => {
    let indexes: number[] = Array.from({ length: amount }, (val, i) => i);
    return Promise.all(
      indexes.map((index) => {
        return publicationService.getPublicationsByUserId(index + 1);
      })
    ).then(async (res: IPublication[][]) => {
      const groupedPublications: IUserPublications[] =
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
  ): Promise<IUserPublications[]> => {
    let json: string | null = "";
    let usersPublications: IUserPublications[] = [];
  
    if (!refresh) json = await AsyncStorage.getItem("usersPublications");
  
    if (!json || json == "") {
      await getPublicationsByUsersAmount().then((res) => {
        usersPublications = res;
      });
    } else {
      usersPublications = JSON.parse(json);
    }
  
    return usersPublications;
  };

  const searchFilter = (text: string) => {
		if (text.trim() == "") {
			setFilteredUsersPublications(usersPublications);
		} else {
			const newPublications: IUserPublications[] = usersPublications
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

  const onRefreshPublications = useCallback(() => {
		setLoading(true);
		getUsersPublications(true)
			.then((res: IUserPublications[]) => {
				setUsersPublications(res);
				setFilteredUsersPublications(res);
			})
			.catch(() => {
				setUsersPublications([]);
				setFilteredUsersPublications([]);
			})
			.finally(() => {
				setSearch("");
				setLoading(false);
			});
	}, []);

	return (
		<PublicationContext.Provider
			value={{
				filteredUsersPublications,
        search,
        loading,
        getUsersPublications,
        searchFilter,
        onRefreshPublications
			}}
		>
			{children}
		</PublicationContext.Provider>
	);
};
