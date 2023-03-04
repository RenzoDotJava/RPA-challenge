import { useState, useCallback } from "react"
import { StyleSheet, Platform, StatusBar, SectionList, RefreshControl } from 'react-native'
import { UserPublications } from "../interfaces/PublicationInterfaces";
import { getUsersPublications } from "../services/publicationService";
import PublicationContent from './PublicationContent';
import PublicationTitle from './PublicationTitle';

interface PublicationListProps {
  filteredUsersPublications: UserPublications[];
  setUsersPublications: (list: UserPublications[]) => void;
  setFilteredUsersPublications: (list: UserPublications[]) => void;
  setSearch: (text: string) => void;
}

const PublicationList = ({filteredUsersPublications, setUsersPublications, setFilteredUsersPublications, setSearch}: PublicationListProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
		setLoading(true);
		getUsersPublications(true)
			.then((res: UserPublications[]) => {
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
    <SectionList
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          colors={["#32373A"]}
          tintColor={"#32373A"}
        />
      }
      sections={filteredUsersPublications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <PublicationContent
          index={index}
          title={item.title}
          body={item.body}
        />
      )}
      renderSectionHeader={({ section: { userId } }) => (
        <PublicationTitle userId={userId} />
      )}
      stickySectionHeadersEnabled={false}
    />
  )
}

export default PublicationList