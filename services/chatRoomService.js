import { API, graphqlOperation, Auth } from "aws-amplify";

export const getCommonChatRoomWithUser = async (userID) => {
  const authUser = await Auth.currentAuthenticatedUser();

  // get all chatroom of user1
  const response = await API.graphql(
    graphqlOperation(listChatRooms2, { id: authUser.attributes.sub })
  );

  const chatRooms = response.data?.getUser?.ChatRooms.items;
  //   console.log(chatRooms, "ini my chat rooms");
  const chatRoom = chatRooms.find((chatRoomItem) => {
    return (
      chatRoomItem.chatRoom.Users.items.length === 2 &&
      chatRoomItem.chatRoom.Users.items.some(
        (userItem) => userItem.user.id === userID
      )
    );
  });

  console.log(chatRoom, "ini hasil chatrooom ");
  return chatRoom;

  // get all chatroom of user2

  // remove chat room with more 2 users

  //  get the common chat rooms
};

export const listChatRooms2 = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          chatRoom {
            Users {
              items {
                user {
                  id
                  image
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
