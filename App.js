import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import Navigator from "./navigation/index.js";
import { withAuthenticator } from "aws-amplify-react-native/dist/Auth";
import { useEffect } from "react";
import { getUser } from "./src/graphql/queries";
Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });
import { createUser } from "./src/graphql/mutations";
function App() {
  // whenever app is mounted we can get user
  useEffect(() => {
    const syncUser = async () => {
      // get Auth user
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      // console.log(authUser, "ini data auth user ");
      // query db using Auth user id reverse to data we need
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );
      // console.log(userData, "ini user Data");
      // if there is  user in db
      if (userData.data.getUser) {
        console.log("user already exist in db");
        return;
      }

      const newUser2 = {
        id: authUser.attributes.sub,
        // name : authUser.attributes.phone_number ,
        name: "Jhon doe",
        // image: "",
        status: "Hey, there!",
      };

      console.log(newUser2, " data user baru");
      // find or create if there is no users db, (create one)
      const newUserResponse = await API.graphql(
        graphqlOperation(createUser, { input: newUser2 })
      );
    };
    syncUser();
  }, []);
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <Navigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "stretch",
    justifyContent: "center",
  },
});

export default withAuthenticator(App);
