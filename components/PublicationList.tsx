import { useContext } from "react"
import { SectionList, RefreshControl, View, StyleSheet } from 'react-native'
import PublicationContent from './PublicationContent';
import PublicationTitle from './PublicationTitle';
import EmptyList from "./EmptyList";
import { PublicationContext } from "../context/PublicationContext";

const PublicationList: React.FC = () => {
  const { filteredUsersPublications, loading, onRefreshPublications } = useContext(PublicationContext);

  return (
    <View style={styles.container}>
      <SectionList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefreshPublications}
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
        ListEmptyComponent={<EmptyList text={'No hay publicaciones'}/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#CCCCCC",
		flex: 1,
	},
});

export default PublicationList