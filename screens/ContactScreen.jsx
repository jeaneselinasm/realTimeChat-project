import { FlatList } from "react-native";
import chats from "../assets/data/chats.json";
import ContactListItem from "../components/ContactListItem";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../src/graphql/queries";
import { useEffect, useState } from "react";

const ContactScreen = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      //   console.log(result);
      setUsers(result.data?.listUsers?.items);
    });
  }, []);
  //   console.log(users, "ini user");
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <ContactListItem user={item} />}
      style={{ backgroundColor: "white" }}
    />
  );
};

export default ContactScreen;
