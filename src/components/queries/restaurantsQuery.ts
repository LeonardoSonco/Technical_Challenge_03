const getAllRestaurant = `
  query GetRestaurantAll {
    fitMes {
      edges{
        node{
          objectId
          name
          rating
          deliveryTime
          isExpensive
        }
      }
    }
  }
  `;

export const GET_RESTAURANTS_ALL = {
  operationName: "GetRestaurantAll",
  query: getAllRestaurant,
};
