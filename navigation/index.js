import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import ChatScreen from "../screens/ChatScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatListScreen from "../screens/ChatListScreen/ChatListScreen";
import MainTabNavigator from "./MainTabNavigatior";

const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}
      >
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chats" component={ChatListScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
