import { Text, View, Button, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";
const SettingScreen = () => {
  const handleSignOut = () => {
    Auth.signOut();
  };
  return (
    <View style={styles.container}>
      <Text> Setting Screen</Text>
      <Button onPress={handleSignOut} title="Sign out" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default SettingScreen;
