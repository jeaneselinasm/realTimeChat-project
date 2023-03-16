import { StyleSheet, Text, View, ImageBackground } from "react-native";
import ChatListItem from "../../components/ChatListItem";
import { FlatList } from "react-native";
import chats from "../../assets/data/chats.json";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms2 } from "./queries";
import { useEffect, useState } from "react";

// const chat = {
//   id: "1",
//   user: {
//     image:
//       "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",
//     name: "Matthew",
//   },
//   lastMessage: {
//     text: "Oke",
//     createdAt: "07:30",
//   },
// };

const ChatListScreen = () => {
  const [chatRoom, setChatRoom] = useState([]);
  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(listChatRooms2, { id: authUser.attributes.sub })
      );
      // setting supaya di chat listnya exclude si usernya

      // console.log(
      //   response.data.getUser.ChatRooms.items[0],
      //   "data yg mau dikirim"
      // );
      setChatRoom(response.data.getUser.ChatRooms.items);
    };

    fetchChatRooms();
  }, []);
  return (
    <FlatList
      data={chatRoom}
      renderItem={({ item }) => <ChatListItem chat={item.chatRoom} />}
      style={{ backgroundColor: "white" }}
    />
  );
};

export default ChatListScreen;
