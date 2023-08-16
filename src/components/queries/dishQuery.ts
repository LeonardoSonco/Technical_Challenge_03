const getAllDishes = `
  query GetDishesAll {
    dishes {
      edges{
        node{
          objectId
          name
          description
          image
          price
        }
       
      }
    }
  }
  `;
export const DISH = {
  operationName: "GetDishesAll",
  query: getAllDishes,
};
