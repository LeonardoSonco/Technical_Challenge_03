import { gql } from "@apollo/client";

export const GET_DISH = gql`
  query {
    getDish {
      objectId
      name
      description
      image
      price
     
    }
  }
`;