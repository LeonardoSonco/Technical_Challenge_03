import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query {
    getRestaurantAll {
      objectId
      name
      rating
      deliveryTime
      isExpensive
     
    }
  }
`;

export const GET_RESTAURANT_BY_ID = gql`
  query GetRestaurantById($id: String!) {
    getRestaurantById(id: $id) {
      objectId
      name
      topDishes {
        objectId
      }
    }
  }
`;