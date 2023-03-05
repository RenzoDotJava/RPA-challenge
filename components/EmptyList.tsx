import { View, Text, StyleSheet, Platform } from 'react-native'

type EmptyListProps = {
  text: string
}

const EmptyList: React.FC<EmptyListProps> = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    marginTop: 15
	},
  text: {
    textAlign: "center",
    fontFamily: Platform.OS === "android" ? "serif" : "Arial",
    fontSize: 20,
    fontWeight: "500"
  }
});

export default EmptyList