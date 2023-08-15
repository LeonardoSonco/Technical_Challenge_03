/*import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password) {
      objectId
      username
      password
    }
  }
`;
*/

import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $password: String!
    $email: String!
    $fullname: String!
  ) {
    registerUser(
      username: $username
      password: $password
      email: $email
      fullname: $fullname
    ) {
      objectId
      username
      fullname
      email
    }
  }
`;
