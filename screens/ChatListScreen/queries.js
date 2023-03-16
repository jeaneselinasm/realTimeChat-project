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
            LastMessage {
              id
              text
            }
            id
          }
        }
      }
    }
  }
`;
/*
getUser(id: "84e42c57-a83d-4642-9d27-d0b325d0975f") {
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
          LastMessage {
            id
            text
          }
        }
      }
    }
  }
*/
